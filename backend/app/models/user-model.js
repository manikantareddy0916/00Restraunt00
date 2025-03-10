const mongoose = require('mongoose')
const {Schema, model}= mongoose

const userSchema = new Schema ({
    userName : String,
    email : String,
    password : String,
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    },
    orders :  Array,
    cart   :  Array,
    
    
   
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User
