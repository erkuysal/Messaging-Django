import {
    List, ListItem, ListItemButton, ListItemText,
    Box, useTheme, Typography,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";

import {Server} from "../../@types/server";


interface ServerChannelsProps {
    data: Server[];
}

const ServerChannels = (props: ServerChannelsProps) => {
    const theme = useTheme();
    const server_name = props.data?.[0]?.name ?? "Server";

    const {data} = props;
    // console.log(data)
    const {serverId} = useParams();

    return <>
        <Box
            sx={{
                height: "50px", display: "flex", alignItems: "center",
                px: 2, borderBottom: `1px solid ${theme.palette.divider}`,
                position: "sticky", top: 0, backgroundColor: theme.palette.background.default,
            }}>
            <Typography variant="body1" style={{textOverflow: "ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>
                {server_name}
            </Typography>
        </Box>

        <List sx={{py: 0}}>
            {data.flatMap((obj) =>
            obj.channel_server.map((item) => (
                <ListItem disablePadding key={item.id}
                          sx={{display: "block", maxHeight: "40px"}}
                          dense={true}>
                    <Link
                        to={`/server/${serverId}/${item.id}`}
                        style={{textDecoration: "none"}}>
                        <ListItemButton sx={{minHeight: 48}}>

                            <ListItemText
                                primary={<Typography
                                    variant="body1" textAlign="start" paddingLeft={2}>{item.name}
                                </Typography>}
                            />

                        </ListItemButton>
                    </Link>
                </ListItem>
            )
            ))}
        </List>
    </>
}

export default ServerChannels;