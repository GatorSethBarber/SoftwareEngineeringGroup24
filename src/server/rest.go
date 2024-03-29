package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("totally_random_string"))

// httpHandler creates the backend HTTP router for queries, types,
// and serving the Angular frontend.
func httpHandler() http.Handler {
	router := mux.NewRouter()
	// Your REST API requests go here

	// Routes for user
	router.HandleFunc("/user/login/{username}/{password}", requestLogin).Methods("GET")
	router.HandleFunc("/user/logout", requestLogout).Methods("GET")
	router.HandleFunc("/user/get/{username}/{password}", requestGetUserInfo).Methods("GET")
	router.HandleFunc("/user/get/{username}", newGetUserInfo).Methods("GET")
	router.HandleFunc("/user/new", requestCreateUser).Methods("POST")

	// Routes for gift card
	router.HandleFunc("/card/new/{username}/{password}", requestCreateCard).Methods("POST")
	router.HandleFunc("/card/new/{username}", newRequestCreateCard).Methods("POST")
	router.HandleFunc("/card/get", requestGetCard).Methods("GET")
	router.HandleFunc("/card/get/{username}", requestAllCardsForUser).Methods("GET")

	// Routes for swap card
	router.HandleFunc("/swaps/request", requestSwap).Methods("POST")
	router.HandleFunc("/swaps/confirm", requestConfirmSwap).Methods("PUT")
	router.HandleFunc("/swaps/deny/{cardIDOne}/{cardIDTwo}", requestDenySwap).Methods("DELETE")
	router.HandleFunc("/swaps/get/pending/requested/user", getRequestedByUser).Methods("GET")
	router.HandleFunc("/swaps/get/pending/requested/others", getRequestedByOthers).Methods("GET")

	// WARNING: this route must be the last route defined.
	router.PathPrefix("/").Handler(AngularHandler).Methods("GET")

	/**
	 * We need some headers to be statically prepended to every response.
	 */
	return handlers.LoggingHandler(os.Stdout,
		handlers.CORS(
			handlers.AllowCredentials(),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization",
				"DNT", "Keep-Alive", "User-Agent", "X-Requested-With", "If-Modified-Since",
				"Cache-Control", "Content-Range", "Range", "Access-Control-Allow-origin"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "DELETE"}),
			handlers.AllowedOrigins([]string{"http://localhost:8080", "http://localhost:4200"}),
			handlers.ExposedHeaders([]string{"DNT", "Keep-Alive", "User-Agent",
				"X-Requested-With", "If-Modified-Since", "Cache-Control", "Access-Control-Allow-origin",
				"Content-Type", "Content-Range", "Range", "Content-Disposition"}),
			handlers.MaxAge(86400),
		)(router))
}

type jsonCard struct {
	CardID      uint    `json:"cardID"`
	CompanyName string  `json:"company"`
	Username    string  `json:"username"`
	Expiration  string  `json:"expirationDate"`
	Amount      float32 `json:"amount"`
	CardNumber  string  `json:"cardNumber"`
}

type frontEndSwap struct {
	CardIDOne uint `json:"cardIDOne"`
	CardIDTwo uint `json:"cardIDTwo"`
}

/*
Parse a YYYY-MM string to time.Time
*/
func stringToDate(dateAsString string) (time.Time, error) {
	return time.Parse("2006-01", dateAsString)
}

/*
Parse a time.Time to a YYYY-MM string
*/
func dateToString(dateAsTime time.Time) string {
	return dateAsTime.Format("2006-01")
}

/*
Check incoming user information to make sure it is good
*/
func checkUserInfo(newUser User) bool {
	// Require username, password, and last name
	if newUser.Username == "" || newUser.Password == "" || newUser.LastName == "" {
		return false
	}

	// Currently, just check if email is present (may change this)
	if newUser.Email == "" {
		return false
	}

	// If get here, all good
	return true
}

func cardBackToFront(backEndCard *GiftCard, keepCardNumber bool) (jsonCard, error) {
	// Get card number
	useCardNumber := ""
	if keepCardNumber {
		useCardNumber = backEndCard.CardNumber
	}

	// Get username
	username, err := getUserName(backEndCard.UserID)
	if err != nil {
		return jsonCard{}, err
	}

	expiration := dateToString(backEndCard.Expiration)

	// Updated: Back to front, get card ID
	return jsonCard{
		CardID:      backEndCard.ID,
		CompanyName: backEndCard.CompanyName,
		Username:    username,
		Expiration:  expiration,
		Amount:      backEndCard.Amount,
		CardNumber:  useCardNumber,
	}, nil

}

