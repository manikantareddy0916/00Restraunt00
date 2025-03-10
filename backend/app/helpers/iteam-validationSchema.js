const Iteams = require('../models/iteams-model')

const iteamNameSchema = {
        notEmpty :{
            errorMessage :'iteamName is required'
        }
}

const descriptionSchema = {
        notEmpty : {
            errorMessage : 'description is required'
        },
        isLength:{
            options:{min : 2 , max:165},
            errorMessage:"min 2 and max 165"
        }
}
const priceSchema ={
    notEmpty : {
        errorMessage : 'price is required'
    }
}

const categorySchema = {
        notEmpty : {
            errorMessage : 'category is required'
        },
}

const iteamSchema = {
    iteamName : iteamNameSchema,
    description : descriptionSchema,
    price : priceSchema,
    category : categorySchema
}


module.exports = iteamSchema