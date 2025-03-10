import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from 'validator'
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import axios from '../config/axios'


export default function Register() {


    const navigate= useNavigate()


    const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    });
    const [serverErrors,  setServerErrors] = useState([])
    const [clientErrors, setClientErrors] = useState({})
    const errors ={}

    // console.log('eerrors',errors)
    //runvalidations
    const runValidation =()=>{
        //username
        if(formData.userName.trim().length ==0){
            errors.userName = 'userName is required '
        }
        //email
        if(formData.email.trim().length ==0){
            errors.email = 'email is required '
        }else if(!validator.isEmail(formData.email)){
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
    
    const data = { ...formData, [name]: value };
    //console.log('setForm',data)
    setFormData(data);

    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    runValidation();

    //console.log("Register Data:", formData);
    console.log('now',errors)
    if (Object.keys(errors).length === 0) {
        const formDataToSend = {  // Make sure this variable is correctly named
            userName : formData.userName,
            email : formData.email,
            password : formData.password
        };

        setClientErrors(errors);

        try {
            const response = await axios.post('/api/register', formDataToSend);
            console.log("Server Response:", response.data);
            
            navigate('/Login', { state: { message: 'You registered successfully' } });
        } catch (e) {
          setServerErrors(e.response.data.errors)
          console.log('ee',e.response.data.errors)
        }
    } else {
        setClientErrors(errors);
        console.log('Validation Errors:', errors);
    }
};

  //console.log('data',formData)
  //console.log('errore',errors)
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full screen height
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: "100%", textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Register
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
            label="Username"
            name="userName"
            variant="outlined"
            margin="normal"
            value={formData.userName}
            onChange={handleChange}
          />
          {clientErrors.userName && <span style={{ color: "red" }}>{clientErrors.userName}</span>}
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
            <Link to="/login" style={{ textDecoration: "none", fontSize: "14px" }}>
              Already have an account? Login
            </Link>
          </Box>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, bgcolor: "black" }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
