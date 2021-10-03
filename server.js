//===================================================
//DEPENDENCIES
//===================================================
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Tweet = require('./models/tweet.js')
const app = express();
const db = mongoose.connection;
require('dotenv').config();
//===================================================
//PORT
//===================================================
const PORT = process.env.PORT || 3000;
//===================================================
//DATABASE
//===================================================
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);
//Error / Success
db.on('error', (err) => console.log(err.message + ' Something went wrong with the database'));
db.on('connected', () => console.log('MongoDB Connected!'));
db.on('disconnected', () => console.log('MongoDB Disconnected!'));
//===================================================
//MIDDLEWARE
//===================================================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'))
//===================================================
//ROUTES
//===================================================
//=====================INDEX=========================//tested
app.get('/', (req, res) => {
    res.redirect('/tweets');
});
app.get('/tweets', (req, res) => {
    Tweet.find({}, (err, tweets) => {
        res.render('index.ejs', {
            tweets: tweets
        })
    })
})
//=====================NEW===========================//Tested and Done
app.get('/tweets/new', (req, res) => {
    res.render('new.ejs')
});
//=====================DELETE========================//tested
app.delete('/tweets/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
        res.redirect('/tweets');
    })
});
//=====================UPDATE========================//tested and Done
app.put('/tweets/:id', (req, res) => {
    req.body.sponsored = !!req.body.sponsored;
    
    Tweet.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedTweet) => {
            if(err) {
                console.log('someting went wrong')
            }
            res.redirect('/tweets');
        }
    );
});
//=====================CREATE========================//tested and Done
app.post('/tweets', (req, res) => {
    req.body.sponsored = !!req.body.sponsored;
    Tweet.create(req.body, (err, tweet) => {
        res.redirect('/tweets');
    }); 
});
//=====================EDIT==========================//tested and Done
app.get('/tweets/:id/edit', (req, res) => {
    Tweet.findById(req.params.id, (err, tweet) => {
        // res.send(tweet + '' + 'id: ' + req.params.id);
        res.render('edit.ejs', {
            tweet: tweet,
            id: req.params.id
        });
    })
});
//=====================SHOW==========================//tested
app.get('/tweets/:id', (req, res) => {
    Tweet.findById(req.params.id, (err, tweet) => {
        res.send(tweet);
        // res.render('show.ejs', {
        //     tweet: tweet,
        //     id: req.params.id
        //  });
    });
});
//===================================================
//LISTENER
//===================================================
app.listen(PORT, () => console.log(`Express is listening on port: ${PORT}`));