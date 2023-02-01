# API Documentation Overview

This is the documentation for Gift Card Xchange

# Users

All users must have a username, email, password, and full name consisting of a first and last name (or just last name if they have only one name). These are all provided by the user. Additionally, a userID is created in the back end, but this is never used by the user.

The following are the necessar API calls. Names in curly braces stand for variables provided by the front end. The http://localhost:port is ommitted.

## User Creation

Request: PUT

URL: /user/new/{username}/{email}/{password}/{last name}/{first name}

Note: First name is optional.

## User Information Access

URL: /user/get/{username}/{password}

Response:
* Header: JSON
* JSON: {username: ..., email: ..., password: ..., name: [..., ...]}

## Access One Piece of Username

Can access one or more distinct pieces of information by placing the names after the username

URL examples: 
* /user/get/{username}/{password}/email
* /user/get/{username}/{password}/{name}/{password}

## Updating User Information

Note: not finished.

URL: /user/update/{username}/{password}

# Gift Cards

All gift cards have a gift card number, amount, company, owner, and, potentially, an expiration date.

## Gift Card Creation

Request: PUT

URL: /card/new/{username}/{card information}/{amount}/{card information}/{expiration date}

## Swap Cards

Request: PUSH

URL: /card/{username 1}/{username 2}/{card number 1}/{card number 2}

## Get all Gift Cards for a User

Request :GET

URL: /card/{username}

Response: 
* Header: application/JSON
* JSON: [{username: ..., cardNumber: ..., company: ..., amount: ..., expiratioDate: ...}, ...]

## Get Matching Gift Cards

Get all (basic information about) the gift cards that match certain search conditions

URL example: /card/?company="Amazon"&minAmount="15.00"

Respons:
* Header: application/JSON
* JSON: [{username: ..., company: ..., amount: ..., expirationDate:...}, ...]
