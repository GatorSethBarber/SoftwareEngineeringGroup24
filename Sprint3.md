# Introduction
Moving forward with Sprint 3, we fixed what we did not accomplished in Sprint 2. We continued to fix the unit testings and Cypress testings that did not pass in Sprint 2. We also added new functionalities to execute in Sprint 3.

# What We Planned
We created four user stories to implement in Sprint 3. From those user stories, we analyzed what features to build. We planned to develop a "My Wallet" dashboard that displays available gift cards from the users. We also planned to develop an *add* and *post* features for users to display gift cards to their account for future exchanges. Lastly, we want to create a cookie to allow the users to stay logged in. 

The exact details of our functionalities for Sprint 3 is described below in the user stories.  

## User Stories
1. As an account-holding user, I want to view all the cards I have in a dashboard.
2. As a user, I want to add a card to my account so I can use it to trade.
3. As an account-holding user, I want to post one of my cards to be availabe for trade.
4. As a signed in user, I want to have a cookie to keep me signed in.

# What We Accomplished

## Front End
* Modified log-in system to use cookies to save user data after logging in
* Changes cypress tests to reflect new user path due to cookie change
* Creates a dashboard available to cookied users to display their information, cards, and allow them to add new cards
* Stores user information based on cookies in front-end as members in .ts files
* Reformats html element attributes to allow cypress testing
* Adds cypress testing to check correctness of user information from cookie
* Adds cypress testing to check correctness of cards for a user based on a cookie

## Back End
* describe here

# Updated Back End API Documentation 
* Note: updates underway
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

### User Information Access (for updates, see APIDocumentation.md)

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
Create a new gift card associated with a given user. The user is either identified by the username and password (legacy) or with just the username and the **session-gcex** cookie is used to insure that the user is actually logged in.

URLs:
* URL: /card/new/{username}
* Legacy URL: /card/new/{username}/{password}

Request Verb: POST

Request Body: 
* {cardNumber, amount, companyName, expirationDate}

Response:
* Body with user information, if createion successful

Status codes:
* Create: 201
* Conflict on card number or invalid username/password: 400

### Get Matching Gift Cards

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
### Cypress Tests
Tests to verify that front-end and back-end successfuly share data with hard-coded values
Everything done in endToEnd.cy.js
* Log-In Test for register and log-in components
  * registers new user: Registers a new user with randomly-generated data. Checks if registration of new user is successful .
  * logs-in to an existing user: Logs-in to a test user 'Anlaf.' Checks if log-in of existing user is successful.
  * attempts full register to log-in path: Generates random user, registers, then logs-in with same information. Checks if registering and logging in a new user is sucessful.
  * doesn't register new user: Negative test to see if invalid user info doesn't register. Checks if register process only succeeds on info that doesn't already exist.
  * doesn't log-in to an existing user: Negative test to see if incorrect password results in failed log-in. Checks if log-in process only succeeds on correct, existing data.
* View brands test for checking that all brands are displayed correctly in the home page
  * display all brands: Test for all current brands. Checks if all the ones that are supposed to exist get displayed.
* View cards test for checking that all the correct cards get displayed for a brand in the home page.
  *  displays correct card brand: Test for right name for chosen brand in home page. Checks if containers share brand info correctly.
  *  displays all starbucks cards: Test for correct cards in starting database. Checks if frontend succesfully retrieves card information for a specific brand.
* Dashboard tests for verifying that the information of the dashboard matches the currently logged-in user
  *  displays correct user info: Test for right info on dashboard after logging in. Checks if data from log-in matches that of dashboard from cookied back-end.
  *  displays all cards for user: Test for base list of cards for a test user. Checks if query to back-end based on cookie gets correct data.


## Back End
Tests for the back end are split into two major groups: Unit tests ran using Go, and tests ran using Cypress

### Unit Tests in Go
The testing of all functionality outside of router paths is done in Go. There are two files that contain unit tests, both of which are in src/server/
* rest_test.go: This tests the functions associated with the processing of information.
  * From Sprint 3:
    * No additional tests in *rest_test.go*

  * From Sprint 2:
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
  * From Sprint 3:
    * TestValidGetUserExistsPassword: Tests that a user exists for a given valid username and password combination and that the correct user information is returned.
    * TestInvaldGetUserExistsPassword: Tests that a user does not exist for a given invalid username and password combination.
    * TestValidNewGetUserInformation: Tests that getting user information by username with a valid username gets the correct user from the database.
    * TestInvalidNewGetUserInformation: Tests that getting user information by username with a non-existent username causes an error to be thrown by the database.
  * From Sprint 2: 
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
This is done through an end-to-end Cypress spec. The tests are stored in the end to end specs spec.cy.js and testBackEndWithCookie.cy.js.
* testBackEndWithCookie.cy.js (from Sprint 3):
  * BasicLoginAndLogout: Test basic log in and log out
    * Basic Login: Login without having previously logged in or logged out.
    * Basic Logout: Logout after logging in.
  * Multiple Logins and Logouts: Test multiple log ins and log outs
    * Logout before login: Tests that logging out before loggin in does not throw error.
    * Login with invalid user credentials: Tests that logging in with invalid credentials results in a 404 error.
    * Login twice with valid credentials: Tests that logging in with valid user credentials without logging out between the log ins does not throw an error.
    * Logout: Final logout (actually repeat of basic logout due to way Cypress tests work)
  * Test new GET User information: Tests the new version of getting user information
    * GET without login: Verifies that getting user information without being logged in masks personally identifiable values
    * GET with same login: Verifies that user has access to needed information about their account when they are logged in.
    * GET with different login: Verifies personally identifiable information about a user is masked from other users.
    * GET nonexistent user without login: Verifies that attempts to access the information for a nonexistent user results in a 404 error.
    * GET nonexistent user while logged in: Verifies that attempts to access the information for a nonexistent user results in a 404 error.
  * Test new create Card
    * Attempt to create without being logged in: Verifies that this case results in a 400 status code for the response
    * Attempt to create with already taken gift card number: Should result in a 400 status code
    * POST with missing card number: Should result in a 400 status code
    * POST with valid new card: Should successfully create.
  * Test get cards for user
    * Get with invalid username (not logged in): Tests that 404 and body corresponding to empty list returned for request to get all cards associated with an invalid username when user is not logged in.
    * Get with invalid username (logged in): Same as previous, but with user logged in
    * Get with valid username (not logged in): Tests that the cards associated with username are gotten, but the actual card numbers are masked (by checking first card)
    * Get with valid username (logged in): Tests that the cards associated with the username that the user is logged in as are gotten, with the actual card numbers not masked (by checking the first card)
    * Get with valid username (logged in to different account): Same as *Get with valid username (not logged in)*, but with user logged in to a different account than that with the request's username.
    * Get from user without any cards: Tests that getting the cards for a user that does not have any cards returns an empty list (an a 404 error)
* spec.cy.js (from Sprint 2):
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
* describe here

Below is the link to the video recording of our group demonstrating new features and tests of Gift Card Xchange for Sprint 3.




