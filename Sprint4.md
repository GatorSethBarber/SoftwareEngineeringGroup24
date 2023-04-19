# Introduction
In Sprint 4, we continued to fix the unit tests that did not pass and resumed creating the functionality of allowing users to post gift cards to exchange with each other in the previous sprint. We also added new functionalities to implement in the final sprint.

# What We Planned
We planned to create a fully functional web application by the end of Sprint 4. We planned to implement the remaining necessary user stories to accomplish this task. The essential function of Gift Card Xchange is to allow users to request and exchange gift cards with another user. In the back end, we planned to execute this by creating a new database to store the swapped cards, deleting one gift card from one account holder, and adding the same gift card to another account holder. Similarly, in the front end, we will create a new column in the user's dashboard featuring a "request" button to request an exchange for each listed gift card, and a "swap" button, which allows the gift card owner to click once they agree to exchange. 

The exact details of our functionalities for Sprint 4 is described below in the user stories.  

## User Stories
1. As a user, I want to add a card to my account so I can use it to trade.
2. As a registered user looking to trade, I want to request another user to trade one (or more) of their cards with mine.
3. As a user who had a swap request, I want to be able to confirm it.

# What We Accomplished
The tasks and goals that we accomplished in this sprint are detailed below.

## Front End
* Added tab "Add New Card" to dashboard where user can add their new gift card to their wallet
* Added tab "My Requests" to dashboard where user can see their request to another user and the request from other user to current user
* Added functionality for current user to create a swap request 
* Added functionality for current user to add new gift card
* Added functionality for current user to accept or deny the offered that they have
* Added functionality for current user to cancel the request they have made if they want 
* Added request swap button on card page for current user if they want to make a request with one of the user 


## Back End
* Added functionality for registered users to create a request to swap with another user
* Added functionality for registered users to either accept or deny a swap request from a list of pending requests
* Added functionality to switch ownership of the gift card once both users agree to swap 
* Added route for creating a card request to swap 
* Added routes for accepting and denying a card request
* Added routes for getting all pending card requests from the user and others 
* Created and tested unit and Cypress tests for all of the implemented functions

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Back End API Documentation 

## Important Notes:

Important HTTP Verbs:
* GET: Get information
* PUT: Update information
* POST: Create information
* DELETE: Delete information.

Important HTTP status codes (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) and what they will be used for in the project.
* 200 ok: means that the operation (mainly for GET and PUT) was successful
* 201 created: Means that an objected was created (use for successful POST)
* 400 bad request: Use for bad syntax in POST (creation)
* 404 not found: Will use for error in GET or POST requests

## Currently Available Routes:
The following routes are currently available for use. They are discussed further below.

### User
* Login: /user/login/{username}/{password}
* Logout: /user/logout
* Get user information (legacy): /user/get/{username}/{password}
* Get user information: /user/get/{username}
* Create new user: /user/new

### Gift Cards
* Create gift card (legacy): /card/new/{username}/{password}
* Create gift card: /card/new/{username}
* Get gift card: /card/get

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

### User Login
This logs the user in by checking the provided username and password with information stored in the database. If the data matches, returns a response with a cookie called **session-gcex** that keeps the user signed in.

URL: /user/login/{username}/{passwword}

Verb: GET

Response:
* Header: Default header

Status Codes:
* Successful login: 200
* Unsuccessful login: 404

Note: If the user signs in as a different user without first logging out, the information associated with the cookie changes, but not the expiration date.

### User Logout:
This logs the user out of the session they are currently signed in by deleting the **session-gcex** cookie.

URL: /user/logout

Verb: GET

Status Codes:
* Successful: 200

Note: As no error is thrown if a logged-out user calls this again, the response status code is always 200.

### User Information Access (Current)

Get the information associated with a given username. If the user is logged in with the username (which is unique per user), then gets all information. If not, then personally identifiable information, such as email, password, firstName, and lastName, are replaced with empty strings.

URL: /user/get/{username}

Verb: GET

Response Header: (Content-Type, application/json)

Response:
* Header: JSON
* JSON: {username: ..., email: ..., password: ..., firstName: ..., lastName: ...}

If user does not exist, returns a 404 error code in the response.


