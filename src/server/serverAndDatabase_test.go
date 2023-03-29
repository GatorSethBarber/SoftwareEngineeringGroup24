package main

import (
	"testing"
	"time"
)

// test databaseCreateUser

func TestCreateWithAlreadyTakenEmail(t *testing.T) {
	database = ConnectToDatabase()
	newUser := User{
		Username:  "Widsith",
		Password:  "password",
		Email:     "viking@iviking.com",
		FirstName: "",
		LastName:  "Widsith",
	}

	err := databaseCreateUser(&newUser)
	if err == nil {
		t.Fatalf("Expected to get an error from email conflict, but instead creation was allowed.")
	}
}

func TestCreateWithAlreadyTakenUsername(t *testing.T) {
	database = ConnectToDatabase()
	newUser := User{
		Username:  "Anlaf",
		Password:  "password",
		Email:     "raiders@danemark.com",
		FirstName: "Olf",
		LastName:  "Tryg",
	}

	err := databaseCreateUser(&newUser)
	if err == nil {
		t.Fatalf("Expected to get an error from username conflict, but instead creation was allowed.")
	}
}

func TestCreateNewUser(t *testing.T) {
	database = ConnectToDatabase()
	newUser := User{
		Username:  "Howard",
		Password:  "password",
		Email:     "newemail@emails.rus",
		FirstName: "Howard",
		LastName:  "Howardson",
	}

	err := databaseCreateUser(&newUser)
	if err != nil {
		t.Fatalf("Expecting to create user, but instead got %v", err)
	}
}

//test getUserInformation

func TestValidGetUserInformation(t *testing.T) {
	database = ConnectToDatabase()
	username, password := "Anlaf", "password"
	gotUser, err := getUserInformation(username, password)
	wantUser := User{
		Username:  "Anlaf",
		Password:  "password",
		Email:     "viking@iviking.com",
		FirstName: "Olaf",
		LastName:  "Trygvasson",
	}

	if err != nil {
		t.Fatalf("Wanted to get a user, but got an error: %v", err)
	}

	wantUser.ID = gotUser.ID
	wantUser.CreatedAt = gotUser.CreatedAt
	wantUser.UpdatedAt = gotUser.UpdatedAt
	wantUser.DeletedAt = gotUser.DeletedAt
	wantUser.Hash = gotUser.Hash

	if wantUser != gotUser {
		t.Fatalf("Wanted %v, but got %v instead.", wantUser, gotUser)
	}
}

func TestInvalidGetUserInformation(t *testing.T) {
	database = ConnectToDatabase()
	username, password := "Anlaf", "password2"
	gotUser, err := getUserInformation(username, password)

	if err == nil {
		t.Fatalf("Wanted to get an error, but got: %v", gotUser)
	}
}

// test getUserName

func TestValidGetUserName(t *testing.T) {
	database = ConnectToDatabase()
	wantUserName := "Anlaf"
	var userID uint = 5
	getUserName, err := getUserName(userID)

	if err != nil {
		t.Fatalf("Wanted to get a username, got %v instead.", err)
	}

	if wantUserName != getUserName {
		t.Fatalf("Wanted %v, got %v.", wantUserName, getUserName)
	}
}

func TestInvalidUserIdGetUserName(t *testing.T) {
	database = ConnectToDatabase()
	var userID uint = 0
	getUserName, err := getUserName(userID)

	if err == nil {
		t.Fatalf("Wanted to get an error, got %v instead.", getUserName)
	}
}

// test databaseGetCardsByCompany

func TestValidGiftCardsByCompany(t *testing.T) {
	database = ConnectToDatabase()
	useDate := time.Date(2027, 12, 12, 0, 0, 0, 0, time.UTC)

	companyName := "Target"
	gotGiftCards, err := databaseGetCardsByCompany(companyName)

	/*
		// batch size 100
		result := db.Where("processed = ?", false).FindInBatches(&results, 100, func(tx *gorm.DB, batch int) error {
		for _, result := range results {
		// batch processing found records
		}
	*/

	wantGiftCards := []GiftCard{
		{
			UserID:      1,
			CompanyName: "Target",
			CardNumber:  "223456789",
			Amount:      50.0,
			Expiration:  useDate,
		},

		{
			UserID:      2,
			CompanyName: "Target",
			CardNumber:  "623456789",
			Amount:      100.0,
			Expiration:  useDate,
		},

		{
			UserID:      4,
			CompanyName: "Target",
			CardNumber:  "103456789",
			Amount:      25.0,
			Expiration:  useDate,
		},
	}

	if err != nil {
		t.Fatalf("Wanted to get the gift card(s), but got an error: %v", err)
	}

	if len(gotGiftCards) != len(wantGiftCards) {
		t.Fatalf("Expected to get %v gift cards, got %v.", len(wantGiftCards), len(gotGiftCards))
	}

	// Otherwise, asign needed information
	for index, _ := range gotGiftCards {
		wantGiftCards[index].ID = gotGiftCards[index].ID
		wantGiftCards[index].CreatedAt = gotGiftCards[index].CreatedAt
		wantGiftCards[index].UpdatedAt = gotGiftCards[index].UpdatedAt
		wantGiftCards[index].DeletedAt = gotGiftCards[index].DeletedAt
	}

	for index, _ := range gotGiftCards {
		if wantGiftCards[index] != gotGiftCards[index] {
			t.Fatalf("Wanted %v, but got %v instead.", wantGiftCards[index], gotGiftCards[index])
		}
	}
}

