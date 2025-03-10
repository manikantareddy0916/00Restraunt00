import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link, useNavigate } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import '../styles/Header.css'
import { Divider, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogoutUser, startUser } from '../actions/userAction';


export default function Navbar() {
  
  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mobile, setMobile] = useState(false)
  const cartData = useSelector((state) => state.user.user.cart);
  const role = useSelector((state)=> state.user.user.role)
  const user = role  


  //console.log('u',cartData)
  //

  const handleDrawer=()=>{
    setMobile(!mobile)
  }
  
  const handleLogout=()=>{
    
    dispatch( startLogoutUser())
    // localStorage.removeItem('cartIteams')
    navigate("/"); 


  }
  //menu

const drawer = (
  <Box onClick={handleDrawer} sx={{ textAlign: "center" }}>
    <Typography
      color="silver"
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, my: 2 }}
    >
      <FastfoodIcon /> Foodi
    </Typography>
    <Divider />
    <ul className="mobile-nav">
      {user ? (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </>
      )}
      <li>
        <Link to="/Cart">Cart - {cartData?.length > 0 ? cartData.length : 0}</Link>
      </li>
    </ul>
  </Box>
);


  
  //
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{bgcolor:'black'}}>
        <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' edge='start' 
            sx={{
                mr:2,
                display:{sm:"none"}
            }} onClick={handleDrawer}>
            <MenuOpenIcon/>
            </IconButton>
          <Typography
            color='silver'
            variant="h6"
            component="div"
            sx={{ flexGrow: 1}}>
            <FastfoodIcon />Foodi
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ul className='navigation-menu'>
                <li>
                <Link to={'/'} >Home</Link>
                </li>
                { role== 'admin' && 
                <>
                 <li>
                <Link to={'/AddIteams'} >Add Iteams</Link>
                </li>
                <li>
                <Link to={'/Allorders'} >allOrders</Link>
                </li>
                </>
                }
                {/* <li>
                <Link to={'/About'} >about</Link>
                </li> */}
                <li>
                <Link to={'/Cart'} >Cart-{cartData?.length>0 ? cartData?.length : 0}</Link>
                </li>
                <li>
                <Link to={'/Myorders'} >My Orders</Link>
                </li>
                { user ? 
                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li> :
                <li>
                  <Link to={'/Login'} >Login</Link>
                </li>
                }
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
            <Drawer variant='temporary' 
            open={mobile} 
            onClose={handleDrawer} 
            sx={{display:{xs:'block',sm:'none'},"& .MuiDrawer-paper":{boxSizing: "border-box",width:'240px'
            }  }}>
                {drawer}
            </Drawer>
      </Box>
     
    </Box>


  );
}

