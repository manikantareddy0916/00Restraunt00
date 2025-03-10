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
    // rentalProducts : [{
    //     type : Schema.Types.ObjectId,
    //     ref : 'Product'
    // }],
    // rentalDetails : [{
    //     type: Schema.Types.ObjectId,
    //     ref : 'RentalProduct'
    // }],
    // requestsId : [{
    //     type : Schema.Types.ObjectId,
    //     ref : 'RentalProduct'
    // }],
    
   
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User