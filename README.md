# Relish-Time-an-Angular-App

Softuni Angular Project Defense - Regular Exam - April 2024
Angular-Node-Express-Typescript

Intro

An application project built on a stack using Node.js and Express for the back-end, and Angular CLI version 16 for the front-end. All data is stored and fetched from the non-relational database MongoDB.

Angular CLI can be used in the project in order to create components, services, routing etc. And you can access all the commands for client, angular cli and server from the root directly.

Setup
To use angular commands, you need to install angular cli. For that, run:

npm install -g @angular/cli

Clone the repo: git clone https://github.com/yonkow/Relish-Time-an-Angular-App.git

Enter the directory: cd .......................................

The directory contains files created by angular-cli and two directories named client and server. The client directory contains all the angular related code and the server directory contains all the node/express related code.

Install the dependencies: npm install

(NOTE: if error occurs use sudo npm install)

Install global dependencies: (This will install global dependencies which are used to start the server and development)

npm run globalnpms

Running the app
There are some steps in order to do development and deployment easily.

<!-- Development
Code changes watch
To watch the changes in the code during development (both angular and node/express) and compile the changes to javascript/es6, run: (NOTE: Keep this command running in the terminal and use another terminal window to start the server)

npm run watch:all

This command will create a directory named build in the root directory of the project. The build directory contains two directories named client and server. The client directory contains all compiled code of angular and the server directory contains all the javascript code compiled from typescript code. -->

Running Server
In order to run a server for development, open a new terminal window and run:

npm start

This command will run the node server on port 3000. Navigate to http://localhost:3000

(NOTE: This command uses nodemon in order to see the changes in javascript files when compiled from typecript files. If the above command throws an error, install this global dependency sudo npm install -g nodemon and try the above command again).

Now the server is up and running and the code is being watch for any changes so that you can have a smooth development expreience.

To see the data from express/api routes, navigate to:

localhost:3000/api/

Running Client
In order to run the Angular application on the client, open a new terminal window and run:

ng serve

This command will run the Angular client app on port 4200. Then navigate to https://localhost:4200

This documentation will be updated during development of the project.
