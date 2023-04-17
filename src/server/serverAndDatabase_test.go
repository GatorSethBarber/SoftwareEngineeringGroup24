package main

import (
	"testing"
	"time"

	"sort"

	"golang.org/x/crypto/bcrypt"
)

// test databaseCreateUser.
// Added sprint 4
func doDatabaseAndSwapsForTest() {
	database = ConnectToDatabase()
	createSwaps(database)
}

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

func TestValidCrateCard(t *testing.T) {
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

func TestValidBcryptPassword(t *testing.T) {
	password := "mypassword"

	// hp = hashed password
	hp, err := HashPassword(password)
	if err != nil {
		t.Fatalf("Unexpected error %v", err)
	}

	err = CheckPassword(string(password), string(hp))
	if err != nil {
		t.Fatalf("Was expecting no error, but got %v", err)
	}
}

func TestInvalidBcryptPassword(t *testing.T) {
	notPass := "notthepass"
	otherEncrypt, errTwo := HashPassword("password1")
	if errTwo != nil {
		t.Fatalf("Unexpected error %v", otherEncrypt)
	}
	err := CheckPassword(string(otherEncrypt), notPass)
	if err == nil {
		t.Errorf("%v and %s should be mismatched", otherEncrypt, notPass)
	}
}

func TestComparePasswordAndHash(t *testing.T) {
	password := "allmine"
	hashed, errOne := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if errOne != nil {
		t.Fatalf("Encountered error while hashing: %v", errOne)
	}

	err := CheckPassword(password, string(hashed))
	if err != nil {
		t.Fatalf("Expected nil, got %q", err)
	}

}

// Sprint 4
func TestValidDatabaseGetCardByCardID(t *testing.T) {
	database = ConnectToDatabase()
	var useID uint = 1
	wantCard := GiftCard{
		UserID:      1,
		CompanyName: "BestBuy",
		CardNumber:  "123456789",
		Amount:      50.0,
		Expiration:  time.Date(2027, 12, 12, 0, 0, 0, 0, time.UTC),
	}

	gotCard, err := databaseGetCardByCardID(useID)

	if err != nil {
		t.Fatalf("Expected to get card, but got %v", err)
	}

	wantCard.ID = gotCard.ID
	wantCard.CreatedAt = gotCard.CreatedAt
	wantCard.UpdatedAt = gotCard.UpdatedAt
	wantCard.DeletedAt = gotCard.DeletedAt

	if wantCard != gotCard {
		t.Fatalf("Wanted %v, got %v", wantCard, gotCard)
	}

}

func TestInvalidDatabaseGetCardByCardID(t *testing.T) {
	database = ConnectToDatabase()
	var useID uint = 0
	gotCard, err := databaseGetCardByCardID(useID)

	if err == nil {
		t.Fatalf("Wanted an error, but got %v", gotCard)
	}
}

/********************************* Testing Swapping Functions *********************************/
func TestCreateRequest(t *testing.T) {
	database = ConnectToDatabase()

	newCardRequest := RequestCard{
		UserIDOne: 5,
		UserIDTwo: 4,
		CardIDOne: 15,
		CardIDTwo: 10,
	}

	// call the function
	err := databaseCreateRequest(&newCardRequest)

	if err != nil {
		t.Fatalf("expected to create a request, but received this error: %v", err)
	}
}

func TestGetPendingUserRequests(t *testing.T) {
	database = ConnectToDatabase()

	var userID1 uint = 1
	expectedRequest := []RequestCard{
		{
			UserIDOne: 1,
			UserIDTwo: 3,
			CardIDOne: 1,
			CardIDTwo: 9,
		},

		{
			UserIDOne: 1,
			UserIDTwo: 2,
			CardIDOne: 2,
			CardIDTwo: 5,
		},
	}

	// Call the function
	actualRequest, err := getPendingUserRequests(userID1)

	// Check the results
	if err != nil {
		t.Errorf("unexpected error: %s", err)
	}

	// check length
	if len(actualRequest) != len(expectedRequest) {
		t.Errorf("unexpected result: expected=%v, actual=%v", expectedRequest, actualRequest)
	}

	// previously, this test failed because the request cards info in the database did not match the order
	// of the expected card. To fix this issue, sorting was required
	sort.Slice(expectedRequest, func(i, j int) bool {
		if expectedRequest[i].UserIDOne != expectedRequest[j].UserIDOne {
			return expectedRequest[i].UserIDOne < expectedRequest[j].UserIDOne
		}
		if expectedRequest[i].UserIDTwo != expectedRequest[j].UserIDTwo {
			return expectedRequest[i].UserIDTwo < expectedRequest[j].UserIDTwo
		}
		if expectedRequest[i].CardIDOne != expectedRequest[j].CardIDOne {
			return expectedRequest[i].CardIDOne < expectedRequest[j].CardIDOne
		}
		return expectedRequest[i].CardIDTwo < expectedRequest[j].CardIDTwo
	})

	sort.Slice(actualRequest, func(i, j int) bool {
		if actualRequest[i].UserIDOne != actualRequest[j].UserIDOne {
			return actualRequest[i].UserIDOne < actualRequest[j].UserIDOne
		}
		if actualRequest[i].UserIDTwo != actualRequest[j].UserIDTwo {
			return actualRequest[i].UserIDTwo < actualRequest[j].UserIDTwo
		}
		if actualRequest[i].CardIDOne != actualRequest[j].CardIDOne {
			return actualRequest[i].CardIDOne < actualRequest[j].CardIDOne
		}
		return actualRequest[i].CardIDTwo < actualRequest[j].CardIDTwo
	})

	for index, _ := range actualRequest {
		if expectedRequest[index] != actualRequest[index] {
			t.Fatalf("expected %v, but actual %v", expectedRequest[index], actualRequest[index])
		}
	}

}

func TestGetPendingRequestsFromOthers(t *testing.T) {
	database = ConnectToDatabase()

	var userID1 uint = 1
	expectedRequest := []RequestCard{
		{
			UserIDOne: 2,
			UserIDTwo: 1,
			CardIDOne: 5,
			CardIDTwo: 3,
		},
	}

	actualRequest, err := getPendingRequestsFromOthers(userID1)

	// Check the results
	if err != nil {
		t.Errorf("unexpected error: %s", err)
	}

	if len(expectedRequest) != len(actualRequest) {
		t.Errorf("unexpected result: expected=%v, actual=%v", expectedRequest, actualRequest)
	}

	sort.Slice(expectedRequest, func(i, j int) bool {
		if expectedRequest[i].UserIDOne != expectedRequest[j].UserIDOne {
			return expectedRequest[i].UserIDOne < expectedRequest[j].UserIDOne
		}
		if expectedRequest[i].UserIDTwo != expectedRequest[j].UserIDTwo {
			return expectedRequest[i].UserIDTwo < expectedRequest[j].UserIDTwo
		}
		if expectedRequest[i].CardIDOne != expectedRequest[j].CardIDOne {
			return expectedRequest[i].CardIDOne < expectedRequest[j].CardIDOne
		}
		return expectedRequest[i].CardIDTwo < expectedRequest[j].CardIDTwo
	})

	sort.Slice(actualRequest, func(i, j int) bool {
		if actualRequest[i].UserIDOne != actualRequest[j].UserIDOne {
			return actualRequest[i].UserIDOne < actualRequest[j].UserIDOne
		}
		if actualRequest[i].UserIDTwo != actualRequest[j].UserIDTwo {
			return actualRequest[i].UserIDTwo < actualRequest[j].UserIDTwo
		}
		if actualRequest[i].CardIDOne != actualRequest[j].CardIDOne {
			return actualRequest[i].CardIDOne < actualRequest[j].CardIDOne
		}
		return actualRequest[i].CardIDTwo < actualRequest[j].CardIDTwo
	})

	for index, _ := range actualRequest {
		if expectedRequest[index] != actualRequest[index] {
			t.Fatalf("expected %v, but actual %v", expectedRequest[index], actualRequest[index])
		}
	}
}

func TestGetSwapIfValid(t *testing.T) {
	database = ConnectToDatabase()

	testSwapCard := frontEndSwap{
		CardIDOne: 5,
		CardIDTwo: 3,
	}

	_, exists := databaseGetSwapIfValid(&testSwapCard)

	if exists != true {
		t.Fatalf("expected to get, but received not exists")
	}

	// databaseGetSwapIfValid passes in a pointer to swap card struct

}

func TestDenyCardRequest(t *testing.T) {
	database = ConnectToDatabase()

	testRequestCard := RequestCard{
		UserIDOne: 3,
		UserIDTwo: 2,
		CardIDOne: 9,
		CardIDTwo: 5,
	}

	// call the function
	err := denyCardRequest(&testRequestCard)

	if err != nil {
		t.Fatalf("expected to deny a request, but received this error: %v", err)
	}

}

func TestDeleteCardRequests(t *testing.T) {
	database = ConnectToDatabase()

	cardRequests := RequestCard{
		UserIDOne: 4,
		UserIDTwo: 3,
		CardIDOne: 11,
		CardIDTwo: 9,
	}

	// call the function
	err := deleteCardRequests(&cardRequests)

	if err != nil {
		t.Fatalf("expected to delete all requests, but received this error: %v", err)
	}

	var result RequestCard
	if err := database.Where("card_id_one = ? OR card_id_two = ? OR card_id_one = ? OR card_id_two = ?", cardRequests.CardIDOne, cardRequests.CardIDTwo).First(&result).Error; err == nil {
		t.Fatalf("expected to delete all requests from the database, but received this error: %v", err)
	}

}

func TestPerformSwap(t *testing.T) {
	database = ConnectToDatabase()

	swapCard := RequestCard{
		UserIDOne: 5,
		UserIDTwo: 4,
		CardIDOne: 15,
		CardIDTwo: 10,
	}

	err := databasePerformSwap(&swapCard)

	if err != nil {
		t.Fatalf("unable to swap cards, received this error: %v", err)
	}

	var result RequestCard
	if err := database.Where("card_id_one = ? OR card_id_two = ? OR card_id_one = ? OR card_id_two = ?", swapCard.CardIDOne, swapCard.CardIDOne, swapCard.CardIDTwo, swapCard.CardIDTwo).First(&result).Error; err == nil {
		t.Errorf("expected IDs of cards to be swapped, but received this error: %v", err)
	}

}

// Test databaseCreateRequest(newRequest *RequestCard) error
// Note: No testing for invalid card numbers, etc., because that is handled elsewhere

func TestValidDatabaseCreateRequest(t *testing.T) {
	database = ConnectToDatabase()
	newRequest := RequestCard{
		UserIDOne: 5,
		UserIDTwo: 1,
		CardIDOne: 14,
		CardIDTwo: 3,
	}

	err := databaseCreateRequest(&newRequest)
	if err != nil {
		t.Fatalf("Expected to create request, but got %v", err)
	}

	if errTwo := denyCardRequest(&newRequest); errTwo != nil {
		t.Fatalf("Error in deleting from database")
	}
}

func TestDuplicateDatabaseCreateRequest(t *testing.T) {
	database = ConnectToDatabase()
	newRequest := RequestCard{
		UserIDOne: 5,
		UserIDTwo: 1,
		CardIDOne: 14,
		CardIDTwo: 3,
	}

	errOne := databaseCreateRequest(&newRequest)
	if errOne != nil {
		t.Fatalf("Expected to not get error for first, but got %v", errOne)
	}

	errTwo := databaseCreateRequest(&newRequest)
	if errTwo == nil {
		t.Fatalf("Expected to get error for duplicate, but did not")
	}

	if err := denyCardRequest(&newRequest); err != nil {
		t.Fatalf("Error in deleting from database")
	}
}

// Test denyCardRequest(swap *RequestCard) error
func TestValidDenyCardRequest(t *testing.T) {
	database = ConnectToDatabase() // Added for completeness
	doDatabaseAndSwapsForTest()

	newRequest := RequestCard{
		UserIDOne: 1,
		UserIDTwo: 3,
		CardIDOne: 1,
		CardIDTwo: 9,
	}

	if err := denyCardRequest(&newRequest); err != nil {
		t.Fatalf("Expected success, got %v", err)
	}

}

// Test getPendingUserRequests(userID1 uint) ([]RequestCard, error)
func TestNonEmptyValidGetPendingUserRequests(t *testing.T) {
	doDatabaseAndSwapsForTest()
	var useUserID uint = 1
	gotSwaps, err := getPendingUserRequests(useUserID)
	if err != nil {
		t.Fatalf("Expected to get swaps, got %v", err)
	}

	if len(gotSwaps) < 1 {
		t.Fatalf("Expected to get one or more swaps, got 0")
	}

	if gotSwaps[0].UserIDOne != useUserID {
		t.Fatalf("Expected to get requests made by user, got requests made by someone else")
	}
}

func TestEmptyValidGetPendingUserRequests(t *testing.T) {
	doDatabaseAndSwapsForTest()
	var useUserID uint = 0
	gotSwaps, err := getPendingUserRequests(useUserID)
	if err != nil {
		t.Fatalf("Expected empty list, got %v", err)
	}

	if len(gotSwaps) != 0 {
		t.Fatalf("Expected to get empty list, got %v", gotSwaps)
	}
}

// Test getPendingRequestsFromOthers(userID2 uint) ([]RequestCard, error)
// Test databaseGetSwapIfValid(simpleSwap *frontEndSwap) (RequestCard, bool)
func TestValidDatabaseGetSwapIfValid(t *testing.T) {
	doDatabaseAndSwapsForTest()

	frontEnd := frontEndSwap{
		CardIDOne: 2,
		CardIDTwo: 5,
	}

	want := RequestCard{UserIDOne: 1, UserIDTwo: 2, CardIDOne: 2, CardIDTwo: 5}

	got, exists := databaseGetSwapIfValid(&frontEnd)
	if !exists {
		t.Fatalf("Wanted %v, got does not exist", want)
	}

	if want != got {
		t.Fatalf("Wanted %v, got %v", want, got)
	}
}

func TestInvalidDatabaseGetSwapIfValid(t *testing.T) {
	doDatabaseAndSwapsForTest()

	frontEnd := frontEndSwap{
		CardIDOne: 1,
		CardIDTwo: 5,
	}

	got, exists := databaseGetSwapIfValid(&frontEnd)
	if exists {
		t.Fatalf("Wanted does not exit, got %v", got)
	}
}

// Test deleteCardRequests(request *RequestCard) error
// Test databasePerformSwap(swapToDo *RequestCard)
