const User = require('../models/user-model')
const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')


const userCltr ={}
//Register
userCltr.register = async function (req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const body = _.pick(req.body,['userName','email','password']) 
    //console.log('1',body)
    try{
        const user = new User(body) 
        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        const totalUsers = await User.countDocuments()
        user.password = hashedPassword
        if(totalUsers == 0){
            user.role = 'admin'
        }
        await user.save()

      
        res.json({
            msg : 'user registered sucessfully'
        })       
        
    }
    catch(e){
        //internal server error
        console.log('error')
        res.status(500).json(e)
    }
}

//Login
userCltr.login = async function (req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }

    const body= _.pick(req.body,['email','password'])

    try{
        //verfing email
        const user = await User.findOne({email: body.email})
        //console.log('1',user)
        if(!user){
            return res.status(404).json({errors: [{ msg: 'invalid email/password'}]})
        }
        //verfing password  
        const result = await bcryptjs.compare(body.password , user.password)
        //console.log('2',result)
        if(!result){
            return res.status(404).json({errors: [{msg : 'invalid email/password'}]})
        }
        //token generating and Bearer
        const tokenData = {id : user._id, role : user.role } 
        const token = jwt.sign(tokenData, process.env.JWT_SECRET)
        res.status(200).json({token : `Bearer ${token}`})
    }
    catch(e){
        res.status(500).json(e)
    }
}
//productId adding to cart
userCltr.addCart =  async function (req, res) {
    const userId = req.user.id
    const pId = req.params.pId 
    const body= req.body
    //const body = _.pick(req.body,['iteamName','description','price','quantity'])
    //console.log('edit',req.body)
    //console.log('edit',body)
    try {
        
        
        const user = await User.findById(userId);
        console.log('jj',userId,"pid",pId,'body',body,'user',user)

        const cartIt = user.cart.find((ele)=>{
            return ele.pId == pId
        })
        console.log('cart',cartIt)
        if (cartIt) {
            // Update quantity properly using map()
            console.log('if')
            user.cart = user.cart.map(item => 
                item.pId === pId ? { ...item, quantity: body.quantity } : item
            );
        } else {
            console.log('else')
            // Add new item if not in cart
            user.cart.push({ pId, ...body });
        }
        
        
        //const dat = await user.cart.findOneAndUpdate
        // if(user){
        //     const cart = await user.cart.findOneAnd
        // }
        //user.cart = [...new Set([...user.cart, pId])];
        //console.log('user',user)
        
        // User.cart = pId;
        await user.save();
        //console.log('ins',pId,userId,user)


        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
}
}
//add ordered data to orders
userCltr.addOrder = async function (req, res) {
    const userId = req.user.id;
    const body = req.body;

    try {
        const user = await User.findById(userId);

        console.log('ord Order:', body);

        user.orders = body;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


//status Change
userCltr.status = async function (req, res) {
    const userId = req.params.uId;
    const pId = req.params.pId;
    const body = req.body;

    try {
        const user = await User.findById(userId);

        console.log('User ID:', userId, "Product ID:", pId, 'Body:', body);

        // Update the specific order status
        user.orders = user.orders.map((ele) =>
            ele._id === pId ? { ...ele, status: body.newStatus } : ele
        );

        // Save the updated user
        await user.save();
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


//removeCartiteam
userCltr.removeIteamCart = async function (req, res) {
    const userId = req.user.id
    const pId = req.params.pId 
    console.log('1')
    try {
        
        const user = await User.findById(userId);
        //console.log('jj',userId,"pid",pId)

        const cartItR = user.cart.filter((ele)=>{
            return ele.pId !== pId
        })
        //console.log('cart',cartItR)
        if (cartItR) {
            //console.log('if')
            const d = user.cart = cartItR
            //console.log('d',d)
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
}
}
//getAccount 
userCltr.account = async function(req,res){
    try{
        //console.log('b')
        const user = await User.findById(req.user.id).populate('cart')
       // console.log('jj',user)
        
            //console.log('User populated successfully:', user);
            res.status(200).json(user);
        
    }
    catch(e){
        res.status(500).json({ errors: 'something went wrong/add token'})
    }
}
//getAllAccounts
userCltr.allAccounts = async function (req, res) {
    try{
        //console.log('b')
        const user = await User.find()
       // console.log('jj',user)
        
            //console.log('User populated successfully:', user);
            res.status(200).json(user);
        
    }
    catch(e){
        res.status(500).json({ errors: 'something went wrong/add token'})
    }
}



module.exports = userCltr