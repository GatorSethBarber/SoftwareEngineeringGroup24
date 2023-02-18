# API Documentation Overview

This is the documentation for Gift Card Xchange.

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


# Users

All users must have a username, email, password, and full name consisting of a first and last name (or just last name if they have only one name). These are all provided by the user. Additionally, a userID is created in the back end, but this is never used by the user.

The following are the necessar API calls. Names in curly braces stand for variables provided by the front end. The http://localhost:8080 is ommitted.

Please use port 4020 for the Angular server.

## User Creation

URL: /user/new
* body should include username, email, password, lastName, firstName

Verb: POST

Response:
* Header: (Content-Type, application/json)
* JSON of new user

Note: First name is optional. This also may be changed to use query instead

## User Information Access

URL: /user/get/{username}/{password}

Verb: GET

Response Header: (Content-Type, application/json)

Response:
* Header: JSON
* JSON: {username: ..., email: ..., password: ..., name: [..., ...]}

If user does not exist, returns a 404 error code in the response.

## Access One Piece of Username (Unimplemented)

Can access one or more distinct pieces of information by placing the names after the username

Verb: GET

URL examples: 
* /user/get/{username}/{password}/email
* /user/get/{username}/{password}/name

## Updating User Information (Unimplemented)

Note: not finished.

Verb: PUT

URL: /user/update/{username}/{password}

# Gift Cards

All gift cards have a gift card number, amount, company, owner, and, potentially, an expiration date.

## Gift Card Creation Implementation Underway

Request Verb: POST

URL: /card/new/{username}/{password}

Body: 
* {cardNumber, amount, companyName, expirationDate}

## Swap Cards (Unimplemented)

Verb: PUT

URL: /card/{username 1}/{username 2}/{card number 1}/{card number 2}

Alternative:
* We have another data table with requests pending per card.
* If user approves of request, then they send via the URL: /card/swap/{username2}/{password2}/{card number 1}/{card identifier 2}
* If pending request for those two cards, swap occurs and returns a 200 code.
* Otherwise, nothing happens and returns a 400 error code.

## Get all Gift Cards for a User (Unimplemented)

Verb: GET

URL: /card/{username}

Response: 
* Header: application/JSON
* JSON: [{username: ..., cardNumber: ..., company: ..., amount: ..., expirationDate: ...}, ...]

## Get Matching Gift Cards: Implementation Underway

Get all (basic information about) the gift cards that match certain search conditions

Verb: GET

URL example: /card/?company="Amazon"&minAmount="15.00"
Potential Search Keys:
* company: The name ofthe company
* minAmount: The minimum amount for the card
* maxAmount: The maximum amount for the card
* exact: Defaults to true, which means company name must be matched exactly. If set to "false", then will allow matching on both sides.


Response:
* Header: application/JSON
* JSON: [{username: ..., company: ..., amount: ..., expirationDate:...}, ...]
