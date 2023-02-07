package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Maybe change this in future so connection is not global
var database *gorm.DB
var databaseName = "database.sqlite3"

type User struct {
	gorm.Model
	Username  string `gorm:"unique" json:"username"`
	Password  string `json:"password"`
	Email     string `gorm:"unique" json:"email"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

func main() {
	fmt.Println("Starting Process")

	database = ConnectToDatabase()

	// Do not run more than once
	// initialSetup(database)
	// makeTestUsers(database)

	RunServer()

}

func ConnectToDatabase() *gorm.DB {
	fmt.Println("Starting connection.")
	defer fmt.Println("Finished connecting to database")

	db, err := gorm.Open(sqlite.Open(databaseName), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	return db
}

// Set up a server using a function
func RunServer() {
	fmt.Println("Starting to run server")
	router := mux.NewRouter()

	// Currently, only have basic routing
	router.HandleFunc("/user/get/read/{username}/{password}", read).Methods("GET")

	portNum := 8080
	err := http.ListenAndServe(":"+strconv.Itoa(portNum), router)
	if err != nil {
		log.Fatalln("There's an error with the server,", err)
	}

	fmt.Println("Listening at port", portNum)
}

func createUser(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var user User

	// data in body will be converted to the structure of the user
	if err := json.NewDecoder(request.Body).Decode(&user); err != nil {
		panic("Cannot decode")
	}

	if err := database.Create(&user).Error; err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusCreated)

	// and pass it back to the browser
	if err := json.NewEncoder(writer).Encode(user).Error; err != nil {
		panic("Cannot encode")
	}

}

// Get user information from database
// Returns the user and the error that occurred (if no error, nil)
func getUserInformation(username string, password string) (User, error) {
	fmt.Println("Getting with", username, "and", password)
	var user User
	var theError error
	if err := database.Where("username = ? AND password = ?", username, password).First(&user).Error; err != nil {
		user = User{}
		theError = err
	}

	return user, theError
}

// Example change to push

// GET request
func read(writer http.ResponseWriter, request *http.Request) {
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

// Recommendation:
// If success, can either do writer.WriteHeader(http.StatusCreated) or leave it alone
// If bad input, writer.WriteHeader(http.StatusBadRequest)

// // Example POST request
// func create(writer http.ResponseWriter, request *http.Request) {
// 	writer.Header().Set("Content-Type", "application/json")
// 	writer.WriteHeader(http.StatusOK)
// 	var human Bio
// 	err := json.NewDecoder(request.Body).Decode(&human)

// 	// Check for error
// 	if err != nil {
// 		log.Fatalln("There was an error decoding the request body into the struct")
// 	}

// 	BioData = append(BioData, human)
// 	err = json.NewEncoder(writer).Encode(&human)

// 	if err != nil {
// 		log.Fatalln("There was an error encoding the initialized struct")
// 	}
// }

/********  Database setup *************/
func initialSetup(database *gorm.DB) {
	database.AutoMigrate(&User{})
	// testMakeUsers(database)
}

// Make a bunch of users
func makeTestUsers(database *gorm.DB) {
	users := []User{
		{Username: "SethTheBarber", Password: "password", Email: "not.my.email@stfaux.com", FirstName: "Seth", LastName: "Barber"},
		{Username: "EricTheRed", Password: "gr33nlandH0", Email: "red.beard@gmail.com", FirstName: "Eric", LastName: "Thorvaldson"},
		{Username: "LiefTheLucky", Password: "bjarn3S@w1t", Email: "adventurer@awaits.com", FirstName: "Lief", LastName: "Ericson"},
		{Username: "Welthow", Password: "password", Email: "theGoldenCup@hello.da", FirstName: "", LastName: "Welthow"},
		{Username: "Anlaf", Password: "password", Email: "viking@iviking.com", FirstName: "Olaf", LastName: "Trygvasson"},
		{Username: "KingCanute", Password: "password", Email: "waves.and.toes@northerners.com", FirstName: "", LastName: "Cnut"},
	}

	database.CreateInBatches(&users, 50)
}
