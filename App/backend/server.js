const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var passport = require("passport");

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let View_individual = require('./models/view_individual');
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
        res.redirect("http://localhost:3000/previoussearches?token=" + JSON.stringify(req.user));
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

// Getting previous_searches
userRoutes.route('/previoussearches').post(function (req, res) {
    Table_sno.find({ userid: req.body.userid })
    .sort({ time: -1 })
    .exec(function (err, body) {
        if (err) {
            console.log(err);
        } else {
            res.json(body);
        }
    });
});

show = [];
searchval = ""

// Getting all the results
userRoutes.route('/show/showresult').get(function (req, res) {
    Table.find({ searchid: show }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.send({ body: users, val: searchval });
        }
    });
});

// Add searchid
userRoutes.route('/show').post(function (req, res) {
    show = req.body.id;
    searchval = req.body.val
    res.send('1');
});



//putting values in db
userRoutes.route('/schools').post(function (req, res) {
    if (!req.body.userid || !req.body.searchval) {
        res.send("Invalid");
        return;
    }
    let table_sno = new Table_sno({
        userid: req.body.userid,
        searchval: req.body.searchval
    })
    table_sno.save().then(table_sno => {

        const { exec } = require("child_process");

        exec("sh crawl.sh", (error, stdout, stderr) => {
            if (error) {
                res.send("Error : " + error)
                return;
            }
            else if (stderr) {
                res.send("Error2 :" + stderr)
                return;
            }
            // res.send(JSON.parse(stdout))
            stdout = JSON.parse(stdout)
            for (var i = 0; i < stdout.length; i++) {
                var temp = stdout[i];
                let table = new Table({
                    userid: req.body.userid,
                    searchid: table_sno._id,
                    title: temp['title'],
                    c1: "Address:" + temp['address'][0],
                    c2: temp['address'][1],
                    c3: temp['address'][2],
                    c4: temp['address'][3],
                    c5: temp['address'][4],
                    c6: temp['address'][5],
                    c7: temp['address'][6],
                });
                table.save();
            }
            Table.collection.insertMany(stdout);
            res.send("Completed")
        });
    })
})

//putting values in db
userRoutes.route('/startups').post(function (req, res) {
    if (!req.body.userid || !req.body.searchval || !req.body.domain || !req.body.country) {
        res.send("Invalid");
        return;
    }

    let table_sno = new Table_sno({
        userid: req.body.userid,
        searchval: req.body.searchval
    })
    table_sno.save().then(table_sno => {

        const { exec } = require("child_process");

        exec("sh crawl_startups.sh \""+req.body.domain+"\" \""+req.body.country+"\" ", (error, stdout, stderr) => {
            if (error) {
                res.send("Error : " + error)
                return;
            }
            else if (stderr) {
                res.send("Error2 :" + stderr)
                return;
            }
            // res.send(JSON.parse(stdout))
            stdout = JSON.parse(stdout)
            for (var i = 0; i < stdout.length; i++) {
                var temp = stdout[i];
                let table = new Table({
                    userid: req.body.userid,
                    searchid: table_sno._id,
                    title: temp['title'],
                    c1: "Description:"+temp['description'],
                    c2: "Domain(s):"+JSON.stringify(temp['domains']),
                    c3: "Url:www.startuptracker.io" + temp['url'],
                    c4: "Image@"+temp['image']
                });
                table.save();
            }
            Table.collection.insertMany(stdout);
            res.send("Completed")
        });
    })
})

//putting values in db individual startup
userRoutes.route('/viewdetails').post(function (req, res) {

    View_individual.find({name : req.body.name}, function (err, user) {
        console.log(user);
        
        if(!(user==[]))
        {
            res.json(user);
        }
        else
        {
                const { exec } = require("child_process");
        
                exec("sh crawl_startups_ind.sh \""+req.body.url+"\ ", (error, stdout, stderr) => {
                    if (error) {
                        res.send("Error : " + error)
                        return;
                    }
                    else if (stderr) {
                        res.send("Error2 :" + stderr)
                        return;
                    }
                    // res.send(JSON.parse(stdout))
                    stdout = JSON.parse(stdout)
                    for (var i = 0; i < stdout.length; i++) {
                        var temp = stdout[i];
                        let table = new View_individual({
                            name: req.body.name,
                            c1:"test"
                        });
                        table.save();
                    }
                   // Table.collection.insertMany(stdout);
                    res.send("Completed")
                })
        }

    });
    console.log("ok cool fine yes");
    res.send("hdhgfh");
    

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
