require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const {checkSchema} = require('express-validator')

const configureDB = require('./config/db')
const multer = require('multer')


const userCltr = require('./app/controllers/user-cltr')
const iteamsCltr = require('./app/controllers/iteams-cltr')
const {authenticateUser, permitUser} = require('./app/middlewares/authentication')
const {userRegisterSchema,userLoginSchema} = require ('./app/helpers/user-validationSchema') 
const iteamSchema = require('./app/helpers/iteam-validationSchema')



const port = 3465
const app = express()
app.use(express.json())
app.use(cors())
configureDB()

const upload = multer()

//routes

//users
app.post('/api/register',checkSchema(userRegisterSchema) ,userCltr.register)
app.post('/api/login',checkSchema(userLoginSchema),userCltr.login)
app.post('/api/addcart/:pId',authenticateUser,userCltr.addCart)
app.get('/api/account', authenticateUser,userCltr.account)
app.get('/api/allAccounts', authenticateUser,permitUser('admin'),userCltr.allAccounts)
app.post('/api/remIteam/:pId',authenticateUser,userCltr.removeIteamCart)
app.post('/api/users/orders',authenticateUser,userCltr.addOrder)
app.post('/api/status/:uId/:pId',authenticateUser,permitUser('admin'),userCltr.status)

//iteams
app.post('/api/iteams/add',authenticateUser,permitUser('admin'), upload.array('iteamImage'),checkSchema(iteamSchema),iteamsCltr.add)
app.put('/api/iteams/edit/:pId',authenticateUser,permitUser('admin'),upload.array('iteamImage'),checkSchema(iteamSchema),iteamsCltr.update)
app.delete('/api/iteams/delete/:pId',authenticateUser,permitUser('admin'),iteamsCltr.delete)
app.get('/api/iteams/all',iteamsCltr.all)
//orders


app.listen(port, ()=>{
console.log('server running',port)
})