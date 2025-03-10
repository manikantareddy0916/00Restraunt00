import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from 'validator'
import { useNavigate } from "react-router-dom";
import axios from '../config/axios'
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { startUser } from "../actions/userAction";

export default function Login() {

  const navigate= useNavigate()
  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [serverErrors, setServerErrors] = useState([])
  const [clientErrors, setClientErrors] = useState({})
  const errors ={}

  const runValidation =()=>{
    //email
    if(formData.email.trim().length ==0){
        errors.email = 'EMAIL IS REQUIRED '
    }else if  (!validator.isEmail(formData.email)){
        errors.email = 'valid email is required'
    }
    //password
    if(formData.password.trim().length ==0){
        errors.password = 'password is required '
    }else if(!validator.isStrongPassword(formData.password)){
        errors.password= 'Strong password required'
    }
}

  const handleChange = (event) => {
    const { name, value } = event.target;
    const data ={...formData, [name]:value}
    setFormData(data)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    runValidation()
    console.log('now',errors)
    console.log('now',errors)
    if(Object.keys(errors).length ===0){
      const formDataFinal={
        email : formData.email,
        password : formData.password
      }
      console.log('d',formDataFinal)
      setClientErrors(errors)
      try{
        const response = await axios.post('/api/login',formDataFinal)
        console.log('resp',response.data)
        localStorage.setItem('token', response.data.token)
        dispatch( startUser())
        // const profile = await axios.get('/api/account', {
        //   headers: {
        //      'Authorization': localStorage.getItem('token')
        //   }
        // })  
        //console.log('prog',profile)
        
        navigate('/', { state: {message: 'You Login Sucessfully'} })
      }
      catch(e){
        setServerErrors(e.response.data.errors)
        console.log('catch',e)
      }
    }else{
      setClientErrors(errors)
      console.log('setClienterror',errors)
    }
  };

 // console.log('fd',formData)
  //console.log('err',errors)
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",  // Full screen height
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: "100%", textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <>
          {serverErrors.length > 0 && (
          <div>
              {serverErrors.map(ele => (
              <p key={ele.msg} style={{ color: "red" }} >{ele.msg}</p>
              ))}
          </div>
          )}
        </>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            
          />
          {clientErrors.email && <span style={{ color: "red" }}>{clientErrors.email}</span>}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            
          />
          {clientErrors.password && <span style={{ color: "red" }}>{clientErrors.password}</span>}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Link to="/register" style={{ textDecoration: "none", fontSize: "14px" }}>
              Register
            </Link>
          </Box>
          {}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, bgcolor: "black" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
