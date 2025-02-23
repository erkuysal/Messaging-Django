import {List, ListItem, ListItemButton, ListItemText,
    Box, useTheme, ListItemIcon, Typography,
} from "@mui/material";
import {ListItemAvatar} from "@mui/material";

import {useEffect} from "react";
import {Link} from "react-router-dom";

import useCrud from "../../hooks/useCrud.ts";
import {MEDIA_URL} from "../../config.ts";
import getTextDecoration from "@mui/material/Link/getTextDecoration";


interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
}

const ExploreCategories = () => {
    const theme = useTheme();

    const isDarkMode = theme.palette.mode === "dark";

    const { dataCRUD, error, isLoading, fetchData } = useCrud<Category>(
        [],
        "/server/category/");


    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <Box
            sx={{
                height:"50px", display:"flex", alignItems:"center",
                px:2, borderBottom:`1px solid ${theme.palette.divider}`,
                position:"sticky", top:0, backgroundColor: theme.palette.background.default,
        }}>
            Explore
        </Box>

        <List sx={{ py:0 }}>
            {dataCRUD.map((item) => (
                <ListItem disablePadding key={item.id} sx={{display:"block"}} dense={true}>
                    <Link to={`/explore/${item.name}`} style={{ textDecoration: "none"}}>
                        <ListItemButton sx={{ minHeight: 48}}>

                            <ListItemIcon sx={{ minWidth: 0, justifyContent:"center"}}>
                                <ListItemAvatar sx={{ minWidth: "0px" }}>
                                    <img alt={"server Icon"} src={`${MEDIA_URL}${item.icon}`}
                                         style={{ width:"25px", height:"25px", display:"block", margin:"auto",
                                         filter : isDarkMode ? "invert(1)" : "invert(0)",
                                    }}
                                    />
                                </ListItemAvatar>
                            </ListItemIcon>

                            <ListItemText
                                primary={<Typography
                                    variant="body1" textAlign="start" paddingLeft={2}>{item.name}
                                </Typography>}
                            />


                        </ListItemButton>
                    </Link>
                </ListItem>
            ))}
        </List>
    </>
}

export default ExploreCategories;