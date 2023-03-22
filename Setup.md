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

In a browser, navigate to http://localhost:4200/ to gain access to the application if the port the front end is running on is 4200. If a different port number is being used, use that port number rather than 4200 in the URL.

## Running Tests

### Go Tests
In a terminal, navigate to *src/server* then run ```go test```. This will run the tests and report the results back. You may see some error message relating to the database print out. However, these can be safely ignored as they are part of normal operation. 

### Angular Tests
In a terminal, navigate to *GiftCardExchange* and run ```ng test```. This will open a web browser displaying the results of testing.

### Cypress Tests
The code for the Cypress tests is located in the *Cypress* folder. First, start the back end and front end as instructed above. Next, navigate to that *Cypress* folder in a new terminal and run ```npx cypress open``` in the terminal. Afterwards, follow the direction listed on the Cypress website on how to run and view the tests. Note that only end-to-end tests were used in this project.