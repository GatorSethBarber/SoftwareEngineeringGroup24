package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// httpHandler creates the backend HTTP router for queries, types,
// and serving the Angular frontend.
func httpHandler() http.Handler {
	router := mux.NewRouter()
	// Your REST API requests go here

	// Routes for user
	router.HandleFunc("/user/get/read/{username}/{password}", requestGetUserInfo).Methods("GET")
	router.HandleFunc("/user/new", requestCreateUser).Methods("POST")

	// Routes for gift card
	// TODO: consider altering /card/get to split into verified and not verified
	router.HandleFunc("/card/new/{username}/{password}", requestCreateCard).Methods("POST")
	router.HandleFunc("/card/get", requestGetCard).Methods("GET")

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
				"Cache-Control", "Content-Range", "Range"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
			handlers.AllowedOrigins([]string{"http://localhost:8080"}),
			handlers.ExposedHeaders([]string{"DNT", "Keep-Alive", "User-Agent",
				"X-Requested-With", "If-Modified-Since", "Cache-Control",
				"Content-Type", "Content-Range", "Range", "Content-Disposition"}),
			handlers.MaxAge(86400),
		)(router))
}

type jsonCard struct {
	CompanyName string  `json:"company"`
	Username    string  `json:"username"`
	Expiration  string  `json:"expirationDate"`
	Amount      float32 `json:"amount"`
	CardNumber  string  `json:"cardNumber"`
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

	return jsonCard{
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

func requestGetCard(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")

	// TODO: Add functionality for minAmount and maxAmount
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

// GET request
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
