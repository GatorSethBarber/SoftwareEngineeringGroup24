package main

import (
	"fmt"
	"log"
	"net/http"

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

type GiftCard struct {
	gorm.Model
	Name              string `gorm:"unique" json:"name"`
	CardNumber        uint32 `gorm:"primary_key"`
	Amount            int    `gorm:"not null"` // an amount must be displayed
	AvailabilityCount uint   `gorm:"not null"`
	UserID            uint   `gorm:"not null"`
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
func Insert(giftcard GiftCard) (database *gorm.DB) {
	// var result := db.Create(&GiftCard)
	database.Create(&GiftCard{Name: "Amazon", CardNumber: 1, Amount: 50, AvailabilityCount: 55})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Walmart", CardNumber: 3, Amount: 50, AvailabilityCount: 20})
	database.Create(&GiftCard{Name: "Target", CardNumber: 4, Amount: 75, AvailabilityCount: 32})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})
	database.Create(&GiftCard{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40})

	return database
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

/********  Database setup *************/
func initialSetup(database *gorm.DB) {
	//database.AutoMigrate(&User{})

	database.AutoMigrate(&User{}, &GiftCard{})
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

func populateGiftCards(database *gorm.DB) {
	giftcards := []GiftCard{
		{Name: "Amazon", CardNumber: 1, Amount: 50, AvailabilityCount: 55},
		{Name: "Visa", CardNumber: 2, Amount: 50, AvailabilityCount: 40},
		{Name: "Walmart", CardNumber: 3, Amount: 50, AvailabilityCount: 20},
		{Name: "Target", CardNumber: 4, Amount: 75, AvailabilityCount: 32},
		{Name: "Starbucks", CardNumber: 5, Amount: 25, AvailabilityCount: 10},
		{Name: "Disney", CardNumber: 6, Amount: 100, AvailabilityCount: 15},
		{Name: "Google Play", CardNumber: 7, Amount: 75, AvailabilityCount: 18},
		{Name: "eBay", CardNumber: 8, Amount: 50, AvailabilityCount: 23},
		{Name: "iTunes", CardNumber: 9, Amount: 50, AvailabilityCount: 10},
		{Name: "Chick-fil-A", CardNumber: 10, Amount: 25, AvailabilityCount: 55},
		{Name: "American Express", CardNumber: 11, Amount: 250, AvailabilityCount: 19},
		{Name: "Sephora", CardNumber: 12, Amount: 200, AvailabilityCount: 45},
		{Name: "Home Depot", CardNumber: 13, Amount: 100, AvailabilityCount: 30},
		{Name: "Nike", CardNumber: 14, Amount: 70, AvailabilityCount: 12},
		{Name: "Etsy", CardNumber: 15, Amount: 135, AvailabilityCount: 47},
	}

	database.CreateInBatches(&giftcards, 100)
}
