# Project Name
Gift Card Xchange

# Project Members (Group 24)
**Front-End Engineers**: Jacob Simmons-Rosen, Vi Tran 

**Back-End Engineers**: Seth Barber, Tuyet Phan

# Project Description

## Problem

Sometimes we are given gift cards to a place we rarely shop for. What do we do with the unwanted gift cards then? What if there’s a website that allows us to exchange gift cards at face value and with no hidden fees? 

## Solution

With giftcardxchange.com, users upload their gift cards and perform exchanges with other users. They also have the option to sell their gift cards. The prices are up to the user's discretion. There will be a secure user login page and a profile page for each user, including a credibility score given by other users. After the user exchanges or sells a gift card, advertisements from the gift card company are displayed. We will also have a page that provides businesses with different options to advertise their products on our web application, such as a payment plan based on how frequently they would like to showcase their products. 

## Features

There are two main pages for the front end: Brands and Dashboard

### Brands

Any visitor of the site can view the Brands page. It displays the companies who have cards avaiable as cards that also include the number of gift cards avaialble. By clicking on one of these cards, the user gets taken to another page dedicated to that company, showing a table of avaiable cards. Through this table, logged-in users are allowed to make a request to swap one of their cards for another card.

### Dashboard

This page is available only to registered, logged-in users. There are four tabs on this page:
  * Profile: This tab displays user information
  * My Wallet: This tab displays the gift cards users have
  * Add New Card: Allows a user to add a new card
  * My Requests: Quick stop that allows user to view requests they made or made of them, and accept, deny, or cancel requests.

The use of these features is described below in the User Manual

# Using the Application

## Viewing Available Cards
Cards can be viewed by both logged in users and users who are not logged in. An example of browsing available cards is below.

https://user-images.githubusercontent.com/100868317/232946305-61070e13-ea6a-49fc-afd7-28b071ba8c02.mp4


If the user tries accessing the request functionality when not logged in, an error message is displayed (see below).


https://user-images.githubusercontent.com/100868317/232946335-20e856f4-aeda-410c-9c85-23752ec1ae6f.mp4

## Getting Started

### Signing Up

https://user-images.githubusercontent.com/100868317/232808196-d89bf065-3d95-4426-9182-26171d699999.mp4

Signing up is done through the log-in tab on the navigation bar. Once the log-in page loads, there will be an option at the bottom to register instead.
Clicking that will bring up the registration form, which after checking that each form input is filled, runs a query to the backend to register a new user.
Should the user be new and not share data with existing users, a success code is sent back which then makes the page navigate to the login form. Otherwise,
an alert pops up with a failure message.

### Logging In


https://user-images.githubusercontent.com/100868317/232867337-3b81eaa0-817f-41c6-9cc9-5df5c604095d.mp4


Similar to signing up, logging in requires navigating to the log-in tab in the nav bar. Then, inputting valid credentials into the resulting form sends a backend request
to check if they match. Should that be the case, the user is redirected to the home page and a cookie is created to save the login info of the user between sessions.
Should the user log-in again, it would replace their current session with that of the new user. Invalid form inputs or trying to log in to an inxesitent user results in
failure and an appropriate message.

## Dashboard

https://user-images.githubusercontent.com/100868317/232808472-3b9aa1b4-68d1-4889-a19d-3c6e4eb0aa89.mp4

Accessing the dashboard is only available to a logged-in user that has a cookie containing their information. The dashboard presents a way to view information about the current user,
including their account information, what cards they have in "My Wallet," and their inbound and outbout requests. The dashboard is all in one component, with each section being a mat-tab element,
therefore, no redirection takes place and the dashboard is contained within a single page.

### Viewing User information
Viewing user information can be done so through the dashboard via a logged-in user with a cookie. It is the first tab, and the one that opens when the redirect initially happens.
It has infromation about the user that they input during their registering process which matches what is utilized in the back-end. Data is obtained by decoding the cookie through a back-end query.

### Viewing Your Cards in MyWallet
Viewing your cards follows the same parameters as viewing user information; however, it is the second tab in the dashboard. Upon navigating to it, a table is displayed containing all
the cards that are owned by the user in the database. This is done through a back-end call utilziing the current cookie to check userID from log-in info to sort the main database of all cards.

### Adding a New Card

https://user-images.githubusercontent.com/100868317/232838008-d46cf6b9-ae1f-43fa-b58d-334b7f48cfa5.mp4

