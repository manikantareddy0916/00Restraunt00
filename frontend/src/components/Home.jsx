import { useSelector } from "react-redux";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const allIt = useSelector((state) => state?.allIteams); // Access Redux store


    
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Items for Rent
            </Typography>
            <Grid container spacing={3}>
                {allIt.allIteams.length > 0 ? (
                    allIt.allIteams.map((ele, i) => (
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
                                onClick={() => navigate('/Iteam', { state: { iteamId: ele._id } })}
                            >
                                {ele?.iteamImage?.length > 0 && (
                            <img
                                src={ele.iteamImage[0].url} // Access first image URL
                                alt={ele?.iteamName}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "8px",
                                    borderTopRightRadius: "8px"
                                }}
                            />
                        )}

                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {ele?.iteamName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {ele?.description}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                        <strong>Price:</strong> ${ele?.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" align="center" sx={{ width: "100%", mt: 4 }}>
                        No Items Available
                    </Typography>
                )}
            </Grid>
        </Container>
    );
}
