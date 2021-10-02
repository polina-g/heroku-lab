const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema (
    {
        title: String,
        text: String,
        author: String,
        img: {type: String, default: ''},
        likes: {type: Number, default: 1},
        sponsored: {type: Boolean, default: false}
    },  
    {timestamps: true}
);

module.exports = mongoose.model('Tweet', tweetSchema);