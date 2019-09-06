const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphQL/schema');
const graphQLResolvers = require('./graphQL/resolvers');
const isAuth = require('./middleware/Authorization')

const app = express();


app.use(isAuth);
app.use(bodyParser.json());

app.use('/graphql', graphQlHttp({

    schema: graphQLSchema, 

    rootValue: graphQLResolvers,
    graphiql: true

}));

app.get('/', (req, res, next) => {
    res.send('Hello world');
});


mongoose.connect(`
    mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0-4avtj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    ).then( () => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(process.env.MONGO_USER, process.env.MONGO_PASSWORD)
        console.log(err)
    });
