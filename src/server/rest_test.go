package main

import (
	"bytes"
	"testing"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// Test checkCardNumberAndAmount

func TestValidCardInput(t *testing.T) {
	number := "123456789"
	var amount float32 = 23.50
	want := true
	if get := checkCardNumberAndAmount(number, amount); get != want {
		t.Fatalf(`checkCardNumber(%s, %f) = %v, not %v`, number, amount, get, want)
	}
}

func TestMissingCardNumber(t *testing.T) {
	number := ""
	var amount float32 = 23.50
	want := false
	if get := checkCardNumberAndAmount(number, amount); get != want {
		t.Fatalf(`checkCardNumber(%s, %f) = %v, not %v`, number, amount, get, want)
	}
}

func TestNegativeAmount(t *testing.T) {
	number := "123456789"
	var amount float32 = -1.3
	want := false
	if get := checkCardNumberAndAmount(number, amount); get != want {
		t.Fatalf(`checkCardNumber(%s, %f) = %v, not %v`, number, amount, get, want)
	}
}

func TestZeroAmount(t *testing.T) {
	number := "123456789"
	var amount float32 = 0.0
	want := false
	if get := checkCardNumberAndAmount(number, amount); get != want {
		t.Fatalf(`checkCardNumber(%s, %f) = %v, not %v`, number, amount, get, want)
	}
}

// Test stringToDate and dateToString

func Test_from_YYYY_MM_DD(t *testing.T) {
	dateString := "2027-12-9"
	date, err := stringToDate(dateString)
	if err == nil {
		t.Fatalf("Expected an error, got %v instead.", date)
	}
}

func Test_from_YYYY_MM(t *testing.T) {
	dateString := "2027-12"
	date, err := stringToDate(dateString)
	want := time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC)
	if err != nil {
		t.Fatalf("Wanted %v, got %v.", want, err)
	}

	if date != want {
		t.Fatalf("Wanted %v, got %v.", want, date)
	}
}

func Test_to_YYYY_MM(t *testing.T) {
	date := time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC)
	want := "2027-12"
	get := dateToString(date)
	if get != want {
		t.Fatalf("Wanted %v, got %v.", want, get)
	}
}

// test cardBackToFront

func TestValidCardBackToFrontWithNumber(t *testing.T) {
	database = ConnectToDatabase()
	backendCard := GiftCard{
		UserID:      1,
		CompanyName: "Starbucks",
		CardNumber:  "123456789",
		Amount:      20.3,
		Expiration:  time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC),
	}

	getWithNumber, errOne := cardBackToFront(&backendCard, true)
	wantWithNumber := jsonCard{
		CompanyName: "Starbucks",
		Username:    "SethTheBarber",
		Expiration:  "2027-12",
		Amount:      20.3,
		CardNumber:  "123456789",
	}

	if errOne != nil {
		t.Fatalf("Wanted to get a card, but got error %v", errOne)
	}
	if wantWithNumber != getWithNumber {
		t.Fatalf("Wanted to get %v, but got %v instead.", wantWithNumber, getWithNumber)
	}
}

func TestValidCardBackToFrontWithoutNumber(t *testing.T) {
	database = ConnectToDatabase()
	backendCard := GiftCard{
		UserID:      1,
		CompanyName: "Starbucks",
		CardNumber:  "123456789",
		Amount:      20.3,
		Expiration:  time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC),
	}

	getWithNumber, errOne := cardBackToFront(&backendCard, false)
	wantWithNumber := jsonCard{
		CompanyName: "Starbucks",
		Username:    "SethTheBarber",
		Expiration:  "2027-12",
		Amount:      20.3,
		CardNumber:  "",
	}

	if errOne != nil {
		t.Fatalf("Wanted to get a card, but got error %v", errOne)
	}
	if wantWithNumber != getWithNumber {
		t.Fatalf("Wanted to get %v, but got %v instead.", wantWithNumber, getWithNumber)
	}
}

