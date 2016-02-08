# Wall Desk Floor
A Seattle-Based Used Bookstore | [Heroku](https://walldeskfloor.herokuapp.com)

### Overview

**Wall Desk Floor** is like a cat shelter. We aim to find a new home for our wonderfully used books. Though none of these books are curated, we know for a fact that we have some damn good books. Browse around and we hope you find what you want. This is an ongoing project and the checkout doesn't actually work.


![Screenshot](http://i.imgur.com/vIWC7LD.jpg)


###Technologies Used:

**Frameworks et al:** MongoDB, ExpressJS, AngularJS and Node (aka the MEAN stack), [Foundation](http://foundation.zurb.com/), CSS3, and [bower](http://bower.io/) for its magical management of front-end dependencies.

**Components:** [Angular-Foundation](https://pineconellc.github.io/angular-foundation/), [Angular-Payments (with Stripe)](https://github.com/laurihy/angular-payments), [FontAwesome](https://fortawesome.github.io/Font-Awesome/), [Hover.css](http://ianlunn.github.io/Hover/), [Animate.css](https://daneden.github.io/animate.css/)

###General Approach

For this project, we spent quite some time working on the wireframes and user stories. We also had the opportunity to connect with the User-Experience Design Immersive (UXDI) students to go through the wireframes and got valuable feedback from them. We started out illustrating our ideal MVP and went from there. 

####Wireframes

![Wireframe](http://i.imgur.com/vnXUfKI.jpg)

####User Stories

#####Customer:

Looking for quality used books online.  Many of the books we have for sale are first editions that might interest not just someone looking for a good read, but someone who wants to own a vintage original edition of a classic.  In this case the images and information about the quality and authenticity of the book is important.  

The experience should draw the user to some of the more desirable books for sale right away on the home page, while also allowing for easy browsing of the entire inventory with just a click and a search.  

When a user selects a book, they should be directed to a page that contains a larger image and more details on the book including a rating and description from the api as well as a button to add the item to the user's shopping cart.

The shopping cart page will populate all of the books the user has selected as well as total the price, etc and allow the user to checkout.  Checkout requires account.

#####Employee/Owner/Admin:

Should have ability to track and modify inventory.  Add, delete, or edit books for sale.  These would be the main differences from customer features.  Would require admin login.

###Interested in this project?

To download and make changes to this project. Fork this project and then clone the repo onto your own machine. It's simple to get the app going - you only need two commands.

	$ npm install

To make sure all your node dependencies are properly installed.

	$ bower install

To make sure all your front-end dependencies are installed.

Since we imported our book data through a .csv file, you should create your own csv file and run the following command (the file name is whatever you named your .csv file)

	$ mongoimport --db bookstore --collection books --type csv --headerline --file /downloads/exampleBookstore.csv

### Book Homies

WALL DESK FLOOR is an app built with MEAN in 7 days, and it is part of project 4 of the Web Development Immersive at General Assembly.

Seth Chute - [GitHub](http://github.com/s-d-c)

Cynthia Wong - [GitHub](http://github.com/cynhw)
