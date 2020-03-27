const express = require("express");
const bodyParser = require("body-parser");
const graphQlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const graphQLSchema = require("./graphQL/schema");
const graphQLResolvers = require("./graphQL/resolvers");
const isAuth = require("./middleware/Authorization");

const isProduction = process.env.NODE_ENV === "production";
const app = express();
app.use(cors());

app.use(isAuth);
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQlHttp({
    schema: graphQLSchema,

    rootValue: graphQLResolvers,
    graphiql: true
  })
);

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/conduit");
  mongoose.set("debug", true);
}

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + server.address().port);
});