// TODO: Consider altering amount to string so that no overflow/underflow errors
func checkCardNumberAndAmount(cardNumber string, amount float32) bool {
	return len(cardNumber) > 1 && amount > 0.0
}

func requestCreateCard(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	params := mux.Vars(request)

	// Make sure user is valid
	user, err := getUserInformation(params["username"], params["password"])
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// can now use user.ID in creating the card
	// First, decode the json
	var frontEndCard jsonCard

	// Data in body will be converted to the structure of the user
	if err := json.NewDecoder(request.Body).Decode(&frontEndCard); err != nil {
		// panic("Cannot decode")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// TODO: Check for company here

	// However, for right now, just build the new struct
	experAsTime, err := stringToDate(frontEndCard.Expiration)
	if err != nil || !checkCardNumberAndAmount(frontEndCard.CardNumber, frontEndCard.Amount) {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	backEndCard := GiftCard{
		UserID:      user.ID,
		CompanyName: frontEndCard.CompanyName,
		CardNumber:  frontEndCard.CardNumber,
		Amount:      frontEndCard.Amount,
		Expiration:  experAsTime,
	}

	// If there is an error, signifies card already present.
	if err := databaseCreateCard(&backEndCard); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(writer).Encode(&frontEndCard); err != nil {
		log.Fatalln("There was an error encoding the struct.")
	}
}

func newRequestCreateCard(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")

	username := mux.Vars(request)["username"]
	if !authSessionForUser(request, username) {
		fmt.Println("User is not signed in correctly to this account.")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// Make sure user is valid
	user, err := newGetUserInformation(username)
	if err != nil {
		fmt.Println("User does not exist in the database")
		fmt.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// can now use user.ID in creating the card
	// First, decode the json
	var frontEndCard jsonCard

	// Data in body will be converted to the structure of the user
	if err := json.NewDecoder(request.Body).Decode(&frontEndCard); err != nil {
		// panic("Cannot decode")
		fmt.Println("Cannot decode the JSON")
		fmt.Println("body\n", request.Body)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// TODO: Check for company here

	// However, for right now, just build the new struct
	experAsTime, err := stringToDate(frontEndCard.Expiration)
	if err != nil || !checkCardNumberAndAmount(frontEndCard.CardNumber, frontEndCard.Amount) {
		fmt.Println("Error date not formatted correctly or no card number/amount")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	backEndCard := GiftCard{
		UserID:      user.ID,
		CompanyName: frontEndCard.CompanyName,
		CardNumber:  frontEndCard.CardNumber,
		Amount:      frontEndCard.Amount,
		Expiration:  experAsTime,
	}

	// If there is an error, signifies card already present.
	if err := databaseCreateCard(&backEndCard); err != nil {
		fmt.Println("Card already present")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(writer).Encode(&frontEndCard); err != nil {
		log.Fatalln("There was an error encoding the struct.")
	}
}

func requestGetCard(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")

	if !request.URL.Query().Has("companyName") {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	companyName := request.URL.Query().Get("companyName")

	// Get the cards belonging to a certain company
	cards, err := databaseGetCardsByCompany(companyName)
	if err != nil {
		writer.WriteHeader(http.StatusNotFound)
		return
	}

	// Transforrm the nack end cards into front end cards
	var frontCards []jsonCard
	for _, card := range cards {
		newCard, err := cardBackToFront(&card, false)
		if err != nil {
			panic("Got incorrect data for card")
		}
		frontCards = append(frontCards, newCard)
	}

	// If no cards, return a 404
	// TODO: Determine if this is the best approach
	if len(frontCards) < 1 {
		writer.WriteHeader(http.StatusNotFound)
		return
	}

	// Encode frontEndCard
	writer.WriteHeader(http.StatusOK)

	encodeErr := json.NewEncoder(writer).Encode(&frontCards)
	if encodeErr != nil {
		log.Fatalln("There was an error encoding the struct for cards.")
	}
}

func requestAllCardsForUser(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	username := mux.Vars(request)["username"]

	cards, getErr := databaseGetCardsFromUser(username)
	if getErr != nil {
		writer.WriteHeader(http.StatusNotFound)
		writer.Write([]byte("[]"))
		return
	}

	keepCardNumber := authSessionForUser(request, username)
	var frontCards []jsonCard

	for index, _ := range cards {
		card, err := cardBackToFront(&cards[index], keepCardNumber)
		if err != nil {
			log.Panicf("Could not convert card %v", cards[index])
		}
		frontCards = append(frontCards, card)
	}

	if len(frontCards) < 1 {
		writer.WriteHeader(http.StatusNotFound)
		writer.Write([]byte("[]"))
	} else {
		// Encode frontEndCard
		writer.WriteHeader(http.StatusOK)
		encodeErr := json.NewEncoder(writer).Encode(&frontCards)
		if encodeErr != nil {
			log.Fatalln("There was an error encoding the struct for cards.")
		}
	}
}

func requestGetUserInfo(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)

	// Maybe do some error checking here on username and password

	user, err := getUserInformation(params["username"], params["password"])

	// Assume only error is not finding the record, so return that the record is not found
	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusNotFound)
		return
	}

	writer.Header().Set("Content-Type", "application/json")

	// Try to encode the user
	encodeErr := json.NewEncoder(writer).Encode(&user)
	if encodeErr != nil {
		log.Fatalln("There was an error encoding the struct.")
	}
}

func newGetUserInfo(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	userName := mux.Vars(request)["username"]

	user, err := newGetUserInformation(userName)

	if err != nil {
		fmt.Println(err)
		writer.WriteHeader(http.StatusNotFound)
		return
	}

	if !authSessionForUser(request, userName) {
		user.FirstName = ""
		user.LastName = ""
		user.Email = ""
		user.Password = ""
	}

	encodeErr := json.NewEncoder(writer).Encode(&user)
	if encodeErr != nil {
		log.Fatalln("There was an error encoding the struct.")
	}
}

func requestCreateUser(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var user User

	// Data in body will be converted to the structure of the user
	if err := json.NewDecoder(request.Body).Decode(&user); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if !checkUserInfo(user) {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	var hashErr error
	user.Hash, hashErr = HashPassword(user.Password)
	if hashErr != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if hashErr != nil {
		panic("Cannot hash password")
	}

	if err := databaseCreateUser(&user); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusCreated)

	// and pass it back to the browser
	if err := json.NewEncoder(writer).Encode(user); err != nil {
		panic("Cannot encode")
	}

}

func requestLogin(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)

	// Maybe do some error checking here on username and password

	user, userIsValid := getUserExistsPassword(params["username"], params["password"])
	if !userIsValid {
		writer.WriteHeader(http.StatusNotFound)
		return
	}

	// TODO: Update this for hash and think about adding body to the request
	makeSession(writer, request, user.Username, user.Hash)
	writer.WriteHeader(http.StatusOK)
}

func requestLogout(writer http.ResponseWriter, request *http.Request) {
	deleteSession(writer, request)
	writer.WriteHeader(http.StatusOK)
}

/************ Swaps ****************/
// Swaps
// TODO: test these functions below (if not already tested)
/*
router.HandleFunc("/swaps/request", requestSwap).Methods("POST")
router.HandleFunc("/swaps/confirm", requestConfirmSwap).Methods("PUT")
router.HandleFunc("/swaps/deny", requestDenySwap).Methods("DELETE")
router.HandleFunc("/swaps/get/pending/requested/user", getRequestedByUser).Methods("GET")
router.HandleFunc("/swaps/get/pending/requested/others", getRequestedByOthers).Methods("GET")
*/

/*
Decode the body into the specified object. If error, write status bad request.
Returns a boolean indicating if process was successful.
*/
func decodeJSON(writer http.ResponseWriter, request *http.Request, object interface{}) bool {
	if err := json.NewDecoder(request.Body).Decode(object); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return false
	}
	return true
}

func requestSwap(writer http.ResponseWriter, request *http.Request) {
	var frontEndSwapInfo frontEndSwap
	if !decodeJSON(writer, request, &frontEndSwapInfo) {
		fmt.Println("Could not decode JSON")
		return
	}

	// Make sure user owns the card
	requester, isOk := cookieGetUserByCookie(request)
	if !isOk {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get Cards (for getting the id)
	// The following makes sure that the cards are actually real
	cardOne, errCardOne := databaseGetCardByCardID(frontEndSwapInfo.CardIDOne)
	cardTwo, errCardTwo := databaseGetCardByCardID(frontEndSwapInfo.CardIDTwo)
	if errCardOne != nil || errCardTwo != nil {
		fmt.Println("At least one card is nonexistent")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// If user does not own the first card, throw error
	// If user owns the second card, throw error (can't swap with cards you own)
	if cardOne.UserID != requester.ID || cardTwo.UserID == requester.ID {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("Don't own card or can't swap your own cards")
		return
	}

	// Otherwise, everything is OK and do translation
	backEndSwap := RequestCard{
		cardOne.UserID,
		cardTwo.UserID,
		frontEndSwapInfo.CardIDOne,
		frontEndSwapInfo.CardIDTwo,
	}

	// Add to swaps
	if err := databaseCreateRequest(&backEndSwap); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Println("Already stored")
	}
	// _, isPresent := getSwapIfValid(&frontEndSwapInfo)
	// if isPresent {
	// 	writer.WriteHeader(http.StatusBadRequest)
	// 	fmt.Println("Already stored")
	// 	return
	// }

	writer.WriteHeader(http.StatusCreated)
	fmt.Printf("CREATED SWAP: %v\n", frontEndSwapInfo)
}

func requestConfirmSwap(writer http.ResponseWriter, request *http.Request) {
	var frontEndSwapInfo frontEndSwap
	if !decodeJSON(writer, request, &frontEndSwapInfo) {
		fmt.Println("Request Confirm Swap: Could not decode body.")
		return
	}

	fmt.Println("Got as the body: ", frontEndSwapInfo)

	// Get swap from database
	swapFromBackEnd, exists := databaseGetSwapIfValid(&frontEndSwapInfo)
	if !exists {
		fmt.Printf("Request Confirm Swap: This swap does not exist: %v\n", frontEndSwapInfo)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// Check if user owns the backEndCard
	user, isOk := cookieGetUserByCookie(request)
	if !isOk {
		fmt.Println("Request Confirm Swap: Not signed in")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	_, errCardOne := databaseGetCardByCardID(frontEndSwapInfo.CardIDOne)
	cardTwo, errCardTwo := databaseGetCardByCardID(frontEndSwapInfo.CardIDTwo)
	if errCardOne != nil || errCardTwo != nil {
		fmt.Println("Request Confirm Swap: Card One or Card Two is bad (DNE in database)")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// If user does not own cardTwo, throw an error (already guaranteed does not own cardOne)
	if cardTwo.UserID != user.ID {
		fmt.Println("Request Confirm Swap: Don't own this card")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// Peform actual swap database function
	databasePerformSwap(&swapFromBackEnd)

	fmt.Printf("Request Confirm Swap: REDEEEMED SWAP %v", frontEndSwapInfo)
}

func requestDenySwap(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	params := mux.Vars(request)

	cardIDOne, errOne := strconv.Atoi(params["cardIDOne"])
	cardIDTwo, errTwo := strconv.Atoi(params["cardIDTwo"])

	if errOne != nil || errTwo != nil {
		fmt.Println("COULD NOT DECODE TO INTEGER")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if cardIDOne < 0 || cardIDTwo < 0 {
		fmt.Println("ONE IS LESS THAN 0")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	frontEndSwapInfo := frontEndSwap{CardIDOne: uint(cardIDOne), CardIDTwo: uint(cardIDTwo)}

	user, isOk := cookieGetUserByCookie(request)
	if !isOk {
		fmt.Printf("Invalid user for deleting %v\n", frontEndSwapInfo)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	cardOne, errCardOne := databaseGetCardByCardID(frontEndSwapInfo.CardIDOne)
	cardTwo, errCardTwo := databaseGetCardByCardID(frontEndSwapInfo.CardIDTwo)
	if errCardTwo != nil || errCardOne != nil {
		fmt.Printf("Card Two is invalid for %v\n", frontEndSwapInfo)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if user.ID != cardTwo.UserID && user.ID != cardOne.UserID {
		fmt.Printf("User doesn't own card 1 or card 2 for %v\n", frontEndSwapInfo)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	formatted := RequestCard{CardIDOne: frontEndSwapInfo.CardIDOne, CardIDTwo: frontEndSwapInfo.CardIDTwo}
	denyCardRequest(&formatted)
}

func backEndSwapToCards(swaps *[]RequestCard) ([][2]jsonCard, bool) {
	var translated [][2]GiftCard
	var translatedFront [][2]jsonCard

	for _, el := range *swaps {
		var newList [2]GiftCard
		cardOne, errCardOne := databaseGetCardByCardID(el.CardIDOne)
		cardTwo, errCardTwo := databaseGetCardByCardID(el.CardIDTwo)
		if errCardOne != nil || errCardTwo != nil {
			return translatedFront, false
		}

		newList[0] = cardOne
		newList[1] = cardTwo

		translated = append(translated, newList)
	}

	for _, el := range translated {
		var newList [2]jsonCard
		cardOne, errOne := cardBackToFront(&el[0], true)
		cardTwo, errTwo := cardBackToFront(&el[1], true)
		if errOne != nil || errTwo != nil {
			return translatedFront, false
		}
		newList[0] = cardOne
		newList[1] = cardTwo
		translatedFront = append(translatedFront, newList)
	}
	return translatedFront, true
}

func encodeToJSONAndSend(writer http.ResponseWriter, toSend interface{}) {
	writer.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(writer).Encode(toSend); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		panic("Cannot encode")
	} else {
		writer.WriteHeader(http.StatusOK)
	}
}

func getRequestedByUser(writer http.ResponseWriter, request *http.Request) {
	user, isOk := cookieGetUserByCookie(request)
	if !isOk {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	gotSwaps, err := getPendingUserRequests(user.ID)
	if err != nil {
		gotSwaps = []RequestCard{}
	}

	cards, cardsOk := backEndSwapToCards(&gotSwaps)
	if !cardsOk {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	// Mask card numbers
	for index, _ := range cards {
		cards[index][1].CardNumber = ""
	}
	fmt.Println("Length of Cards: ", len(cards))
	if len(cards) > 0 {
		encodeToJSONAndSend(writer, cards)
	} else {
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusNotFound)
		writer.Write([]byte("[]"))
	}
}

func getRequestedByOthers(writer http.ResponseWriter, request *http.Request) {
	user, isOk := cookieGetUserByCookie(request)
	if !isOk {
		fmt.Println("By others: User not logged in")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	gotSwaps, err := getPendingRequestsFromOthers(user.ID)
	if err != nil {
		gotSwaps = []RequestCard{}
	}

	cards, cardsOk := backEndSwapToCards(&gotSwaps)
	if !cardsOk {
		fmt.Println("By others: Trouble transferring stored cards")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	for index, _ := range cards {
		cards[index][0].CardNumber = ""
	}

	if len(cards) > 0 {
		encodeToJSONAndSend(writer, cards)
	} else {
		writer.Header().Set("Content-Type", "application/json")
		writer.WriteHeader(http.StatusNotFound)
		writer.Write([]byte("[]"))
	}
}

// Cookies
// Note: The following are tested using functional testing

/*
Get the user information from the cookie, if the cookie exists
*/
func cookieGetUserByCookie(request *http.Request) (User, bool) {
	username, cookieExists := cookieExtractUsername(request)
	if !cookieExists {
		return User{}, false
	}

	user, userErr := newGetUserInformation(username)
	if userErr != nil {
		return User{}, false
	}

	return user, true
}

/*
Extract the username from the info stored concerning a cookie if possible.
*/
func cookieExtractUsername(request *http.Request) (string, bool) {
	session, err := store.Get(request, "session-gcex")
	if err != nil {
		panic("Encountered an error decoding session info")
	}

	gotName, usernameExists := session.Values["username"]
	if !usernameExists {
		return "", false
	}

	return gotName.(string), true
}

/*
See if user is authorized to access information of indicated user
*/
func authSessionForUser(request *http.Request, username string) bool {
	session, err := store.Get(request, "session-gcex")
	if err != nil {
		panic("Encountered an error decoding session info")
	}

	fmt.Println(request.Cookies())

	gotName, usernameExists := session.Values["username"]
	gotHash, hashExists := session.Values["hash"]
	if !usernameExists || !hashExists {
		fmt.Println("Not signed in: missing/invalid")
		return false // Not signed in because invalid cookie
	}

	if gotName != username {
		fmt.Println("Signed in to different account")
		return false // Not authenticated to access this account
	}

	fmt.Printf("%v: %v\n", gotName, gotHash)
	fmt.Println("Successfully authenticated!")

	// Now, can check the username password combination
	return true
}

/*
Make a session cookie
*/
func makeSession(writer http.ResponseWriter, request *http.Request, username string, hash string) {
	session, err := store.Get(request, "session-gcex")
	if err != nil {
		panic("Encountered an error decoding session info")
	}

	// if !session.IsNew {
	// 	return    // No need to access database
	// }

	fmt.Println(session)
	fmt.Println(err)

	// GET USERNAME and PASSWORD

	session.Values["username"] = username
	session.Values["hash"] = hash
	session.Options.SameSite = http.SameSiteLaxMode

	// Save it before we write to the response/return from the handler.
	err = session.Save(request, writer)
	if err != nil {
		http.Error(writer, err.Error(), http.StatusInternalServerError)
		return
	}
}

/*
Delete a session cookie
*/
func deleteSession(writer http.ResponseWriter, request *http.Request) {
	session, err := store.Get(request, "session-gcex")
	if err != nil {
		return
	}

	if session.IsNew {
		return
	}

	// The following deletes the cookie
	session.Options.MaxAge = -1
	session.Save(request, writer)
}
