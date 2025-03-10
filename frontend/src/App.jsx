import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ContactUs from "./components/ContactUs"
import About from "./components/About"
import Login from "./components/Login"
import Home from "./components/Home"
import Register from "./components/Register"
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { startAllIteams } from "./actions/iteamsAction"
import Iteam from "./components/Iteam"
import Cart from "./components/Cart"
import { startAllUsers, startUser } from "./actions/userAction"
import AddIteam from "./components/AddIteam"
import Edititeam from "./components/Edititeam"
import Allorders from "./components/Allorders"
import Myorders from "./components/Myorders"
// import { addAllCartIteam, addCartIteam } from "./actions/cartAction"


function App() {

  const dispatch = useDispatch()
  const data = useSelector((state)=>{
    return state.user
  })

  
  useEffect(()=>{
    ( async()=>{
      try{
        // if(localStorage.getItem('cartIteams')){
        // const cData = JSON.parse(localStorage.getItem('cartIteams'))
        // //console.log('app',cData)
        // dispatch( addAllCartIteam(cData) )
        // }

        dispatch( startAllIteams() )
        dispatch (startUser() )
        dispatch( startAllUsers())
      }
      catch(e){
        console.log('e',e)
      }

    })()
  },[])


  return (
    <BrowserRouter>
    <nav>
      <Navbar />
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/ContactUs" element={<ContactUs/>} />
      <Route path="/Iteam" element={<Iteam />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/AddIteams" element={<AddIteam />} />
      <Route path="/About" element={<About />} />
      <Route path="/Myorders" element={<Myorders />} />
      <Route path="/Allorders" element={<Allorders />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
