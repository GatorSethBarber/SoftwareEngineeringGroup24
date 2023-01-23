# Project Name
Name goes here

# Project Members
**Front-End Engineers**: Jacob Simmons-Rosen, Vi Tran 

**Back-End Engineers**: Seth Barber, Tuyet(Snow) Phan

# Project Description
## Seth's Idea
Also, I had an idea for a music application, where we can teach ear training (training people to recognize notes and intervals by ear) 
and how to play by ear (playing a song, then letting the user play the song on any instrument they like, then testing to see how close 
it is to the original song). What do you think of this idea? If you have any other ideas, please let me know.

We can have a combination of two different ideas: *apps* and *courses*:
* *apps*:     Stand alone applications, like a tuner
* *courses*: Series of activities that a user works through: For example, recognize all natural notes, 
             recognize sharps and flats, recognize common intervals, recognize chords

Database needs: Store users, store progress, deliver webpages.\
Frontend needs: Setup users, mark completion, provide training, etc.

## Jacob's Idea
Jacob's idea goes here.

## Vi's Idea
Vi's idea goes here.

## Snow's Idea
1. *Name*: Gift Card Xchange 

*Problem*: Sometimes we are given gift cards to a place we rarely shop for. What do we do with the unwanted gift cards then? What if there’s a website that allows us to exchange gift cards at face value and with no hidden fees? 

*Solution*: With giftcardxchange.com, users upload their gift cards and perform exchanges with other users. They also have the option to sell their gift cards. The prices are up to the user's discretion. There will be a secure user login page and a profile page for each user, including a credibility score given by other users. After the user exchanges or sells a gift card, advertisements from the gift card company are displayed. We will also have a page that provides businesses with different options to advertise their products on our web application, such as a payment plan based on how frequently they would like to showcase their products. 
Potential source to code the validity of gift card numbers: https://rosettacode.org/wiki/Luhn_test_of_credit_card_numbers

  *Front end*:
  * “Your Wallet” to show what gift cards users have
  * Search different gift cards by the company and dollar amount
  * Login page, a user profile
  * Ads will pop up after the gift cards exchange is made
  * Check if the gift card number is valid and if it hasn’t been entered twice
      * Check if gift cards are redeemed and if there is a remaining balance 
  * Notify users that their gifts cards are expiring soon  
  * Rating/review system of the users 
      * Suspend if users are committing fraud or misdemeanors 
  * Each gift card will have its own page which will have options to request an exchange, sell, and confirm transactions 
  * Two views for each gift card:
      * View of requester:
          * Sees the gift card amount and company. Can click a button to make a request.
          * Cannot try to exchange their gift card with two gift cards simultaneously
      * View of owner (off of "Your Wallet"):
          * Sees the gift card amount, company, and number.
          * Underneath card information, sees a list of requests for that gift card and what is being offered in exchange. Can accept one of these requests or        reject requests.
  * Business page with different options for companies to advertise their products
      * Payment plans for monthly, quarterly, or annually
      
*Back End API request needs*:
  * User
      * Request to GET user information
      * Request to PUT new user
      * Request to PUSH user information
      * Request to DELETE user
      * Set user state (for suspension)
  * Gift card
      * Request to GET gift card information
      * Request to PUT gift card
      * Request to DELETE Gift Card (if it has been redeemed)


2. *Name*: Domino Peer Learning

*Problem*: Students teaching students enhance their own learning. That's because it involves active dialogue and collaboration with one another. But it is difficult to find someone to participate in peer learning. 

*Solution*: With a social network like dominopeerlearning.com, students are able to learn from and teach other students who are also ambitious or interested in learning and succeeding. There will be a login page for students to showcase what courses they are enrolled in. Based on the student's profiles, we will match them with other potential students. An example of how Domino Peer Learning works is Student A, who is well-versed in a subject, teaches Student B. Then Student B will teach Student C and so forth much like a domino effect. There will be an icon for each student indicating their learning level for the enrolled classes, whether they are teaching or still learning. This will depend on the reviews provided by other students. Those who do not have reviews are still learning. 

*Front end*:
  * Login page
  * Profile page
    * Courses enrolled or courses taken
  * Display the proficiency of the students
  * Users rate themselves and then other users rate them to compare the accuracy 
  * Form for students to request 1-on-1 tutoring, only credible students can respond
  * Forum for questions for a class like Slack but only credible students can respond 
  * Chat option for students to communicate with one another
  * Asynchronous messaging
  * Ability to type any equations in the web application

*Back end*:
  * Match students and notify them of other students who are taking the same course


3. *Name*: Volunteer with Me! 

*Solution*: Volunteer with Me! is a social network that will allow people to help a charitable organization and befriend new people along the way. Users can create a profile and select which charities they would like to volunteer for. There will be a calendar that displays all of the charitable events. Whenever their chosen charity organization event is soon approaching, the user will be notified of the place, date, and time. There is also an option to connect and chat with other people who are interested in the same charitable organization. 


4. *Name*: We Create

*Solution*: We will create a mock software company that will provide websites and mobile application developments to businesses or individuals. wecreate.com is an online service provider to small businesses or interested individuals who are looking to create a brand for themselves. There will be an about page as well as a sample of work page, showcasing mock websites or software created for former clients. The website will also implement a pop-up messenger whenever someone visits the website.
