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

*Front end*:
  * “My Wallet” to show what gift cards users have
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

*Back End API request needs*:
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