// The following test would never happen in practice

func TestInvalidUserBackToFrontWithoutNumber(t *testing.T) {
	database = ConnectToDatabase()
	backendCard := GiftCard{
		UserID:      0, // Invalid user: numbers start at 0
		CompanyName: "Starbucks",
		CardNumber:  "123456789",
		Amount:      20.3,
		Expiration:  time.Date(2027, 12, 1, 0, 0, 0, 0, time.UTC),
	}

	gotCard, errOne := cardBackToFront(&backendCard, false)

	if errOne == nil {
		t.Fatalf("Wanted to get an error, but got  %v", gotCard)
	}
}

// Test checkUserInfo
func TestCompleteData(t *testing.T) {
	user := User{Username: "Hello", Password: "password", LastName: "Howard", Email: "abc@123.com"}
	want := true
	get := checkUserInfo(user)
	if want != get {
		t.Fatalf("Wanted to get %v, but got %v", want, get)
	}
}

func TestIncompleteData(t *testing.T) {
	user := User{Username: "Hello", Password: "", LastName: "Howard", Email: "abc@123.com"}
	want := false
	get := checkUserInfo(user)
	if want != get {
		t.Fatalf("Wanted to get %v, but got %v", want, get)
	}
}

func TestBcryptPassword(t *testing.T) {
	password := []byte("mypassword")

	// hp = hashed password
	hp, err := bcrypt.GenerateFromPassword(password)
	require.NoError(t, err)
	require.NotEmpty(t, hp)

	err = bcrypt.CheckPassword(password, hp)
	require.NoError(t, err)
}

/* func TestBcryptingIsCorrect(t *testing.T) {
	pass := []byte("mypassword")
	hp, err := bcrypt.GenerateFromPassword(pass, 0)
	if err != nil {
		t.Fatalf("GenerateFromPassword error: %s", err)
	}

	if bcrypt.CompareHashAndPassword(hp, pass) != nil {
		t.Errorf("%v should hash %s correctly", hp, pass)
	}

	notPass := "notthepass"
	err = bcrypt.CompareHashAndPassword(hp, []byte(notPass))
	if err != bcrypt.ErrMismatchedHashAndPassword {
		t.Errorf("%v and %s should be mismatched", hp, notPass)
	}
}

/*
func TestBcryptingIsCorrect(t *testing.T) {
	pass := []byte("allmine")
	salt := []byte("XajjQvNhvvRt5GSeFk1xFe")
	expectedHash := []byte("$2a$10$XajjQvNhvvRt5GSeFk1xFeyqRrsxkhBkUiQeg0dt.wU1qD4aFDcga")

	hash, err := bcrypt(pass, 10, salt)
	if err != nil {
		t.Fatalf("bcrypt blew up: %v", err)
	}
	if !bytes.HasSuffix(expectedHash, hash) {
		t.Errorf("%v should be the suffix of %v", hash, expectedHash)
	}

	h, err := newFromHash(expectedHash)
	if err != nil {
		t.Errorf("Unable to parse %s: %v", string(expectedHash), err)
	}

	if err == nil && !bytes.Equal(expectedHash, h.Hash()) {
		t.Errorf("Parsed hash %v should equal %v", h.Hash(), expectedHash)
	}
}
*/

/*
func TestInvalidHashErrors(t *testing.T) {
	check := func(name string, expected, err error) {
		if err == nil {
			t.Errorf("%s: Should have returned an error", name)
		}
		if err != nil && err != expected {
			t.Errorf("%s gave err %v but should have given %v", name, err, expected)
		}
	}

	for _, iht := range invalidTests {
		_, err := newFromHash(iht.hash)
		check("newFromHash", iht.err, err)
		err = CompareHashAndPassword(iht.hash, []byte("anything"))
		check("CompareHashAndPassword", iht.err, err)
	}
}
*/
