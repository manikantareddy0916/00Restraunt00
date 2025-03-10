import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Grid, Box, IconButton,Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { startCartOrder, startUpdCrt  } from "../actions/userAction";
import { useEffect, useState } from "react";

export default function Cart() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [totalPrice, setTotalPrice] = useState()
    //cartData
    const cartData = useSelector((state) => state.user.user.cart);

    console.log('c',cartData)

    //orderSubmit
    const handleOrder =()=>{
        console.log('handleOrder',cartData)
        dispatch( startCartOrder({cartData,navigate}))
    }
    //
    useEffect(() => {
        const total = cartData?.reduce((pre, cuv) => {
            console.log('jj', cuv.price * cuv.quantity); 
            return pre + (cuv.price * cuv.quantity ) ; 
        }, 0);
        setTotalPrice(total)
    }, [cartData]);
    
    // Function to handle delete click
    const handleDelete = (pId) => {
        const isConfirmed = confirm(`Are you sure you want to delete item with ID: ${pId}?`);
        console.log('data',isConfirmed == false)
        if(isConfirmed){
            console.log('b',pId)
            dispatch( startUpdCrt({pId}))
        }
    };


    return (
        <Box sx={{ p: 2 }}>
            
            <Typography variant="h5" gutterBottom>
                Your Cart
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
               My Cart
            </Typography>

            <Grid container direction="column" alignItems="flex-start" spacing={2}>
                {cartData?.length > 0 ? (
                    cartData.map((item, index) => (
                        <Grid item key={index} sx={{ width: "100%" }}>
                            <Card
                                sx={{
                                    minWidth: 300,
                                    maxWidth: 400,
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 6,
                                        backgroundColor: "#f5f5f5",
                                        transform: "scale(1.02)",
                                    },
                                    p: 2, 
                                }}
                            >
                                <CardContent
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => navigate('/Iteam', { state: { iteamId: item._id } })}
                                >
                                    {item?.iteamImage?.length > 0 && (
    <img
        src={item.iteamImage[0].url} 
        alt={item?.iteamName || "Item Image"}
        style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
        }}
    />
)}

                                    <Typography variant="h6">Item ID: {item._id}</Typography>
                                    <Typography variant="body1">Name: {item.iteamName}</Typography>
                                    <Typography variant="body1">Description: {item.description}</Typography>
                                    <Typography variant="body2">Price: ₹{item.price}</Typography>

                                    <Typography variant="body2">TotalPrice: ₹{item.price * item.quantity}</Typography>

                                    {/* Delet Section */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                            Quantity
                                        </Typography>
                                        <IconButton color="primary">
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton color="primary">
                                            <Add />
                                        </IconButton>

                                       
                                    </Box>
                                </CardContent>
                              
                                 <IconButton 
                                            onClick={() => handleDelete(item._id)} 
                                            sx={{ color: "red", ml: 1 }}
                                        >
                                            <DeleteIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                            </Card>
                        </Grid>
                        
                    ))
                    
                ) 
            : (
                    <Typography variant="h6" sx={{ m: 2 }}>
                        Cart is empty
                    </Typography>
                )}

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Total Price - ₹{totalPrice || 0}
            </Typography>
            {cartData?.length > 0 ?
             <Button variant="contained" color="primary"sx={{transition: "0.3s",
                "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "green",
                    transform: "scale(1.02)",
                }}}
                onClick={handleOrder} >
                        Place Order
                    </Button>
                    :'ADD ORDERS'}
            </Grid>
        </Box>
    );
}
