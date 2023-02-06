// main reference: https://gorm.io/docs/index.html
package main

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

type User struct {
	gorm.Model
	Username  string `gorm:"unique"`
	Password  string
	Email     string `gorm:"unique"`
	FirstName string
	LastName  string
}

func main() {
	db, err := gorm.Open(sqlite.Open("test2.sqlite3"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// initialSetup(db)
	// testMakeUsers(db)
	// db.Commit()
	seth, err := getUserInformation(db, "SethTheBarber", "password2")
	fmt.Println(seth)
	fmt.Println(err)
}

func initialSetup(database *gorm.DB) {
	database.AutoMigrate(&User{})
	// testMakeUsers(database)
}

func createUser(database *gorm.DB, username, password, email, firstName, lastName string) {
	database.Create(&User{Username: username, Password: password, Email: email, FirstName: firstName, LastName: lastName})
	database.Commit()
}

func testMakeUsers(database *gorm.DB) {
	users := []User{
		{Username: "SethTheBarber", Password: "password", Email: "not.my.email@stfaux.com", FirstName: "Seth", LastName: "Barber"},
		{Username: "EricTheRed", Password: "gr33nlandH0", Email: "red.beard@gmail.com", FirstName: "Eric", LastName: "Thorvaldson"},
		{Username: "LiefTheLucky", Password: "bjarn3S@w1t", Email: "adventurer@awaits.com", FirstName: "Lief", LastName: "Ericson"},
		{Username: "Anlaf", Password: "password", Email: "viking@iviking.com", FirstName: "Olaf", LastName: "Trygvasson"},
		{Username: "KingCanute", Password: "password", Email: "waves.and.toes@northerners.com", FirstName: "", LastName: "Cnut"},
	}

	database.CreateInBatches(&users, 50)
	database.Commit()
}

func getUserInformation(database *gorm.DB, username string, password string) (User, error) {
	var user User
	var theError error
	if err := database.Where("username = ? AND password = ?", username, password).First(&user).Error; err != nil {
		user = User{}
		theError = err
	}

	return user, theError
}