The user's dashboard displays an *Add Card* button that allows the user to add a new gift card to their wallet. The user enters the card information, such as the brand name, amount, card number, which is only accessible to the gift card holder, and expiration date. Once the information is successfully entered, the new gift card will appear in the user's *My Wallet*. The database will reflect the newly created gift card in the back end.

## Swapping Cards

### Requesting Swap



https://user-images.githubusercontent.com/100868317/232948606-27c01465-f1c2-4601-b3e7-188fb97e9576.mp4



There are a variety of different brands displayed on the homepage. Once a user clicks on one of the brand's logos, a new page appears showcasing all the owners of the brands available for swapping. Each line of the card list contains a "Request Swap" button at the end. After clicking this button, another box appears, asking the user which of their cards they would like to swap with. After the user selects the card with the "Submit" button, this information is sent to the back end to identify which two cards will potentially be swapped by the requested card's owner.

If the user tries to make an invalid request, which are requesting a swap for a card they already own, making a duplicate request, and not being logged in when making the request, a message is shown. An example of this behavior is below.

https://user-images.githubusercontent.com/100868317/232945503-f85cbac2-db27-47c1-80fe-5bc24e3a782c.mp4

### Accepting Swap


https://user-images.githubusercontent.com/100868317/232836295-62ab8cf4-3a15-4742-8f51-825fcfbfd301.mp4


In the user's dashboard, there are two categories of swap requests: one made by the user addressed in the *Outbound Requests* and the second made by others addressed in the *Inbound Requests*. Each card request in the *Outbound Requests* contains a *Deny* or *Accept* option. If the user is satisfied with the swap request, they can click on *Accept* and both parties will own different gift cards. The database updates the new owner's card information.

Additionally, accepting a swap deletes other pending swaps associated with the cards involved in the swap, as those requests were made by the previous card owners.

### Denying Swap and Canceling Swap

If a user does not wish to accept a swap, they may deny it. The video below demonstrates this action.


https://user-images.githubusercontent.com/100868317/232836327-fd0f53d7-db53-4d68-b39c-607e9aa3b5bd.mp4


Similarly, if a user decides to cancel a swap, they may do so. The video below demonstrates this action.


https://user-images.githubusercontent.com/100868317/232836411-86eb8a8b-272b-4031-8b42-ed0c10e3995f.mp4


### Logging Out

https://user-images.githubusercontent.com/100868317/232809591-d1e16b6d-0e61-4e71-a49b-eeb95ed2a3ce.mp4

After the user finish using the web application, they can log out with the button labeled "Log out" from the drop-down of the arrow next to the "Hi [username]" message on the top. The cookie session will end as well.

## Future Functionality

In addition to the current functionality, other functionality may be added in the future to improve the user experience.

* Ads will pop up after the gift cards exchange is made
  - This new functionality will allow a user to immediately use their new card.
* Notify users that their gifts cards are expiring soon. 
  - This new functionality will allow users to know that they need to user their card
* Rating/review system of the users 
  - Suspend if users are committing fraud or misdemeanors, allowing users to be confident that the site is trustworthy
* Business page with different options for companies to advertise their products
  - Payment plans for monthly, quarterly, or annually.
* Description about business
  - Allow any users unfamiliar with a given company to instantly gain information about that company
* Social media icon links for sites like Facebook, Instagram, Twitter
  - Allow users to share card availability or their swap on social media

# Setting Up the Project For Use

## Initial Set Up

### 1. Dowload Languages and Environments

This project uses the go programming language, angular, and the Node Package Manager. Please see https://go.dev and https://nodejs.org for how to download these. To run the Cypress tests (used for testing front-end functionality and some back-end functionality), Node version 16 must be used.

### 2. Get the Code
The code can be installed from this github repo.

### 3. Install Dependencies
Within the *GiftCardExchange* folder, run the following command from the terminal:
```
npm install
```

This should install all the needed packages for running the angular server part of the application.

Similarly, within the *Cypress* folder, run the same command to install Cypress, a popular testing framework.

*Note: To use Cypress testing, you must be using Node version 16. Later versions of Node have an unresolved issue that causes the tests to not run correctly.*

Within the folder */src/server* run the following command
```
go install
```
This will get all the needed go packages for running the backend.

## Running the Application
To run the application, open two terminals