### User Information Access (Legacy)

This is the legacy version of getting the user information.

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

Get all (basic information about) the gift cards that match certain search conditions. Searching by issuing company is the only permitted search.

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

### Get all Gift Cards for a User

Verb: GET

URL: /card/get/{username}

Response: 
* Header: application/JSON
* JSON: [{username: ..., cardNumber: ..., company: ..., amount: ..., expirationDate: ...}, ...]

## Swap Cards

Below, the user requesting the swap has control of card 1. The user who has the swap requested of them has control card 2.

### Request Swap

Verb: POST

URL: swaps/request

Body: {CardIDOne, CardIDTwo}

Response: 
* 201 if successful
* 400 if bad request (missing information, does not own card one, owns card two)

### Confirm Swap
Confirms specified swap. Additionally, all pending swaps associated with either card number are automatically deleted (made by previous owners of the cards, not the current ones).

Verb: PUT

URL: swaps/confirm

Body: {CardIdOne, CardIDTwo}

Response:
* 200 if successful
* 404 if swap does not exist
* 400 if bad request

### Deny Swap

Deletes a single swap. (No cascading.) Can be initiated by the iniatator or receiver of a request. A DELETE verb is used for this request. As DELETE cannot use a body, unlike the other swap associated commands, the card IDs are passed in the URL.

Verb: DELETE

URL: swaps/deny/{CardIDOne}/{CardIDTwo}

Example: swaps/deny/1/9 to swap cards 1 and 9, where 1 is the card ID of the card offered by the requester, 9 is the card ID of the card that the requester wanted (or wants).

Response:
* 200: successful (including deleting non-existent, but potentially valid, requests)
* 400: error with request

### Get All Pending Swaps User Requested
Get all the pending requested the user initiated

Verb: GET

URL: swaps/get/pending/requested/user

Response Body: [
    [{cardOne}, {cardTwo}]
]

Response codes:
* 200: success
* 400: error occurred
* 404: No pending requests initiated by the user

### Get All Pending Swaps User Received
Get all the pending requests others initiated with the user

Verb: GET

URL: swaps/get/pending/requested/others

Response Body: [
    [{cardOne}, {cardTwo}]
]

Response codes:
* 200: success
* 400: error occurred
* 404: No pending requests initiated with the user

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Testings
## Front End
* Cypress testing added to all components of dashboard and swaps

### Unit Tests
* From Sprint 3:
    * Tests if the router link work 
* From Sprint 4:
    * Angular component tests to check that each component displays and builds correctly
    * Basic testing to check that html element of each component
    * Test to check if card request form work when it valid and invalid
    * Test to check if add card form work when it valid and invalid
    * Test to check if the function is called when the form is submitted 
    * Test to check if the dialog close button work

### Cypress Tests
* Checks that all requests for a user are displayed
* Cancels outbound request
* Cancels inbound request
* Accepts inbound request
* Makes an outbound request
  * Tests functionality of making a new swap from brand cards page
* Adds a new card for a user


## Back End
Tests for the back end are split into two major groups: Unit tests ran using Go, and tests ran using Cypress

### Unit Tests in Go
The testing of all functionality outside of router paths is done in Go. There are two files that contain unit tests, both of which are in src/server/
* rest_test.go: This tests the functions associated with the processing of information.
  * From Sprint 3:
    * TestBcryptingIsCorrect: Tests working of bcrypt

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
    * TestCompleteData: Test checkUserInfo to ensure it returns true when passed complete data
    * TestIncompleteData: Test checkUserInfo to ensure it returns false when passed incomplete data
