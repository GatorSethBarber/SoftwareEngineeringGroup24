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

func newGetUserInformation(username string) (User, error) {
	var user User
	var theError error
	if err := database.Where("username = ?", username).First(&user).Error; err != nil {
		user = User{}
		theError = err
	}

	return user, theError
}

// Get the username based on the id stored in the database.
func getUserName(userID uint) (string, error) {
	var user User
	var theError error
	if err := database.Where("users.id = ?", userID).First(&user).Error; err != nil {
		fmt.Println(err)
		theError = err
	}

	return user.Username, theError
}

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

/***************************************** Swapping Gift Cards ******************************************/

// request user to trade
func createRequestCard(cardID uint) error {
	// request swap: adding new transaction

	tx := database.Begin()

	// if err := tx.Create(&RequestCard).Error; err != nil {
	if err := tx.Create(&RequestCard{CardIDTwo: ?}).Error; err != nil { // FIXME: should I use create 
		tx.Rollback()
		return err
	}

	return tx.Commit().Error

}

// Switch the user IDs when both parties agree to swap gift cards
func swapGiftCards(userID1, userID2 uint) error {
	// Begin a transaction
	tx := database.Begin()

	// Fetch user records by their IDs
	var user1, user2 GiftCard
	if err := tx.Where("id = ?", userID1).First(&user1).Error; err != nil {
		// if there's an error, return the database into its original state
		tx.Rollback()
		return err
	}
	if err := tx.Where("id = ?", userID2).First(&user2).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Swap user IDs
	user1.ID, user2.ID = user2.ID, user1.ID

	if err := tx.Save(&user1).Error; err != nil {
		// if there is no error, the new user ID of the gift card will be saved to the database
		tx.Rollback()
		return err
	}
	if err := tx.Save(&user2).Error; err != nil {
		tx.Rollback()
		return err
	}

	// if there is no error, the changes made within the transaction are saved to the database permanently
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func denyCardRequest() {

}

func deleteCardRequests(gcardID uint) {
	tx := db.Begin()

	if err := tx.Where("id = ?", gcardID).Delete(&RequestCard{}).Error; err != nil {
		tx.Rollback()
		return err
	}
	
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}
	
	return nil
}

func getAllPendingUserRequests() {

}

func getAllPendingRequestsFromOthers() {

}

/******************************************** Database setup ********************************************/

func initialSetup(database *gorm.DB) {
	//database.AutoMigrate(&User{})
	fmt.Println("Running initial set up.")

	database.AutoMigrate(&GiftCard{}, &User{})

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

/*
type GiftCard struct {
	gorm.Model
	UserID            uint       `gorm:"not null"`
	CompanyName       string     `gorm:"unique"`
	CardNumber        uint32     `gorm:"primary_key"`
	Amount            float32    `gorm:"not null"` // an amount must be displayed
	Expiration        time.Time
	AvailabilityCount uint       `gorm:"not null"`
}
*/

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
