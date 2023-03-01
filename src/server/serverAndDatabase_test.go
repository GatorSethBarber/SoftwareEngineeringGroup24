package main

import (
	"testing"
)

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

func TestValidGiftCardsByCompany(t *testing.T) {
	database = ConnectToDatabase()

	companyName := "Target"
	gotGiftCard, err := databaseGetCardsByCompany(companyName)

	/*
		// batch size 100
		result := db.Where("processed = ?", false).FindInBatches(&results, 100, func(tx *gorm.DB, batch int) error {
		for _, result := range results {
		// batch processing found records
		}
	*/

	wantGiftCards := []GiftCard{
		UserID:      1,
		CompanyName: "Target",
		CardNumber:  "223456789",
		Amount:      50.0,
		Expiration:  "2027-12",

		UserID:      2,
		CompanyName: "Target",
		CardNumber:  "623456789",
		Amount:      100.0,
		Expiration:  "2027-12",

		UserID:      4,
		CompanyName: "Target",
		CardNumber:  "103456789",
		Amount:      25.0,
		Expiration:  "2027-12",
	}

	if err != nil {
		t.Fatalf("Wanted to get the gift card(s), but got an error: %v", err)
	}

	for _, giftcard := range wantGiftCards {
		wantGiftCards.ID = gotGiftCard.ID
		wantGiftCards.CreatedAt = gotGiftCard.CreatedAt
		antGiftCards.UpdatedAt = gotGiftCard.UpdatedAt
		wantGiftCards.DeletedAt = gotGiftCard.DeletedAt
	}

	if wantGiftCards != gotGiftCard {
		t.Fatalf("Wanted %v, but got %v instead.", wantGiftCards, gotGiftCard)
	}
}

func TestInvalidGiftCardsByCompany(t *testing.T) {
	database = ConnectToDatabase()

	companyName = "Targit"
	gotGiftCard, err := databaseGetCardsByCompany(companyName)

	if err == nil {
		t.Fatalf("Wanted to get an error, but got: %v", gotGiftCard)
	}
}
