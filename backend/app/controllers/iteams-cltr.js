const Iteams = require('../models/iteams-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const uploadToS3 = require('../middlewares/imageupload')


const iteamsCltr ={}
//iteam adding
iteamsCltr.add = async function (req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body= req.body
    //const body = _.pick(req.body,['iteamName','description','price','image']) 
    //console.log('1',body)
    try{
        const userid = req.user.id
        const filesData = req.files 

        let images=[]
        for(const file of filesData){
            const uploadResult = await uploadToS3(file)
            // console.log('kkkkkkk',uploadResult)
            images.push(uploadResult)   
        }
        body.iteamImage = images
        console.log('userid',userid)
        const iteam = new Iteams(body)
        iteam.iteamOwner = userid
        await iteam.save()
        res.json({
            iteam
        })       
        
    }
    catch(e){
        //internal server error
        console.log('error',e)
        res.status(500).json(e)
    }
}
//edit
iteamsCltr.update = async function(req,res){ 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    } 
    const pId = req.params.pId 
    const body = req.body
    //const body = _.pick(req.body,['iteamName','description','price'])
    //console.log('edit',req.body)
    //console.log('edit',body)
    try{
        const filesData = req.files
        console.log('f',filesData)
        //const iteam = await Iteams.findById(pId)
        //console.log('iteam',iteam.iteamImage)
        
        let images=[]
        for(const file of filesData){
            const uploadResult = await uploadToS3(file)
            console.log('kkkkkkk',uploadResult)
            images.push(uploadResult)   
        }
        console.log('img',images)
        body.iteamImage = images

        //console.log('body',body)
    //     await iteam.save()
        const product = await Iteams.findOneAndUpdate({_id: pId}, body,{new : true})
        //console.log('productupdate',product)
        res.status(200).json({product})
    }
    catch(e){
        res.status(500).json(e)
     }
}
//add iteam to cart 

//delete
iteamsCltr.delete = async function(req,res){
    const pId= req.params.pId
    try{
        
            const data =await Iteams.findOneAndDelete({_id: pId})
            res.status(200).json(data)
        
    }catch(e){
        res.status(500).json(e)
    }
}
//




//all
iteamsCltr.all = async function (req, res) {
    try{
        const iteams = await Iteams.find()
        res.status(200).json(iteams)
    }
    catch(e){
        res.status(500).json(e)
    }
}



module.exports = iteamsCltr