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

    return <></>;
}

export default ExploreServer;