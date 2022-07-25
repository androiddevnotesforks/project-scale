const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// const { typeDefs, resolvers } = require("./schemas"); // to be made
// const { authMiddleware } = require("./utils/auth"); // to be made

// const db = require("./config/connection"); // to be made

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../client/public")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => { // wild card route whenever a request for a non-API route is received
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start(); // await to start the server
    server.applyMiddleware({ app }); // apply the express middleware
  
    db.once('open', () => { // open the database connection to mongoose
      app.listen(PORT, () => {
        console.log(`Listening to localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
      })
    })
  };
  
  startApolloServer(typeDefs, resolvers); // have to call the function to startApolloServer