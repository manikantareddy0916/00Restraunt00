import { useSelector } from "react-redux";
import { Card, CardMedia, CardContent, Typography, Grid, Container } from "@mui/material";

export default function MyOrders() {
    const orders = useSelector((state) => state.user.user.orders);

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {orders?.map((order, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={order.iteamImage[0].url}
                                alt={order.iteamName}
                            />
                            <CardContent>
                                <Typography variant="h6">{order.iteamName}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {order.description}
                                </Typography>
                                <Typography variant="p" color="green">
                                    {order.status}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
