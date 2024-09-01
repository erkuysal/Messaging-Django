import {
    AppBar, Toolbar, Box, ListItemAvatar, Avatar,
    Typography, IconButton, Drawer, useTheme, useMediaQuery
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Server} from "../../@types/server";
import {MEDIA_URL} from "../../config.ts";

import ServerChannels from "../SecondaryDraw/ServerChannels.tsx";
import ExploreCategories from "../SecondaryDraw/ExploreCategories.tsx";


interface ServerChannelProps {
    data: Server[];
}

const ChannelInterface = (props: ServerChannelProps) => {
    const theme = useTheme()
    const {data}  = props;

    const {serverId, channelId} = useParams();
    const channelName = data
        ?.find((server) => server.id == Number(serverId))
        ?.channel_server.find((channel) => channel.id == Number(channelId))
        ?.name || "Home";


    const isScreenSmall = useMediaQuery(theme.breakpoints.up("sm"))
    useEffect(() => {
        if(isScreenSmall && sideMenu){
            setSideMenu(false);
        }
    }, [isScreenSmall]);

    const [sideMenu, setSideMenu] = useState(false);
    const toggleDrawer = (open: boolean) =>
        (event: React.MouseEvent) => {
        setSideMenu(open);
    };

    const list = () => (
        <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}}
             role = "presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}
        >
            <ServerChannels data={data}/>
        </Box>
    );

    return(
        <>
            <AppBar sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
                color="default"
                position="sticky"
                elevation={0}
            >
                <Toolbar variant="dense" sx={{
                    minHeight: `${theme.primaryAppBar.height}px`,
                    height: `${theme.primaryAppBar.height}px`,
                    display:"flex", alignItems:"center"
                }}>

                    <Box sx={{
                        display:{xs:"block", sm:"none"}
                    }}>
                        <ListItemAvatar sx={{
                            minWidth:"40px"
                        }}>
                            <Avatar alt="Server Icon" src={`${MEDIA_URL}${data?.[0]?.icon}`}
                            sx={{ width: 30 , height: 30}}
                            />
                        </ListItemAvatar>
                    </Box>

                    <Typography noWrap component="div">
                        {channelName}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }}></Box>

                    <Box sx={{ display: {xs: "block", sm: "none"} }}>
                        <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                            <MoreVertIcon />
                        </IconButton>
                    </Box>

                    <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                        {list()}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default ChannelInterface;