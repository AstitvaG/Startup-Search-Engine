const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var passport = require("passport");

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Table = require('./models/table');
let Table_sno = require('./models/table_sno');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport");

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully.");
})

// Google oAuth2 requests

userRoutes.route('/auth/google').get(
    passport.authenticate("google", { scope: ["profile", "email"] })
);

userRoutes.route('/auth/google/callback').get(
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function (req, res) {
        res.redirect("http://localhost:3000/search?token=" + JSON.stringify(req.user));
    }
);

// API endpoints

// Getting all the users
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


userRoutes.route('/schools').get(function (req, res) {
    const { exec } = require("child_process");

    exec("sh crawl.sh && cat data_crawling/schools.json", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.send("Error")
            return;
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.send("Error2 :"+stderr)
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.send(`${stdout}`)
    });
})

// Adding a new user
userRoutes.route('/add').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'User': 'User added successfully' });
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Getting a user by id
userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