### First Terminal: Back End
To start the back end, navigate in the terminal to the */src/server* folder and run the following command in the terimal:
```
go run .
```
This will start up the back end on port 8080, and corresponding messages will be printed to the screen. If the file *database.sqlite*, which stores the data for the application, does not exist, it will be created and initialized with the test data.

If you have used the database and want to reset it to the test data, run the following command instead:

```
go run . reset
```

### Second Terminal: Front End
In the second terminal, go to the *GiftCardExchange* Folder and run the following command:
```
ng serve
```
This will start the server running on the local host on a certain port number. By default, this port number will be 4200.

### Using the Application

In a browser, navigate to http://localhost:4200/ to gain access to the application if the port the front end is running on is 4200. If a different port number is being used, please shut down any applications that are using that port and re-run the command.

## Running Tests

### Go Tests
In a terminal, navigate to *src/server* then run ```go test```. This will run the tests and report the results back. You may see some error message relating to the database print out. However, these can be safely ignored as they are part of normal operation. 

### Angular Tests
In a terminal, navigate to *GiftCardExchange* and run ```ng test```. This will open a web browser displaying the results of testing.

### Cypress Tests
The code for the Cypress tests is located in the *Cypress* folder. First, start the back end and front end as instructed above. Next, navigate to that *Cypress* folder in a new terminal and run ```npx cypress open``` in the terminal. Afterwards, follow the direction listed on the Cypress website on how to run and view the tests. Note that only end-to-end tests were used in this project.

# Troubleshooting and Potential Problems

## Testing

### Cypress Tests
If you are having tests fail, there can be two potential issues:

1. If tests concerning creation of users/cards fail, then the most likely issues is that the tests have been run previously and the old information has not been removed. This can be remedied by running the command ```go run . reset``` in *src/server* in the terminal.

2. An entire set of tests failing is likely being caused by running on Node version 17 or later. Please run Cypress using Node version 16.

For other issues, make sure the test data has been created and consult online sources.

### Angular Tests
Make sure you have installed all dependencies. If you are getting errors about loading packages, please look online. Usually, however, the error about a package being missing can be resolved by running the following command in the command prompt in the GiftCardXChange folder:
```
npm install <package-name>
```
Similarly, you may have to install bootstrap. You can do this by running, in the same location as above
```
npm install bootstrap
```

### Go Tests

There are a few issues where Go tests may not be running:

1. If tests concerning creation of data are failing, the tests are likely failing because they were run previously. You can reset the data by running ```go run . reset``` as detailed above.

2. Make sure you have all dependencies installed by running ```go install```

3. If you are running in VS Code and cannot get the tests to run, there are few troubleshooting steps you can follow:
    1. Make sure you have the go extensions for VS Code installed
    2. Close down VS Code, navigate directly to *src/server* and open it up in VS Code.
    3. Run the tests using the command ```go test```
    4. Search online for similar issues

For other issues, please search online.


# Some of the original material (go through this and add to above or delete)
          
Removed from list (delete before submission):
  * Search different gift cards by the company and dollar amount
  * Login page, a user profile
  * Check if the gift card number is valid and if it hasn’t been entered twice
      * Check if gift cards are redeemed and if there is a remaining balance 
  * Each gift card will have its own page which will have options to request an exchange, sell, and confirm transactions 
  * Two views for each gift card:
      * View of requester:
          * Sees the gift card amount and company. Can click a button to make a request.
          * Cannot try to exchange their gift card with two gift cards simultaneously
      * View of owner (from "My Wallet"):
          * Sees the gift card amount, company, and number.
          * Underneath card information, sees a list of requests for that gift card and what is being offered in exchange. Can accept one of these requests or        reject requests.

### Back End API request needs:
  * User
      * Request to GET user information
      * Request to PUT new user
      * Request to PUSH user information
      * Request to DELETE user
      * Set user state (for suspension)
      * User information:
          * Username
          * Password
          * Email
          
  * Gift card
      * Request to GET gift card information
      * Request to PUT gift card
      * Request to DELETE Gift Card (if it has been redeemed)

Unimplement (Future Goals)
  * Ads will pop up after the gift cards exchange is made
  * Notify users that their gifts cards are expiring soon  
  * Rating/review system of the users 
      * Suspend if users are committing fraud or misdemeanors 
  * Business page with different options for companies to advertise their products
      * Payment plans for monthly, quarterly, or annually
  * Description about business 
  * Social media icons such as facebook, instagram, twitter
