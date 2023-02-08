# What We Planned

To jumpstart the Gift Card Xchange project, we fomulated three user stories for sprint 1. From those user stories, we dissected what features to build. We planned to develop a page that displays available gift cards to attract viewers. We also planned to create a sign-up and login button to allow viewers to sign up and become registered users. After logging in, we want the users to have access to their dashboard. 

## Front End

Specifics here
* Create a home page accessible by registered and unregistered users allowing them to browse available gift cards.
* Create a login page and register page for users either login to their account or create a new account if they don't have one.

## Back End

Specifics here
* Design database incorporating users and gift cards
* Design and implement API to get user information (username, password, email, first and last names) based upon provided username and password.

# What We Accomplished

We designed and created the front end for logging on and signing up new users. We additionally started the front end work for viewing available gift cards. We designed and created the back ends for creating new users and accessing their information.

## Front End

Specifics here
* Created the login page and sign up page for users.
* Created the home page for users to see gift cards available.

## Back End

Specifics here
* Deigned the database and created an ER diagram for it (see ERDiagram.png)
* Designed API for accessing user information and creating new standard users. Also started working on the API for the rest of the project, covering creation and accessing of gift cards, swapping gift cards, etc. The API plans are available at APIDocumentation.md.
* Implemented API so that using a URL of the form http://localhost:8080/{username}/{password} user information is returned.
* Developed the create user feature that allows new user's data such as username, email, password, first name, and last name to be stored in the database. Also, developed safety measures that would deny access to the user's account if the user's data are invalid, such as an incorrect password. Additionally, implemented a feature for a unique username and password, or an error message would display.

# What Did not Work Out

Despite the successes we met with in Sprint 1, we did experience some serious setbacks in the implementation of the user stories.

## Front End

Specifics here
* I, Vi, did the test run by entering the username and password and then pressing the login button. The system saved both values, but I was unable to design another page that directs to the user's dashboard after logging in. 

## Back End

Specifics here
* I, Tuyet, had difficulty running my go program. I continuously had the following message: "cc1.exe: sorry, unimplemented: 64-bit mode not compiled in". I searched online for answers and tried different suggestions. I installed MinGW-w64 and added it to my path, but this did not work. Then, I installed TDM-GCC Compiler and added that to my path, but I still got the same error message. Afterwards, I installed another version of MinGW--the minimalist GNU for Windows. I installed all the necessary files in that program, but it still did not work. Finally, I transfered my code for create to my back-end partner, Seth. He edited the code, and it successfully compiled. Currently, I still have the same issue with Visual Studio Code outputing "unimplemented: 64-bit mode not compiled".
* We were unable to implement the back end for allowing people to see which cards are available. This is primarily because doing so would require implementation of the entire database, which was temporarily put off. However, the design process for the database was completed and the design process for the API is mostly done.

# Conclusion
For Sprint 1 of the Gift Card Xchange project, we accomplished two out of the three user stories in our design. We successfully designed the first page that features gift cards and how many of them are available, such as Starbucks (0), Target (4), Best Buy (63), and Kohl's (21). Furthermore, we produced a login button which, after clicking, a log in window pops up for viewers to either sign up or enter their login information. We also developed the create new users and the retrieve data features with back-end implementations. The database stores all the user's information, including their username, password, email, and full name. Even though we accomplished some features of front-end and back-end independently, unfortunately, we were unsuccessful in connecting the two ends. We experienced difficulty trying to connect the front-end to the database of the back-end. We will continue to try to resolve this matter and move forward with executing new features in the upcoming sprint. 
