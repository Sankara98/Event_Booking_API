# ![Node/Express/Mongoose Event Booking API](graphql-logo.png)

> ### Event Booking API (Express + Graphql + Mongoose) codebase containing real world examples (CRUD, auth, advanced patterns, etc)

This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm start` to start the local development server

Alternately, to quickly try out this repo in the cloud, you can [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/realworld)

# Code Overview

## Dependencies

- [bodyParser](https://github.com/expressjs/body-parser) - Middleware for parsing incoming HTTP requests
- [bycrypt](https://github.com/kelektiv/node.bcrypt.js) - Library used to facilitate password hashshing
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-graphql](https://github.com/graphql/express-graphql) - Library for graphql integration with express server
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [graphql](github.com/graphql/graphql-js) - Query language
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `graphQL/` - This folder contains graphql schemas and resolvers.
- `helpers` - This folder contains helper functions.
- `middleware` - This contains middleware for authentification of requests.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define and authorization express middleware in `middleware/authorization` that can be used to authenticate requests. The `authorization` middleware configures the `jsonwebtoken` middleware using our application's secret and `bycrypt` and will return a 401 status code if the request cannot be authenticated.

<br />
