import {List, ListItem, ListItemButton, ListItemText,
    Box, useTheme, ListItemIcon, Typography,
} from "@mui/material";
import {ListItemAvatar} from "@mui/material";

import {useEffect} from "react";
import {Link} from "react-router-dom";

import useCrud from "../../hooks/useCrud.ts";
import {MEDIA_URL} from "../../config.ts";


interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
}

const ExploreCategories = () => {
    const theme = useTheme();

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

        {[...Array(50)].map((_, i) => (
               <Typography key={i}>
                   {i + 1}
               </Typography>
            ))}
    </>
}

export default ExploreCategories;