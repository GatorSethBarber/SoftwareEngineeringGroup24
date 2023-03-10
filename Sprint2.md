# Introduction
Moving forward with Sprint 2, we fixed what we did not accomplished in Sprint 1. We continued to integrate the front and back end and executed the new user stories for this sprint. 

# What We Planned
For the front end, we wanted to be able to get data from the back end to display the correct information as well as increase the fluidity of the login process and add ways to display cards for each individual brands in a new component. Our plans are described in greater details in the following user stories.
## User Stories
* As a user, I want to create an acount to gain access to functionality
* As a signed-up user, I want to log-in to my account so I can access home page
* As a user, I want to see a page for a certain gift card displaying the company it is for, its dollar amount, and the username and rating of the other user trading it.
* As a user, I want to view all the gift cards associated with a certain company grouped by value so it will be easier for me to trade.

# What We Accomplished
## Front End
* Added capability of displaying all available cards for a brand
* Added sorting/filtering functionality to card table
* Created preliminary Cypress integration and began E2E tests
* Fixed existence angular component unit tests
* Added functionality to brands page to get card count in real time
* Created routing capabilities to integrate Golang
* User are able to create an account and login to their account to access the home page


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
  * Angular component tests to check that each component displays and builds correctly
  * Basic testing to check that brands page gets correct number of brands
* Cypress Tests
  * End-to-end test that goes over basic process of registering to check inputs are recorded correctly and navigation works


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
* Test GET gift card information: Tests if the correct information is returned when requesting for a particular company name
  * GET with correct company name: Tests that a 200 status code is the response when requesting for a valid company name
  * GET without passing parameter: Tests that a 400 status code is the response to a request missing the *companyName* query parameter.
  * Get with unkown company: Tests that a 404 status code is the response to a request with a *companyName* not present in the database.
* Test POST GiftCard: Tests if the gift card is successfully created
  * POST with already taken card number: Tests that a 400 status code is the response when creating a gift card that has the same number as another gift card
  * POST with missing card number: Tests that a 400 status code is the response when creating a gift card without its card number
  * POST with valid new card: Tests that succesful creation of a new card has a response status code of 201

# Conclusion
We successfully integrated the front to the back end, which allows new users to sign up for Gift Card Xchange. During the registering process, all the data of the user, such as their username, first name, last name, email, and password, are successfully stored in the database of the back end. Since the users' information are stored in the database, current users can successfully log into the web application. The available gift cards appear after the user logs in. Certain features of the gift cards are implemented, such as the owner of the gift card, the amount on the card, and the expiration date, are displayed on the brand page. Additionally, we created many unit tests and Cypress tests for the front and back ends. There are a few front end unit tests and Cypress tests that failed. Despite this minor setback, we successfully accomplished all the user stories for Sprint 2. We will continue to work on fixing the errors to get the remaining unit and Cypress tests for Sprint 2 to pass. Lastly, we will implement new user stories and develop new unit and Cypress tests for Sprint 3. 

Below is the link to the video recording of our group demonstrating the features and tests of Gift Card Xchange for Sprint 2.
https://www.youtube.com/watch?v=2CfmXoEiUks


