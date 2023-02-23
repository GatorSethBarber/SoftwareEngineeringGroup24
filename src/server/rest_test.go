package main

import (
	"testing"
	"time"
)

// Test checkCardNumberAndAmount tests whether combinations are accpted or rejected

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
