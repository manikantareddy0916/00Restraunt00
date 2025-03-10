const mongoose = require('mongoose')
const {Schema, model}= mongoose

const iteamsSchema = new Schema ({
    iteamName : String,
    description : String,
    price : String,
    category : {
        type : String,
        enum : ['veg','non-veg'],
    },
    iteamOwner :{
        type: Schema.Types.ObjectId
    },
    status: { 
        type : String,
        enum : ['pending','in-progress','completed'],
        default: 'pending' 
    },
    quantity: Number,
    iteamImage : [{url:String,key:String}],
    

}, {timestamps: true})

const Iteams = model('Iteams', iteamsSchema)

module.exports = Iteams