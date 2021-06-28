const mongoose = require('mongoose');

const authEmail = new mongoose.Schema({
    email:{
        type:String,
        required:true
        
    },
    code:{
        type:String,
        required:true
    }
});


const AuthEmail= new mongoose.model("AuthEmail",authEmail);

module.exports = AuthEmail;