* serverAndDatabase_test.go: These tests test the functionality of the database.
  * From Sprint 4:
    * TestCreateRequest: Test that a user is able to create a card request to swap with another user
    * TestGetPendingUserRequests: Test to retrieve all pending requests made by the user
    * TestGetPendingRequestsFromOthers: Test to retrieve all pending requests made by others
    * TestGetSwapIfValid: Test that the cards are valid for swapping to occur
    * TestDenyCardRequest: Test that a user can deny a request which will delete the request from the database
    * TestDeleteCardRequests: Test the deletion of all other requests once the user has confirmed a swap with another user
    * TestPerformSwap: Test that the IDs of the cards are properly switched to the new owner after swapping has occurred
    * TestValidDatabaseCreateRequest: Test that a valid request is created
    * TestDuplicateDatabaseCreateRequest: Test that creating a duplicate request is not allowed and returns an error as a result
    * TestValidDenyCardRequest: Test for the deletion of a valid card request
    * TestNonEmptyValidGetPendingUserRequests: Test to retrieve all valid requests made only by the user
    * TestEmptyValidGetPendingUserRequests: Test to retrieve an empty list when no requests are made by the user
    * TestValidDatabaseGetSwapIfValid: Test that only a valid swap can occur
    * TestInvalidDatabaseGetSwapIfValid: Test that an invalid swap does not exists

  * From Sprint 3:
    * TestValidGetUserExistsPassword: Tests that a user exists for a given valid username and password combination and that the correct user information is returned.
    * TestInvaldGetUserExistsPassword: Tests that a user does not exist for a given invalid username and password combination.
    * TestValidNewGetUserInformation: Tests that getting user information by username with a valid username gets the correct user from the database.
    * TestInvalidNewGetUserInformation: Tests that getting user information by username with a non-existent username causes an error to be thrown by the database.
    * TestValidGetUserID: Tests that getting a user id with a valid username returns the correct user id (via getUserID)
    * TestInvalidGetUserID: Tests that getter a user id with an invalid username returns an error (via getUserID)
    * TestValidGetCardsFromUser: Tests that cards are gotten (using databaseGetCardsFromUser) when a valid username is supplied
    * TestInvalidGetCardsFromUser: Tests that an error is gotten when an invalid username is supplied to databaseGetCardsFromUser
    * TestValidBcryptPassword: Tests that HashPassword and CheckPassword work together correctly
    * TestInvalidBcryptPassword: Tests that HashPassword works correctly.
    * TestComparePasswordAndHash: Tests that CheckPassword correctly checks hashes to be equal.
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
    * TestInvalidDuplicateCardNumber: Test that duplicate card numbers are not allowed
    * TestValidCrateCard: Create a new card for the database

