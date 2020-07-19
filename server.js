const express = require('express');
const mongoose = require('mongoose');
const uri = require("./config/keys").mongoURI;
const app = express();
const db = mongoose.connection;

const users = require('./routes/users');
const comments = require('./routes/comments');

app.use(express.json());

//Routes
app.use('/users', users);
app.use('/comments', comments);

// Connect to MongoDB
mongoose
    .connect(
        uri,
        {
            dbName: "sustentabilidade",
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.listen(3000, () => console.log('Server inciciado'));