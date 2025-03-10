import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Card, CardContent,IconButton, Typography, CircularProgress, Box, Button, Stack,InputLabel,Select, MenuItem, FormControl} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import {  startUserCart } from "../actions/userAction";

export default function Iteam() {

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [num , setNum] = useState(1)
    const iteamId = location.state?.iteamId;

    const qData = useSelector((state)=>{
        return state.user.user.cart?.find((ele)=>{
            return ele._id == iteamId
        })
    })
    // if(qData){
    //     console.log('d',qData.quantity)
    //     setNum(qData.quantity)
    // }
     console.log('Qdata',qData)
     useEffect(() => {
        if (qData) {
            setNum(qData.quantity);
        }
    }, [qData]);
    //console.log("Location ID:", iteamId);

    const iteam = useSelector((state) => {
        return state.allIteams.allIteams.find((ele) => ele._id === iteamId);
    });

    //console.log("Selected Item:", iteam);
   // iteam['quantity'] = 1
    //console.log('ne',iteam)
    const handleClickCart=()=>{
        const token = localStorage.getItem('token')
        if(token){
            if(qData){
                //adding from cart
                const pId = qData.pId
                const updateCartData= {...qData, quantity: num}
                dispatch( startUserCart( {pId,updateCartData}))
                console.log(pId,'bbbbbb',qData,'updated',updateCartData)
                navigate('/Cart')
            }else{
                //first adding
                const updatedIteam = { ...iteam, quantity: num, pId: iteamId };
                console.log('jjj',updatedIteam)
                //dispatch( addToCart( iteamId))
                dispatch( startUserCart({iteamId,updatedIteam}))
                //dispatch( addCartIteam(updatedIteam,) )
                navigate('/')
            }
            
        }else{
            navigate('/Login')
        }
    }
    //handleclick sub min
    const handleClick=(e)=>{
        //console.log('eee',e)    
            if(e == 'sub'){
                if(num ==1){
                    setNum(1)
                }else{
                    setNum ( num - 1)
                }
            }else if(e == 'add'){
                setNum (num + 1)
            }  
    }


console.log('num',num)
    return (
        <>
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", 
            }}
        >
            {iteam ? (
                <Card 
                    sx={{
                        width: "80vw", 
                        height: "70vh", 
                        boxShadow: 2, 
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 4,
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <Box
                        component="img"
                        src={iteam.iteamImage[0].url}
                        alt={iteam.iteamName}
                        sx={{
                            width: "50%",
                            height: "90%",
                            objectFit: "cover", 
                            borderRadius: "10px"
                        }}
                    />

                    <CardContent sx={{ flex: 1, paddingLeft: 4 }}>
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                            {iteam.iteamName}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
                            {iteam.description}
                        </Typography>
                        <Typography variant="h4" sx={{ mt: 4, color: "green" }}>
                            Price: ${iteam.price}
                        </Typography>

                        
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                        <Typography variant="h9" sx={{ fontWeight: "bold" }}>Quantity</Typography>
                            <IconButton 
                                onClick={() => {handleClick('sub')}} 
                                color="primary" 
                            >
                                <Remove />
                            </IconButton>

                            <Typography variant="h9" sx={{ fontWeight: "bold" }}>{num}</Typography>

                            <IconButton 
                                onClick={() => {handleClick('add')}} 
                                color="primary"
                            >
                                <Add />
                            </IconButton>
                            
                        </Box>
                        {/* Buttons */}
                        <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ padding: "10px 20px", fontSize: "1rem" }}
                                onClick={handleClickCart}
                            >
                                Add to Cart
                            </Button>
                            {/* <Button 
                                variant="contained" 
                                color="secondary" 
                                sx={{ padding: "10px 20px", fontSize: "1rem" }}
                                onClick={handleClickOrder}
                            >
                                Order Now
                            </Button> */}
                        </Stack>
                    </CardContent>
                </Card>
            ) : (
                <CircularProgress /> // Show loader if item is not found
            )}

        
        </Container>
        </>
    );
}