### Testing the REST API in Cypress
This is done through an end-to-end Cypress spec. The tests are stored in the end to end specs spec.cy.js and testBackEndWithCookie.cy.js.
* testSwapBackEnd.cy.js (from Sprint 4):
  * Test Requesting Swap: Test that the route for requesting a swap is working correctly
    * Without Login: If user is not logged in, return a 400 error code
    * Logged in to different account: If user is logged into different account than that of the card owner (for the card being offered), return a 400 error code
    * Logged into same account: User is correctly logged in to try swap: return a 201 to signify the swap was created
    * Own both cards: User cannot create a swap when they own both cards; return a 400
    * Try making duplicate request: Return a 400
    * Using invalid card id numbers: This tests several attempts at using invalid card ids (card ids must be positive integers); return 400 for each attempt
  * Test confirm swap: Test that the route for confirming swaps is working correctly
    * Not logged in: Return a 400
    * Logged in to different account: Do not have authorization to confirm swap; return a 400
    * Logged in to correct account: Have authorization: return a 200 to indicate the swap has successfully taken place
    * Try to confirm nonexistent swap: This request should return a 400
    * Using invalid card numbers: Similar to above; return 400 for each attempt
    * Create request for the following: Not a test; this sets up a swap for the next test;
    * Try making duplicate request: The first attempt should be a 200 because confirming a swap, next 400 because the pending swap no longer exists
  * Test deny swap: Test that the route for denying a single request is working correctly
    * Make valid request for setup: Not a test: Is setting up for subsequent tests
    * Not logged in: Return a 400
    * Logged into different account: Return a 400 (user does not have appropritate authorization)
    * Valid with user 2: Delete the swap while signed in as user 2 and return 200 to indicate deletion successful
    * Valid with user 1: Same as previous, but with user 1 instead
    * Delete swap a second time: Returns a 200 (effectively deleting nonexistent swap)
    * Delete with invalid card number one: Return a 400 (card does not exist or not a number)
    * Delete with invalid card number two: Return a 400 (card does not exist or not a number)
  * Setup for viewing swaps: Not a test: Sets up for the following tests
    * Setup for viewing swaps
  * Test get requested by user: Tests that the route for getting the potential card swaps requested by the user works
    * Withoug login: Return a 400 (not authorized to do swapping)
    * None requested by user: Return a 404 and an empty JSON array
    * Some requested by user: Return a 200 and a JSON array containing the cards in pairs of [requester's card, wanted card] where the card number of the requester's card is not masked (user owns the card) but that of the wanted card is (user does not own that card)
  * Test get requested of user: Test that the route for getting the potential card swaps requested of the user works
    * Withoug login: Return a 400 (not authorized to do swapping)
    * None requested of user: Return a 404 and an empty JSON array
    * Some requested of user: Return a 200 and a JSON array containing the cards in pairs of [requester's card, wanted card] where the card number of the requester's card is masked (user does not own the card) but that of the wanted card is not (user owns that card)
  * Delete swaps for testing views: Not a test: Cleans up remaining pending swaps from the test
    * Delete remaining swaps for test
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
At the start of this project, we developed many user stories to implement, and from those user stories, we analyzed and discussed what was vital in creating *Gift Card XChange*. After implementing functions in the front-end and back-end and running unit and Cypress tests for each sprint, we finally crafted a fully functional web application. Below is the detailed workflow for using the application.

We have developed a homepage that showcases multiple gift cards and their respective available counts. At the top of the homepage features the navigation menu with items called "Brands" and "Login." When a visitor clicks on one of the featured brands, the website directs them to a second page that shows a list of owners for that particular gift card brand. Although a "Request Swap" button appears on each line of the list, the visitor cannot select a card to swap because the drop-down options on the form are empty. When the viewer clicks on the login button, a new window will open that provides two options: the viewer can either register a new account or log in using their existing credentials. Once the visitor registers, the database stores all the user's information, including their full name, username, password, and email. To enhance security, we encrypted the passwords stored in the database by implementing a hashing function. We also implemented a cookie that remembers the user's information, including login credentials. The cookie allows the server to retrieve any information provided during the user's previous session when they revisit the server. Once the user closes the session, these cookies get deleted.

After signing in, the user can see the "Dashboard" and a personalized greeting message that displays "Hi, [user's name]" on the navigation bar. The user's dashboard features four columns: "Profile,"' "My Wallet," "Add New Card," and "My Requests." They can view their personal information in the "Profile" section, and the "My Wallet" section displays their existing gift cards. When the user adds new gift cards using the "Add New Card" feature, the cards get updated in the "My Wallet" section. The "Inbound Requests" and "Outbound Requests" are featured in the fourth column of the dashboard labeled "My Requests." The former displays all requests made by other users to swap their gift cards with the user, while the latter displays requests made by the user to exchange their gift cards with others.

When the user wants to swap their gift card with another user, they can click the "Brands" button and then select the desired gift card. Afterward, the user can click the "Request Swap" button from the list, and a "My Card" dialogue box appears, allowing the user to select the card they want to swap with from the list in their wallet. When the user clicks "Submit Request" and "Close," the application transfers the request information to the database. A pop-up message appears, confirming the successful submission of the request. When the user clicks on the "My Requests" of the dashboard, the newly created request will display the card's information, such as the username of the requested, company, amount, expiration date, and offered card in the "Outbound Requests" section. A "Cancel" button accompanies the card's information enabling the user to cancel the swap request if they change their mind. "My Requests" also has the "Inbound Requests" section. Each line of the "Inbound Requests" table contains the username of the requester, company, amount, expiration date, and the number of the card requested, along with an "Accept" or "Deny" button. If the user denies the request, then the request is deleted from the database. Alternatively, if the user accepts the card request, the IDs of the gift cards are swapped. The database now includes the updated gift card IDs assigned to their rightful users. Creating, denying, and accepting card request mechanisms are developed in the back end with the corresponding functions. Lastly, when the user finishes using the application, they can log out by selecting the drop-down option of the downward arrow next to the greeting message. 

Below is the link to the video recording of our group demonstrating new features and tests of Gift Card Xchange for Sprint 4: https://youtu.be/G4OISgIiA18
