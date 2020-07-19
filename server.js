const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const uri = require("./config/keys").mongoURI;

const users = require('./routes/users');
const comments = require('./routes/comments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));
app.use(express.json());

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

//Routes
app.use('/users', users);
app.use('/comments', comments);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server inciciado no port ' + PORT));