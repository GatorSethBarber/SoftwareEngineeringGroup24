# API Documentation Overview

This is the documentation for the Gift Card Xchange API.

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

### Updating User Information (Unimplemented)

Note: not finished.

Verb: PUT

URL: /user/update/{username}/{password}


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

### Get all Gift Cards for a User (Implementation Underway)

Verb: GET

URL: /card/{username}

Response: 
* Header: application/JSON
* JSON: [{username: ..., cardNumber: ..., company: ..., amount: ..., expirationDate: ...}, ...]


### Swap Cards (Unimplemented)

Verb: PUT

URL: /card/{username 1}/{username 2}/{card number 1}/{card number 2}

Alternative:
* We have another data table with requests pending per card.
* If user approves of request, then they send via the URL: /card/swap/{username2}/{password2}/{card number 1}/{card identifier 2}
* If pending request for those two cards, swap occurs and returns a 200 code.
* Otherwise, nothing happens and returns a 400 error code.
