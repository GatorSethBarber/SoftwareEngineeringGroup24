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
* describe here

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
  * describe here
  
* Cypress Tests
  * describe here

## Back End
* Unit Tests
  * describe here
  
* Cypress Tests
  * describe here

# Conclusion
* describe here

Below is the link to the video recording of our group demonstrating new features and tests of Gift Card Xchange for Sprint 3.