func TestInvalidGiftCardsByCompany(t *testing.T) {
	database = ConnectToDatabase()

	companyName := "Targit"
	gotGiftCards, err := databaseGetCardsByCompany(companyName)

	if err != nil {
		t.Fatalf("Wanted to get an empty slice, but got: %v", err)
	}

	if len(gotGiftCards) > 0 {
		t.Fatalf("Wanted to get an empty slice, but got %v", gotGiftCards)
	}
}

// test databaseCreateCard
func TestInvalidDuplicateCardNumber(t *testing.T) {
	database = ConnectToDatabase()
	newCard := GiftCard{
		UserID:      1,
		CompanyName: "Starbucks",
		CardNumber:  "123456789",
		Amount:      20.00,
		Expiration:  time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC),
	}

	err := databaseCreateCard(&newCard)
	if err == nil {
		t.Fatalf("Duplicate card numbers were allowed")
	}
}

func TestValidCreateCard(t *testing.T) {
	database = ConnectToDatabase()
	newCard := GiftCard{
		UserID:      1,
		CompanyName: "Starbucks",
		CardNumber:  "111111112",
		Amount:      20.00,
		Expiration:  time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC),
	}

	err := databaseCreateCard(&newCard)
	if err != nil {
		t.Fatalf("Tried to create new card, but got %v", err)
	}
}

// New for Sprint 3
func TestValidGetUserExistsPassword(t *testing.T) {
	database = ConnectToDatabase()
	userName, password := "Anlaf", "password"
	wantUser := User{
		Username:  "Anlaf",
		Password:  "password",
		Email:     "viking@iviking.com",
		FirstName: "Olaf",
		LastName:  "Trygvasson",
	}

	gotUser, exists := getUserExistsPassword(userName, password)

	if !exists {
		t.Fatalf("Wanted to get a user, but got that the user does not exist.")
	}

	wantUser.ID = gotUser.ID
	wantUser.CreatedAt = gotUser.CreatedAt
	wantUser.UpdatedAt = gotUser.UpdatedAt
	wantUser.DeletedAt = gotUser.DeletedAt
	wantUser.Hash = gotUser.Hash

	if wantUser != gotUser {
		t.Fatalf("Wanted %v, got %v", wantUser, gotUser)
	}

}

func TestInvaldGetUserExistsPassword(t *testing.T) {
	database = ConnectToDatabase()
	username, password := "Anlaf", "password2"

	gotUser, exists := getUserExistsPassword(username, password)

	if exists {
		t.Fatalf("Wanted to get false, but got user of %v", gotUser)
	}
}

func TestValidNewGetUserInformation(t *testing.T) {
	database = ConnectToDatabase()
	username := "Anlaf"
	wantUser := User{
		Username:  "Anlaf",
		Password:  "password",
		Email:     "viking@iviking.com",
		FirstName: "Olaf",
		LastName:  "Trygvasson",
	}

	gotUser, err := newGetUserInformation(username)

	if err != nil {
		t.Fatalf("Wanted to get user, insteat got %v", err)
	}

	wantUser.ID = gotUser.ID
	wantUser.CreatedAt = gotUser.CreatedAt
	wantUser.UpdatedAt = gotUser.UpdatedAt
	wantUser.DeletedAt = gotUser.DeletedAt
	wantUser.Hash = gotUser.Hash

	if wantUser != gotUser {
		t.Fatalf("Wanted %v, got %v", wantUser, gotUser)
	}
}

func TestInvalidNewGetUserInformation(t *testing.T) {
	database = ConnectToDatabase()
	username := "a;dfakj;df;afda;k;aj"
	gotUser, err := newGetUserInformation(username)

	if err == nil {
		t.Fatalf("Expected to get an error, got %v", gotUser)
	}
}

// Test getUserID

