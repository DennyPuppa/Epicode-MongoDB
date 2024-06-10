const mongoose = require('mongoose');
const userRegistrationSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    img:{
        avatar:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true, strict:true})
module.exports = mongoose.model('userRegistrationSchema', userRegistrationSchema);