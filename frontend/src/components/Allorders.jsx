import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAllUsers, startChangeStatus } from "../actions/userAction";
import { Box, Card, CardContent, Typography, Select, MenuItem, Button, Grid } from "@mui/material";

export default function Allorders() {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.user?.allUsers || []);
    const statusOptions = ["pending", "in-progress", "completed"];

    // Track selected status for each order
    const [selectedStatus, setSelectedStatus] = useState({});

    // Handle dropdown change
    const handleChange = (orderId, status) => {
        setSelectedStatus((prev) => ({ ...prev, [orderId]: status }));
    };

    // Handle button click to update status
    const handleStatusData = (userId, orderId) => {
        const newStatus = selectedStatus[orderId] || "pending";
        dispatch(startChangeStatus({ userId, orderId, newStatus }));
    };

    useEffect(() => {
        dispatch(startAllUsers());
    }, [dispatch]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}>
                All Orders
            </Typography>

            {userList?.map((user) =>
                user?.orders?.length > 0 ? (
                    <Box key={user._id} sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#333" }}>
                            {user.userName}
                        </Typography>

                        <Grid container spacing={3}>
                            {user.orders?.map((order) =>
                                order._id ? (
                                    <Grid item xs={12} sm={6} md={4} key={order._id}>
                                        <Card sx={{ bgcolor: "#f5f5f5", borderRadius: 2, p: 2, boxShadow: 2 }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                                    {order.iteamName}
                                                </Typography>
                                                

                                                <img
    src={order?.iteamImage?.length > 0 ? order.iteamImage[0].url : "placeholder.jpg"} 
    alt={order?.iteamName}
/>
                                                <Typography variant="body1">Order ID: {order._id}</Typography>
                                                <Typography variant="body1" sx={{ fontWeight: "bold", color: "green" }}>
                                                    Price: ₹{order.price}
                                                </Typography>

                                                {/* Dropdown for Status */}
                                                <Select
                                                    value={selectedStatus[order._id] || order.status}
                                                    onChange={(e) => handleChange(order._id, e.target.value)}
                                                    fullWidth
                                                    sx={{ mt: 2, mb: 2, bgcolor: "white", borderRadius: 1 }}
                                                >
                                                    {statusOptions.map((status) => (
                                                        <MenuItem key={status} value={status}>
                                                            {status}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                                {/* Button to set status */}
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    onClick={() => handleStatusData(user._id, order._id)}
                                                >
                                                    Update Status
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ) : null
                            )}
                        </Grid>
                    </Box>
                ) : null
            )}
        </Box>
    );
}
