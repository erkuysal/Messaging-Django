import {List, ListItem, ListItemIcon, ListItemText,
        Box, Typography,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import {useParams, Link} from "react-router-dom";
// import {Link} from "react-router-dom";
import {useEffect} from "react";

import useCrud from "../../hooks/useCrud";
import {MEDIA_URL} from "../../config";


interface Server {
    id: number;
    name: string;
    description: string;
    icon: string;
    category: string;
}


const ExploreServer = () => {
    const { categoryName } = useParams(); // related with App.tsx line 13
    const url = categoryName ? `/server/category/?category=${categoryName}` : "/server/select"
    const {dataCRUD, fetchData} = useCrud<Server>([], url)

    useEffect(() => {
         fetchData();

    }, [categoryName]);

    return <>
        <Container maxWidth="lg">
            <Box sx={{ pt:1 }}>
                <Typography variant="h3" noWrap component="h2" color="textSecondary"
                            sx={{display:{sm:"block", fontWeight:500, fontSize:"48px", letterSpacing:"-1px"},
                            textAlign:{xs :"center", sm:"left"}
                            }}>
                    { categoryName
                        ? `All About ${categoryName}`
                        : "Were you looking for something?"}
                </Typography>
            </Box>

            <Typography variant="h6" sx={{ pt:6 , pb:1, fontWeight:500, letterSpacing: "-1px" }}>
                Recommended Channels
            </Typography>

            <Grid container spacing={{xs: 0 , sm: 2}}>
                {dataCRUD.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={6} lg={3}>
                        <Card sx={{height:"100%", display: "flex", flexDirection:"column",
                        backShadow:"none", backgroundImage: "none",
                        }}>

                            <Link to={`/server/${item.id}`} style={{ textDecoration:"none", color:"inherit"}}>
                                <CardMedia component="img"
                                           image="https://source.unsplash.com/random/"
                                           alt="random image"
                                           sx={{display: {xs:"none", sm:"block"}}}
                                ></CardMedia>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>;
}

export default ExploreServer;