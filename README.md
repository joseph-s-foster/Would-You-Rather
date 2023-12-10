# Would You Rather

## Description

A polling application where users can see and create polls, vote on them, and view the results with real-time 
updates.
Users can view polls but cannot vote or see poll data unless logged in.
Uses MongoDB and GraphqQL for storing user and poll data, Express.js for the API, React for the frontend, and 
Node.js for the server.

## User Story

* WHEN the user visits the homepage,
* THEN the user can see existing polls.
* WHEN the user logs in,
* THEN the user can participate in existing polls, create, edit, and delete polls.
* WHEN the logged in user views an individual poll,
* THEN the logged in user can begin a conversation by creating a comment following their poll submission.
* WHEN the logged in user views their comment,
* THEN the logged in user can edit or delete their comment.

## Future Features

* Comments section for people to discuss, laugh, be friendly about each poll
* Emoticons for a voting icon
* Uploadable pictures for Poll Cards
* Ability to "tag" friends/ users in poll comments
* 

## Acceptance Criteria 

* Be interactive (i.e., accept and respond to user input)
* Be deployed using Render (with data).
* Use a polished UI.
* Use queries and mutations for retrieving, adding, updating, and deleting data.
* Use MongoDB and the Mongoose ODM for the database.
* Use GraphQL with a Node.js and Express.js server.
* Use React for the front end.
* Include authentication (JWT).

## Installation

Download the files from the repo, install the files on your server, and run the following commands:

* npm i
* npm run build
* npm run develop

## Usage

This is a responsive, REACT site where someone may sign up or login and create, edit, delete, and vote on polls.

Link to view: [Would You Rather](https://culturedcuisine-59da43e6096e.herokuapp.com/)

Screenshot of website:
![Would You Rather](culturedcuisine-snap.png "Would You Rather")

## Credits

* Tutoring Sessions with tutor - PG
* Tutoring Sessions with tutor - LL
* Tutoring Sessions with tutor - JF
* Worked with instructor on latency issue when voting and it showing the vote
* Worked with TA - ST