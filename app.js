"use strict";
const express = require('express');
const options = require("./config/options.json");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

// Get all Users
app.get("/user", requestHandlers.getUsers);

// Create User
app.post("/user", requestHandlers.createUpdateUser);

// Update User
app.put("/user/:id", requestHandlers.createUpdateUser);

// Delete User
app.delete("/user/:id", requestHandlers.removeUser);

// Get all Comments
app.get("/comment", requestHandlers.getComments);

// Create Comment
app.post("/comment", requestHandlers.createUpdateComment);

// Update Comment
app.put("/comment/:id", requestHandlers.createUpdateComment);

// Delete Comment
app.delete("/comment/:id", requestHandlers.removeComment);

// Get all Contents
app.get("/content", requestHandlers.getContents);

// Create Content
app.post("/content", requestHandlers.createUpdateContent);

// Update Content
app.put("/content/:id", requestHandlers.createUpdateContent);

// Delete Content
app.delete("/content/:id", requestHandlers.removeContent);

app.listen(options.server.port, () => console.log('Server inciciado em http://localhost:%d', options.server.port));