# Introduction
Moving forward with Sprint 2, we fixed what we did not accomplished in Sprint 1. We continued to integrate the front and back end and create the user dashboard after login.

# What We Planned
For the front end, we wanted to be able to get data from the back end to display the correct information as well as increase the fludity of the login process and add ways to
display cards for each individual brands in a new component.
## User Stories

# What We Accomplished
## Front End
* Added capability of displaying all available cards for a brand
* Added sorting/filtering functionality to card table
* Created preliminary Cypress integration and began E2E tests
* Fixed existence angular component unit tests
* Added functionality to brands page to get card count in real time
* Created routing capabilities to integrate Golang


## Back End
* Reorganized project directories along to guidelines discussed by the Professor.
* Implemented the functionality for creating and getting gift card information from the database.
* Wrote unit and functional tests for the back end in Go and Cypress, respectively.

# Back End API Documentation
## Users

All users must have a username, email, password, and full name consisting of a first and last name (or just last name if they have only one name). These are all provided by the user. Additionally, a userID is created in the back end, but this is never used by the user.

The following are the necessar API calls. Names in curly braces stand for variables provided by the front end. The http://localhost:8080 is ommitted.

Please use port 4020 for the Angular server.

### User Creation

URL: /user/new
* body should include username, email, password, lastName, firstName

Verb: POST

Response:
* Header: (Content-Type, application/json)
* JSON of new user

Note: First name is optional. This also may be changed to use query instead

Status Codes:
* Created: 201
* User with the given username or email already exists: 400

### User Information Access

URL: /user/get/{username}/{password}

Verb: GET

Response Header: (Content-Type, application/json)

Response:
* Header: JSON
* JSON: {username: ..., email: ..., password: ..., firstName: ..., lastName: ...}

If user does not exist, returns a 404 error code in the response.


## Gift Cards

All gift cards have a gift card number, amount, company, owner, and, potentially, an expiration date.

### Gift Card Creation

URL: /card/new/{username}/{password}

Request Verb: POST

Request Body: 
* {cardNumber, amount, companyName, expirationDate}

Response:
* Body with user information, if createion successful

Status codes:
* Create: 201
* Conflict on card number or invalid username/password: 400

### Get Matching Gift Cards: Implementation Underway

Get all (basic information about) the gift cards that match certain search conditions

Verb: GET

URL example: /card/get?companyName=Starbucks
Potential Search Keys:
* companyName: The name ofthe company without spaces or apostrophes

Response:
* Header: application/JSON
* JSON: [{username: ..., company: ..., amount: ..., expirationDate:...}, ...]

Status codes:
* Success: 200
* Non-existent company: 404
* Company name query missing: 400

# Testings
## Front End 
* Unit Tests
  * List below
* Cypress Tests
  * List below


## Back End
Tests for the back end are split into two major groups: Unit tests ran using Go, and tests ran using Cypress

### Unit Tests in Go
The testing of all functionality outside of router paths is done in Go. There are two files that contain unit tests, both of which are in src/server/
* rest_test.go: This tests the functions associated with the processing of information.
  * TestValidCardInput: Test checkCardNumberAndAmount with valid input. Function should return true.
  * TestMissingCardNumber: Test checkCardNumberAndAmount with a missing/blank card number. Function should return false.
  * TestNegativeAmount: Test checkCardNumberAndAmount with a negative value for amount. Function should return false.
  * TestZeroAmount: Test checkCardNumberAndAmount with a value of 0 for amount. Function should return false.
  * Test_from_YYYY_MM_DD: Test stringToDate to ensure valid date properly converted.
  * Test_from_YYYY_MM: Test stringToDate with invalid date string.
  * Test_to_YYYY_MM: Test dateToString to ensure valid date properly converted to string
  * TestValidCardBackToFrontWithNumber: Test cardBackToFront to ensure valid card as stored in database is properly converted to struct used for converting to JSON
  * TestValidCardBackToFrontWithoutNumber: Test cardBackToFront to ensure valid card as stored in database is properly converted to struct for converting to JSON while hiding card number.
  * TestInvalidUserBackToFrontWithoutNumber: Sanity check for cardBackToFront to ensure invalid data is handled properly.
* serverAndDatabase_test.go: These tests test the functionality of the database.
  * TestCreateWithAlreadyTakenEmail: Test that emails cannot be duplicated
  * TestCreateWithAlreadyTakenUsername: Test that usernames cannot be duplicated
  * TestCreateNewUser: Test that it is possible to create a new user
  * TestValidGetUserInformation: Test getUserInformation to make sure it returns the correct information for valid username and password combination.
  * TestInvalidGetUserInformation: Test getUserInformation to make sure it returns an error when called with an invalid username and password combination.
  * TestValidGetUserName: Test getUserName to ensure that it gets the correct name when called with a valid userID.
  * TestInvalidUserIdGetUserName: Test getUserName to ensure that it returns an error when called with an invalid userID.
  * TestValidGiftCardsByCompany: Test databaseGetCardsByCompany to ensure that the correct gift cards are gotten when called with a specific companyName.
  * TestInvalidGiftCardsByCompany: Test databaseGetCardsByCompany to ensure that the correct affect happens when databaseGetCardsByCompany is called with a not-present companyName.
  * TestCompleteData: Test checkUserInfo to ensure it returns true when passed complete data
  * TestIncompleteData: Test checkUserInfo to ensure it returns false when passed incomplete data
  * TestInvalidDuplicateCardNumber: Test that duplicate card numbers are not allowed
  * TestValidCrateCard: Create a new card for the database

### Testing the REST API in Cypress
This is done through an end-to-end Cypress spec. The tests are stored in the end to end spec spec.cy.js.
* Test GET User information: Tests that the /user/get/{username}/{password} route operates correctly
  * GET with correct username and password: Tests valid username and password combination has response status code of 200.
  * GET with incorrect password: Tests that invalid username and password combination has response status code of 404.
* Test POST User: Tests that the /user/new route operates correctly
  * POST with already taken username: Tests that attempt to create new user with already taken username has a response status code of 400
  * POST with already taken email: Tests that attempt to create new user with already taken email has a response status code of 400
  * POST with missing info: Tests that attempt to create new user while not fully specifying needed data has a response status code of 400.
  * POST with valid info: Tests that successful creation of user has status code of 201
* Test GET gift card information:
  * GET with correct company name:
  * GET without passing parameter: Tests that a 400 status code is the response to a request missing the *companyName* query parameter.
  * Get with unkown company: Tests that a 404 status code is the response to a request with a *companyName* not present in the database.
* Test POST GiftCard:
  * POST with already taken card number
  * POST with missing card number
  * POST with valid new card: Tests that succesful creation of a new card has a response status code of 201

# Conclusion