func TestValidGetUserID(t *testing.T) {
	database = ConnectToDatabase()
	username := "Anlaf"
	gotUserID, err := getUserID(username)
	var wantUserID uint = 5

	if err != nil {
		t.Fatalf("Expected to get user, got %v", err)
	}

	if gotUserID != wantUserID {
		t.Fatalf("Expected to get %v for %v, but got %v.", wantUserID, username, gotUserID)
	}
}

func TestInvalidGetUserID(t *testing.T) {
	database = ConnectToDatabase()
	username := "afadfadfadasfd"
	gotUserID, err := getUserID(username)

	if err == nil {
		t.Fatalf("Expected to get an error, but got user ID %v", gotUserID)
	}
}

// Test databaseGetCardsFromUser
func TestValidGetCardsFromUser(t *testing.T) {
	database = ConnectToDatabase()
	username := "Anlaf"
	gotCards, err := databaseGetCardsFromUser(username)

	if err != nil {
		t.Fatalf("Expected to get gift cards, but got %v", err)
	}

	if len(gotCards) == 0 {
		t.Fatalf("Expected to get gift cards, but got empty slice")
	}
}

func TestInvalidGetCardsFromUser(t *testing.T) {
	database = ConnectToDatabase()
	username := "adfafaafsfdasa"
	gotCards, err := databaseGetCardsFromUser(username)

	if err == nil {
		t.Fatalf("Expected to get error, but got %v", gotCards)
	}
}

func TestDatabaseGetCardsFromUser(t *testing.T) {
	database = ConnectToDatabase()
	useDate := time.Date(2027, 12, 12, 0, 0, 0, 0, time.UTC)

	// userID := 5

	// gettingUserID, err := getUserID(username)
	// var wantUserID uint = 5

	// Get all the cards from the user based on the userID stored in the database
	// func databaseGetCardsFromUser(username string) ([]GiftCard, error)

	// if err != nil {
	// 	t.Fatalf("Expected to get user, got %v", err)
	// }

	username := "Anlaf"

	gotGiftCards, err := databaseGetCardsFromUser(username)

	wantGiftCards := []GiftCard{
		{
			UserID:      5,
			CompanyName: "Starbucks",
			CardNumber:  "133456789",
			Amount:      100.0,
			Expiration:  useDate,
		},

		{
			UserID:      5,
			CompanyName: "Starbucks",
			CardNumber:  "143456789",
			Amount:      70.0,
			Expiration:  useDate,
		},

		{
			UserID:      5,
			CompanyName: "Kohls",
			CardNumber:  "153456789",
			Amount:      135.0,
			Expiration:  useDate,
		},
	}

	if err != nil {
		t.Fatalf("Wanted to get the gift cards, but got an error: %v", err)
	}

	if len(gotGiftCards) != len(wantGiftCards) {
		t.Fatalf("Expected to get %v gift cards, but got %v.", len(wantGiftCards), len(gotGiftCards))
	}

	// set each wanted gift cards to the actual cards in card slice
	for index, _ := range gotGiftCards {
		wantGiftCards[index].ID = gotGiftCards[index].ID
		wantGiftCards[index].CreatedAt = gotGiftCards[index].CreatedAt
		wantGiftCards[index].UpdatedAt = gotGiftCards[index].UpdatedAt
	}

	// if it does not match the gift cards in the database, return an error
	for index, _ := range gotGiftCards {
		if wantGiftCards[index] != gotGiftCards[index] {
			t.Fatalf("Wanted %v, but got %v instead.", wantGiftCards[index], gotGiftCards[index])
		}
	}

}

func TestValidBcryptPassword(t *testing.T) {
	password := []byte("mypassword")

	// hp = hashed password
	hp, err := bcrypt.GenerateFromPassword(password)
	bytes.require.NoError(t, err)
	require.NotEmpty(t, hp)

	err = CheckPassword(string(password), string(hp))
	require.NoError(t, err)
}

func TestInvalidBcryptPassword(t *testing.T) {
	notPass := "notthepass"
	err = bcrypt.CompareHashAndPassword(hp, []byte(notPass))
	if err != bcrypt.ErrMismatchedHashAndPassword {
		t.Errorf("%v and %s should be mismatched", hp, notPass)
	}
}

func TestComparePasswordAndHash(t *testing.T) {
	pass := []byte("allmine")
	expectedHash := []byte("$2a$10$XajjQvNhvvRt5GSeFk1xFeyqRrsxkhBkUiQeg0dt.wU1qD4aFDcga")

	_, err := CheckPassword(pass, expectedHash)
	if err != CheckPassword {
		t.Errorf("unexpected error: got %q, want %q", err, CheckPassword)
	}

}
