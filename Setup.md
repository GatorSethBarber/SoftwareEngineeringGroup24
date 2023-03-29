# Setting Up the Project For Use

## Initial Set Up

### 1. Dowload Languages and Environments

This project uses the go programming language, angular, and the Node Package Manager. Please see https://go.dev and https://nodejs.org for how to download these.

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
This will start up the back end on port 8080, and corresponding messages will be printed to the screen.

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

### Logging In

### Dashboard

#### Viewing User information

#### Veiwing Your Cards in MyWallet

### Adding a New Card

### Swapping Cards

#### Requesting Swap

#### Accepting Swap

### Logging Out

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