# Introduction
Moving forward with Sprint 2, we fixed what we did not accomplished in Sprint 1. We continued to integrate the front and back end and create the user dashboard after login.

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

If a user with the given username or email already exists, a status code of 400 (bad request) is returned.
Otherwise, a response containing the user's information is returned with a status code of 201 (created)

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

### Gift Card Creation Implementation Underway

Request Verb: POST

URL: /card/new/{username}/{password}

Body: 
* {cardNumber, amount, companyName, expirationDate}

### Get Matching Gift Cards: Implementation Underway

Get all (basic information about) the gift cards that match certain search conditions

Verb: GET

URL example: /card/get?companyName=Starbucks
Potential Search Keys:
* companyName: The name ofthe company
* minAmount: The minimum amount for the card (unimplemented)
* maxAmount: The maximum amount for the card (unimplemented)
* exact: Defaults to true, which means company name must be matched exactly. If set to "false", then will allow matching on both sides.

Response:
* Header: application/JSON
* JSON: [{username: ..., company: ..., amount: ..., expirationDate:...}, ...]



# What We Accomplished
## Front End
* Describe below


## Back End
* Describe below


# Testings
## Front End 
* Unit Tests
  * List below
* Cypress Tests
  * List below


## Back End
### Unit Tests in Go
The testing of all functionality outside of router paths is done in Go. There are two files that contain unit tests, both of which are in src/server/
* rest_test.go: This tests the functions associated with the processing of information.
* serverAndDatabase_test.go: These tests test the functionality of the database.
### Testing the REST API
This is done through an end-to-end Cypress spec.


# Conclusion


