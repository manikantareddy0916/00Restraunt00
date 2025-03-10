import React, { useEffect, useState } from "react";
import {TextField,Button,Box,Typography,Container,IconButton ,Paper,CardContent ,Select,MenuItem,FormControl,InputLabel,
Card,Grid} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { startAddIteam, sEditIteam, startDeleteItm } from "../actions/iteamsAction";
import { useNavigate } from "react-router-dom";

export default function AddItem() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    

    const categories = ["veg", "non-veg"]; // Category options

    const [editIteam, setEditIteam] = useState({})
    console.log('editTe',editIteam._id)
    const [formData, setFormData] = useState({
        iteamImage: [],
        iteamName: "", 
        description: "", 
        price: "", 
        category: "", 
    });
    //console.log('editTe',editIteam,formData)

    const [serverErrors, setServerErrors] = useState([]);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};

    // Ensure editIteam is valid before accessing _id
const allIteams = useSelector((state) => state.allIteams.allIteams);

const data = useSelector((state) => {
    if (editIteam && editIteam._id) {
        return state.allIteams.allIteams.find((ele) => ele._id === editIteam._id);
    }
    return null; // Return null instead of undefined
});

    //console.log('outsid',data)
    
    console.log('edit',editIteam)
    // Update formData when editIteam changes
    useEffect(() => {
        if (editIteam && Object.keys(editIteam).length > 0) {
            setFormData({
                iteamImage: [],
                iteamName: editIteam.iteamName || "", 
                description: editIteam.description || "", 
                price: editIteam.price || "", 
                category: editIteam.category || "", 
            });
        }
    }, [editIteam]);

    //edit
    const handleClickEdit =(id)=>{
        const findIteam= allIteams.find((ele)=>{
            return ele._id === id
        }) 
        console.log('onclickid',id,findIteam)
        setEditIteam( findIteam)
        
    }
    //delete 
    const handleDelete =(pId)=>{
        const isConfirmed = confirm(`Are you sure you want to delete item with ID: ${pId}?`);
        if(isConfirmed){
            dispatch (startDeleteItm({pId,navigate}))
        }
    }
    //runvalidations
        const runValidation =()=>{
            //images
            if(formData.iteamImage ==0){
                errors.iteamImage = "* Upload atleast one Image"
            }
            //iteamname
            if(formData.iteamName.trim().length ==0){
                errors.iteamName = 'iteamName is required '
            }
            //description
            if(formData.description.trim().length ==0){
                errors.description = 'description is required '
            }
            //price
            if(formData.price.trim().length ==0){
                errors.price = 'price is required '
            }
            //cat
            if(formData.category.trim().length ==0){
                errors.category = 'category is required '
            }
        }

        const handleChange = (event) => {
            const { name, value } = event.target;
            
            const data = { ...formData, [name]: value };
            //console.log('setForm',data)
            setFormData(data);
        
          };
   
          const handleImageChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setFormData({ ...formData, iteamImage: file });
                
            }
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidation();
        console.log('1',formData)
        if (Object.keys(errors).length === 0) {
            setClientErrors({});
            try {
                console.log('2',data)
                
                if(data){
                    const pId = data._id
                    console.log(pId,'1 Iteam EDit/upddating ',formData)
                    dispatch( sEditIteam({formData,pId, navigate}))
                    // dispatch( startAddIteam({formData,pId, navigate }))
                }else{
                    console.log('2 iteam creatingNew/',formData)
                    dispatch( startAddIteam({formData, navigate})) 
                }
                // console.log('2',formData)
                // dispatch( startAddIteam({formData, navigate}))
                
            } catch (e) {
                setServerErrors(e.response.data)
                console.log('ee',e.response.data)
            }
        } else {
            setClientErrors(errors);
        }
    };
    console.log('e',serverErrors,clientErrors,errors)
    return (
        <>
            <>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Add Item
                    </Typography>

                    {/* Display Server Errors */}
                    {serverErrors.length > 0 && (
                        <Box sx={{ color: "red", mb: 2 }}>
                            {serverErrors.map((error, index) => (
                                <Typography key={index}>{error.msg}</Typography>
                            ))}
                        </Box>
                    )}

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Image Upload Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "block", marginBottom: "10px" }}
                    />
                        {clientErrors.iteamImage && <Typography sx={{ color: "red" }}>{clientErrors.iteamImage}</Typography>}

                        <TextField
                            fullWidth
                            label="Item Name"
                            name="iteamName" // Updated here
                            value={formData.iteamName}
                            onChange={handleChange}
                            margin="normal"
                            
                        />
                        {clientErrors.iteamName && <Typography sx={{ color: "red" }}>{clientErrors.iteamName}</Typography>}

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={3}
                            
                        />
                        {clientErrors.description && <Typography sx={{ color: "red" }}>{clientErrors.description}</Typography>}

                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            margin="normal"
                            
                        />
                        {clientErrors.price && <Typography sx={{ color: "red" }}>{clientErrors.price}</Typography>}

                        {/* Dropdown for Category */}
                        <FormControl fullWidth margin="normal" >
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category || ""} // Ensure it's never undefined
                                onChange={handleChange}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {clientErrors.category && <Typography sx={{ color: "red" }}>{clientErrors.category}</Typography>}

                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Paper>
                <h1 style={{ textAlign: "center", color: "#black", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
            All Items
        </h1>

            <Grid container spacing={3} sx={{ mt: 4 }}>
    {allIteams && allIteams.length > 0 ? (
        allIteams.map((ele,i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                    sx={{
                        maxWidth: 345,
                        boxShadow: 3,
                        borderRadius: 2,
                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: 6,
                        },
                    }}
                    >
                         <img
    src={ele?.iteamImage?.length > 0 ? ele.iteamImage[0].url : "placeholder.jpg"} 
    alt={ele?.iteamName}
/>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {ele?.iteamName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {ele?.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {ele?.price}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            <strong>Price:</strong> ${ele?.price}
                        </Typography>
                        <Button onClick={()=>{handleClickEdit(ele?._id)}}> Edit</Button>
                        <IconButton 
                        onClick={() => handleDelete(ele?._id)} 
                        sx={{ color: "red", ml: 1 }}>
                        <DeleteIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                    </CardContent>
                </Card>
            </Grid>
        ))
    ) : (
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
            No items available.
        </Typography>
    )}
</Grid>
            </Container>
            </>
        </>
        
    );
}
