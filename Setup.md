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

# Using the Application

### Viewing Available Cards

### Signing Up
Signing up is done through the log-in tab on the navigation bar. Once the log-in page loads, there will be an option at the bottom to register instead.
Clicking that will bring up the registration form, which after checking that each form input is filled, runs a query to the backend to register a new user.
Should the user be new and not share data with existing users, a success code is sent back which then makes the page navigate to the login form. Otherwise,
an alert pops up with a failure message.

### Logging In
Similar to signing up, logging in requires navigating to the log-in tab in the nav bar. Then, inputting valid credentials into the resulting form sends a backend request
to check if they match. Should that be the case, the user is redirected to the home page and a cookie is created to save the login info of the user between sessions.
Should the user log-in again, it would replace their current session with that of the new user. Invalid form inputs or trying to log in to an inxesitent user results in
failure and an appropriate message.

### Dashboard
Accessing the dashboard is only available to a logged-in user that has a cookie containing their information. The dashboard presents a way to view information about the current user,
including their account information, what cards they have in "My Wallet," and their inbound and outbout requests. The dashboard is all in one component, with each section being a mat-tab element,
therefore, no redirection takes place and the dashboard is contained within a single page.

#### Viewing User information
Viewing user information can be done so through the dashboard via a logged-in user with a cookie. It is the first tab, and the one that opens when the redirect initially happens.
It has infromation about the user that they input during their registering process which matches what is utilized in the back-end. Data is obtained by decoding the cookie through a back-end query.

#### Viewing Your Cards in MyWallet
Viewing your cards follows the same parameters as viewing user information; however, it is the second tab in the dashboard. Upon navigating to it, a table is displayed containing all
the cards that are owned by the user in the database. This is done through a back-end call utilziing the current cookie to check userID from log-in info to sort the main database of all cards.

### Adding a New Card
The user's dashboard displays an *Add Card* button that allows the user to add a new gift card to their wallet. The user enters the card information, such as the brand name, amount, card number, which is only accessible to the gift card holder, and expiration date. Once the information is successfully entered, the new gift card will appear in the user's *My Wallet*. The database will reflect the newly created gift card in the back end.

### Swapping Cards

#### Requesting Swap
There are a variety of different brands displayed on the homepage. Once a user clicks on one of the brand's logos, a new page appears showcasing all the owners of the brands available for swapping. Each line of the card list contains a "Request Swap" button at the end. After clicking this button, another box appears, asking the user which of their cards they would like to swap with. After the user selects the card with the "Submit" button, this information is sent to the back end to identify which two cards will potentially swap. 

#### Accepting Swap
In the user's dashboard, there are two categories of swap requests: one made by the user addressed in the *Outbound Requests* and the second made by others addressed in the *Inbound Requests*. Each card request in the *Outbound Requests* contains a *Deny* or *Accept* option. If the user is satisfied with the swap request, they can click on *Accept* and both parties will own different gift cards. The database updates the new owner's card information.

### Logging Out
After the user finish using the web application, they can log out with the button labeled "Log out" from the drop-down of the arrow next to the "Hi [username]" message on the top. The cookie session will end as well. 

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
