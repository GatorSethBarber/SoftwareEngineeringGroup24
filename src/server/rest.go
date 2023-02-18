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

type tempCard struct {
	userID      uint
	companyName string
	expiration  time.Time
	amount      float32
}

var tempCards []tempCard

type jsonCard struct {
	CompanyName string  `json:"company"`
	Expiration  string  `json:"expirationDate"`
	Amount      float32 `json:"amount"`
}

func stringToDate(dateAsString string) (time.Time, error) {
	return time.Parse("2006-01-02", dateAsString)
}

func dateToString(dateAsTime time.Time) string {
	return dateAsTime.Format("2006-01-02")
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
		panic("Cannot decode") // TODO: Change this so that it returns a StatusBadRequest instead
	}

	// TODO: Check for company here

	// TODO: Check that card has not already been inserted!

	// However, for right now, just build the new struct
	experAsTime, err := stringToDate(frontEndCard.Expiration)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	backEndCard := tempCard{user.ID, frontEndCard.CompanyName, experAsTime, frontEndCard.Amount}
	tempCards = append(tempCards, backEndCard)

	writer.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(writer).Encode(&frontEndCard); err != nil {
		log.Fatalln("There was an error encoding the struct.")
	}
}

func requestGetCard(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")

	if !request.URL.Query().Has("index") {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	stringIndex := request.URL.Query().Get("index")

	// The following code gets a certain card by index
	// TODO: Change this when database functionality is implemented
	index, err := strconv.Atoi(stringIndex)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	if index > len(tempCards) || index <= 0 {
		writer.WriteHeader(http.StatusNotFound)
		return
	}
	index--

	backEndCard := tempCards[index]

	// Change backEndCard into frontEndCard
	frontEndCard := jsonCard{backEndCard.companyName, dateToString(backEndCard.expiration), backEndCard.amount}

	// Encode frontEndCard
	writer.WriteHeader(http.StatusOK)

	encodeErr := json.NewEncoder(writer).Encode(&frontEndCard)
	if encodeErr != nil {
		log.Fatalln("There was an error encoding the struct.")
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
		panic("Cannot decode")
	}

	if err := databaseCreateUser(&user); err != nil {
		writer.WriteHeader(http.StatusBadRequest)
	}

	writer.WriteHeader(http.StatusCreated)

	// and pass it back to the browser
	if err := json.NewEncoder(writer).Encode(user); err != nil {
		panic("Cannot encode")
	}

}
