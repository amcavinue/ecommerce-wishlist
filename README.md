# Ecommerce Wishlist App
A well-engineered app that lets you create a custom wishlist from your favorite products.

![Screenshot](https://raw.githubusercontent.com/amcavinue/ecommerce-wishlist/master/ecommerce-wishlist-combined.jpg)
In-progress tasks during development.
![Screenshot](https://raw.githubusercontent.com/amcavinue/ecommerce-wishlist/master/kanbanflow-combined.jpg)

### Overview
The goal of this app was to exercise full-stack development skills by creating an application that utilizes the entire MERN stack.

### Use Case
Why is this app useful? It allows you to securely create an individual profile, search for your favorite products, and add them to a custom wishlist.

### Live Prototype
The live site can be seen at: [https://powerful-island-41601.herokuapp.com/#/](https://powerful-island-41601.herokuapp.com/#/)

### Development Story
 - Works as a SPA, allowing the user to use the entire app on the same page without reloading the browser.
 - Devops work was performed with an automated build system, test tasks, production deployment, encrypted environment variables, and more.
 - Sessionless user authentication was set up on the front- and back- ends using JWT and Passport.js.
 - All the forms in the application have authentication and alert the user in real time for a good user experience.
 - A CRUD restful API was built on the backend that could be accessed by other applications.
 - A lean kanban approach with continuous deployment was used for a functioning application since day one.
 - The entire application is scalable and maintainable, using the best practices of each language and technology, and following general software principles. The app is coded with clean logic allowing for other developers to pick it up and extend it easily. A separation of concerns is used which will allow for redesigns, refactors, pivots, and more functionality to be added effortlessly.
 - The entire application is unit tested, providing software that is reliable and free of bugs.

### Technical
- The app is built mainly with the MERN stack and makes use of MongoDB and Mongoose, Express, React and Redux, and Node.js. Helper libraries such as Bootstrap, and Passport.js were also used.
- It utilizes ES6 features of JavaScript, making the code easier to read and maintain. These features are transpiled using Babel to work on all browsers.
- All front-end components and back-end API endpoints have been tested using Mocha, and the production version passes all tests.
- The front end is fully responsive and follows clean usability principles.
- Continuous integration using Travis CI was used during development.
- Heroku (server hosting), Cloud9 (editing), and mLab (database) were SaaS services used during development and deployment.

### Development Roadmap
This is version 1.0.0 of the app. There are things that can be changed in the future that I'd like to do:
- Native mobile applications that connect to the API for Android and iPhone.
- Pagination and more pages to search results.