const express = require('express');
const User = require('./models/User');
const graphqlHTTP = require("express-graphql");
const { schema } = require("./schemas");

const app = express();

app.use("/graphql", graphqlHTTP({
    schemas, graphiql: true
}));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = { User, Thought };
