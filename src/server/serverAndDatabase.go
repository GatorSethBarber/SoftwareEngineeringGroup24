package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"golang.org/x/crypto/bcrypt"
)

// Maybe change this in future so connection is not global
var database *gorm.DB
var databaseName = "database.sqlite3"

type User struct {
	gorm.Model
	Username  string `gorm:"unique" json:"username"`
	Password  string `json:"password"`
	Hash      string `json:"hash"`
	Email     string `gorm:"unique" json:"email"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

type GiftCard struct {
	gorm.Model
	UserID      uint    `gorm:"not null"`
	CompanyName string  `gorm:"not null"`
	CardNumber  string  `gorm:"unique"`
	Amount      float32 `gorm:"not null"`
	Expiration  time.Time
}

type RequestCard struct {
	UserIDOne uint `json:"-"`
	UserIDTwo uint `json:"-"`
	CardIDOne uint `gorm:"primaryKey"`
	CardIDTwo uint `gorm:"primaryKey"`
}

func main() {
	fmt.Println("Starting Process")
	doInitialSetup := false

	// https://www.tutorialspoint.com/how-to-check-if-a-file-exists-in-golang
	fileExists := true
	if _, err := os.Stat(databaseName); err != nil {
		fileExists = false
	}

	// Do not run more than once
	if (len(os.Args) > 1 && os.Args[1] == "reset") || !fileExists {
		if fileExists {
			os.Remove(databaseName) // Don't care if error is thrown
		}
		doInitialSetup = true
	}

	database = ConnectToDatabase()

	if doInitialSetup {
		initialSetup(database)
	}

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
	host := "localhost:8080"
	if err := http.ListenAndServe(host, httpHandler()); err != nil {
		log.Fatalf("Failed to listen on %s: %v", host, err)
	}
	fmt.Println("Starting to run server")
}

func databaseCreateUser(newUser *User) error {
	var returnError error
	returnError = nil

	if err := database.Create(newUser).Error; err != nil {
		returnError = err
	}

	return returnError
}

/******************************************************* User Information From Database *******************************************************/

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

func newGetUserInformation(username string) (User, error) {
	var user User
	var theError error
	if err := database.Where("username = ?", username).First(&user).Error; err != nil {
		user = User{}
		theError = err
	}

	return user, theError
}

// Get the username based on the ID stored in the database.
func getUserName(userID uint) (string, error) {
	var user User
	var theError error
	if err := database.Where("users.id = ?", userID).First(&user).Error; err != nil {
		fmt.Println(err)
		theError = err
	}

	return user.Username, theError
}

// Get the userID from username stored in the database
func getUserID(username string) (uint, error) {
	var user User
	var usernameError error
	if err := database.Where("username = ?", username).First(&user).Error; err != nil {
		fmt.Println(err)
		usernameError = err
	}

	return user.ID, usernameError
}

/************************************************************** Encrypt Password **************************************************************/

// Returns the bcrypt hash of the user's password
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		// if an error occurs, return an empty string
		return "", fmt.Errorf("Failed to hash password: %w", err)
	}
	return string(hashedPassword), nil
}

// Checks if the provided password is correct or not
func CheckPassword(password string, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

// User authentication
func getUserExistsPassword(username, password string) (User, bool) {
	var user User
	if err := database.Where("username = ?", username).First(&user).Error; err != nil {
		return user, false
	}

	if CheckPassword(password, user.Hash) != nil {
		return User{}, false
	}

	// If no not found error, then good to go
	return user, true
}

/*************************************************** Gift Card Information From Database ***************************************************/

func databaseCreateCard(giftcard *GiftCard) error {
	// var result := db.Create(&GiftCard)

	var returnError error
	returnError = nil

	if err := database.Create(giftcard).Error; err != nil {
		returnError = err
	}

	return returnError
}

// Get the cards where the company name is equal to a given value.
func databaseGetCardsByCompany(companyName string) ([]GiftCard, error) {
	var cards []GiftCard
	var theError error
	if err := database.Where("company_name = ?", companyName).Find(&cards).Error; err != nil {
		theError = err
	}

	return cards, theError
}

// Get all the cards from the user based on the userID stored in the database
func databaseGetCardsFromUser(username string) ([]GiftCard, error) {
	var cards []GiftCard
	var theError error

	var user User
	user.ID, theError = getUserID(username)

	if err := database.Where("user_id = ?", user.ID).Find(&cards).Error; err != nil {
		theError = err
	}

	return cards, theError
}

/************************************************************* Swapping Gift Cards *************************************************************/

/*
Add a new request for swapping cards to the database.
*/
func databaseCreateRequest(newRequest *RequestCard) error {
	if err := database.Create(newRequest).Error; err != nil {
		return err
	}
	return nil
}

/*
Get all pending requests made by the user indicated by the user ID
*/
func getPendingUserRequests(userID1 uint) ([]RequestCard, error) {
	var userCardRequest []RequestCard
	var theError error

	if err := database.Where("user_id_one = ?", userID1).Find(&userCardRequest).Error; err != nil {
		return nil, err
	}

	return userCardRequest, theError
}

/*
Get all pending requests made of the user indicated by the user ID
*/
func getPendingRequestsFromOthers(userID2 uint) ([]RequestCard, error) {
	var othersCardRequest []RequestCard
	var theError error

	if err := database.Where("user_id_two = ?", userID2).Find(&othersCardRequest).Error; err != nil {
		return nil, err
	}

	return othersCardRequest, theError
}

/*
Get a (back-end) swap from the database if it exists based on a passed in front-end swap
*/
func databaseGetSwapIfValid(simpleSwap *frontEndSwap) (RequestCard, bool) {
	var swap RequestCard
	if err := database.Where("card_id_one = ? AND card_id_two = ?", simpleSwap.CardIDOne, simpleSwap.CardIDTwo).First(&swap).Error; err != nil {
		return swap, false
	}

	return swap, true
}

/*
Deny a request (delete a single request)
*/
func denyCardRequest(swap *RequestCard) error {
	// var requestCard RequestCard

	if err := database.Where("card_id_one = ? AND card_id_two = ?", swap.CardIDOne, swap.CardIDTwo).Delete(&RequestCard{}).Error; err != nil {
		return err
	}

	return nil
}

/*
Delete all pending requests involving the cards specified in the request
*/
func deleteCardRequests(request *RequestCard) error {
	fmt.Println("DELETING REQUESTS")
	// Delete all gift card requests that are not accepted or denied for the given swap
	err := database.Where("card_id_one = ? OR card_id_two = ? OR card_id_one = ? OR card_id_two = ?",
		request.CardIDOne, request.CardIDOne, request.CardIDTwo, request.CardIDTwo).Delete(&RequestCard{}).Error

	if err != nil {
		return err
	}

	return nil
}

/*
Perform a swap by swapping the cards between the owners and deleting all (pending)
requests made involving those cards
*/
func databasePerformSwap(swapToDo *RequestCard) {

	// User IDs should be swapped; error checking done before call

	// User IDs are swapped when both parties agree to exchange gift cards
	database.Model(&GiftCard{}).Where("gift_cards.id = ?", swapToDo.CardIDOne).Update("user_id", swapToDo.UserIDTwo)
	database.Model(&GiftCard{}).Where("gift_cards.id = ?", swapToDo.CardIDTwo).Update("user_id", swapToDo.UserIDOne)

	// delete any pending swaps involving the two cards
	deleteCardRequests(swapToDo)
}

/*
Get a gift card from the database based on its indicated card ID
*/
func databaseGetCardByCardID(cardID uint) (GiftCard, error) {
	var card GiftCard
	var theError error

	if err := database.Where("gift_cards.id = ?", cardID).First(&card).Error; err != nil {
		theError = err
	}

	return card, theError
}

/******************************************************************** Database Setup **********************************************************/

func initialSetup(database *gorm.DB) {
	//database.AutoMigrate(&User{})
	fmt.Println("Running initial set up.")

	database.AutoMigrate(&GiftCard{}, &User{}, &RequestCard{})

	makeTestUsers(database)
	populateGiftCards(database)

	fmt.Println("Initial set up complete.")
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

	var err error
	for index, user := range users {
		users[index].Hash, err = HashPassword(user.Password)

		if err != nil {
			log.Panicf("Encountered an unexpected error hashing %v", user.Password)
		}
	}

	database.CreateInBatches(&users, 50)
}

func populateGiftCards(database *gorm.DB) {
	useDate := time.Date(2027, 12, 12, 0, 0, 0, 0, time.UTC)
	giftcards := []GiftCard{
		{UserID: 1, CompanyName: "BestBuy", CardNumber: "123456789", Amount: 50.0, Expiration: useDate},
		{UserID: 1, CompanyName: "Target", CardNumber: "223456789", Amount: 50.0, Expiration: useDate},
		{UserID: 1, CompanyName: "Starbucks", CardNumber: "323456789", Amount: 50.0, Expiration: useDate},
		{UserID: 1, CompanyName: "Kohls", CardNumber: "423456789", Amount: 75.0, Expiration: useDate},
		{UserID: 2, CompanyName: "BestBuy", CardNumber: "523456789", Amount: 25.0, Expiration: useDate},
		{UserID: 2, CompanyName: "Target", CardNumber: "623456789", Amount: 100.0, Expiration: useDate},
		{UserID: 2, CompanyName: "Starbucks", CardNumber: "723456789", Amount: 75.0, Expiration: useDate},
		{UserID: 2, CompanyName: "Kohls", CardNumber: "823456789", Amount: 50.0, Expiration: useDate},
		{UserID: 3, CompanyName: "BestBuy", CardNumber: "923456789", Amount: 50.0, Expiration: useDate},
		{UserID: 4, CompanyName: "Target", CardNumber: "103456789", Amount: 25.0, Expiration: useDate},
		{UserID: 4, CompanyName: "Starbucks", CardNumber: "113456789", Amount: 250.0, Expiration: useDate},
		{UserID: 4, CompanyName: "Starbucks", CardNumber: "124356789", Amount: 200.0, Expiration: useDate},
		{UserID: 5, CompanyName: "Starbucks", CardNumber: "133456789", Amount: 100.0, Expiration: useDate},
		{UserID: 5, CompanyName: "Starbucks", CardNumber: "143456789", Amount: 70.0, Expiration: useDate},
		{UserID: 5, CompanyName: "Kohls", CardNumber: "153456789", Amount: 135.0, Expiration: useDate},
	}

	database.CreateInBatches(&giftcards, 100)
}

func createSwaps(database *gorm.DB) {
	requests := []RequestCard{
		{UserIDOne: 1, UserIDTwo: 3, CardIDOne: 1, CardIDTwo: 9},
		{UserIDOne: 1, UserIDTwo: 2, CardIDOne: 2, CardIDTwo: 5},
		{UserIDOne: 2, UserIDTwo: 1, CardIDOne: 5, CardIDTwo: 3},
		// {UserIDOne: 2, UserIDTwo: 4, CardIDOne: 6, CardIDTwo: 10},
		// {UserIDOne: 2, UserIDTwo: 5, CardIDOne: 8, CardIDTwo: 15},
		// {UserIDOne: 3, UserIDTwo: 2, CardIDOne: 9, CardIDTwo: 5},
		// {UserIDOne: 4, UserIDTwo: 3, CardIDOne: 11, CardIDTwo: 9},
		// {UserIDOne: 4, UserIDTwo: 5, CardIDOne: 12, CardIDTwo: 14},
		// {UserIDOne: 5, UserIDTwo: 3, CardIDOne: 13, CardIDTwo: 9},
		// {UserIDOne: 5, UserIDTwo: 1, CardIDOne: 14, CardIDTwo: 3},
		// {UserIDOne: 5, UserIDTwo: 4, CardIDOne: 15, CardIDTwo: 10},
	}

	database.CreateInBatches(&requests, 50)
}
