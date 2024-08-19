import {
    List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Box, Typography,
} from '@mui/material';
import {ListItemAvatar} from "@mui/material";
import {Avatar} from "@mui/material";

import {useEffect} from "react";
import {Link} from "react-router-dom";

import useCrud from '../../hooks/useCrud';
import { MEDIA_URL } from "../../config.ts";

interface Server {
    id: number;
    name: string;
    category: string;
    icon: string;
}


type Props = {
  open: boolean;
};

const PopularChannels: React.FC = ({ open }) => {
    const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>([],
        "/server/select/");

    useEffect(() => {
        fetchData();
    }, []);

    return <>
    <Box sx={{
        height: 50, p: 2,
        display: "flex", alignItems: "center",
        flex: "1 1 100%",
    }}>

        <Typography sx={{display: open ? "block" : "none" }}>
            Popular
        </Typography>

    </Box>
    <List>
        {dataCRUD.map((item) => (
            <ListItem key={item.id}
                      disablePadding
                      sx={{display: "block"}}
                      dense={true}
            >
                <Link to={`/server/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit", fontSize:"large"}}>
                    {item.name}
                </Link>
            </ListItem>
        ))}
    </List>
    </>;
}

export default PopularChannels;


