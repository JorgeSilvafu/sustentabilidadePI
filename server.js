const express = require('express');
const options = require("./config/options");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

//Get all Users
app.get("/users", requestHandlers.getUsers);

//Create User
app.post("/users", requestHandlers.createUpdateUser);

// Update User
/** @todo Completar */
app.put("/users/:id", requestHandlers.createUpdateUser);

// Delete User
app.delete("/users/:id", requestHandlers.removeUser);

//Get all Comments
app.get("/comments", requestHandlers.getComments);

//Create Comment
app.post("/comments", requestHandlers.createUpdateComment);

// Update Comment
/** @todo Completar */
app.put("/comments/:id", requestHandlers.createUpdateComment);

// Delete Comment
app.delete("/comments/:id", requestHandlers.removeComment);

//Get all Contents
app.get("/contents", requestHandlers.getContents);

//Create Content
app.post("/content", requestHandlers.createUpdateContent);

// Update Content
/** @todo Completar */
app.put("/content/:id", requestHandlers.createUpdateContent);

// Delete Content
app.delete("/content/:id", requestHandlers.removeContent);


app.listen(options.server.port, () => console.log('Server inciciado no port ' + options.server.port));