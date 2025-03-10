const mongoose = require('mongoose')
const {Schema, model}= mongoose

const userSchema = new Schema ({
    
    orderedUser : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    orders : [{
        type :Array,
    }],
     
    rentalDetails : [{
        type: Schema.Types.ObjectId,
        ref : 'RentalProduct'
    }],
    requestsId : [{
        type : Schema.Types.ObjectId,
        ref : 'RentalProduct'
    }],
    
   
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User