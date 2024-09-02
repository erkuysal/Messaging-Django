import {Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useWebSocket from "react-use-websocket";

import {Server} from "../../@types/server";

import useCrud from "../../hooks/useCrud";

import ChannelInterface from "./ChannelInterface.tsx";
import Scroll from "./Scroll.tsx";


interface ServerChannelProps {
    data: Server[];
}

interface Message {
    sender: string;
    content: string;
    time_stamp: string;
}

interface SendMessageData {
    type: string;
    message: string;
    [key : string] : any;
}


const MessageInterface = (props : ServerChannelProps) =>
{
    const theme = useTheme();

    const {data} = props;
    const [newMessage, setNewMessage] = useState<Message[]>([]);
    const [message, setMessage] = useState("");

    const {serverId, channelId} = useParams();
    const server_name = data?.[0]?.name ?? "Server";

    const {fetchData} = useCrud<Server>([],`/messages/?channel_id=${channelId}`);

    const socketURL = channelId
        ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
        : null;


    const { sendJsonMessage } = useWebSocket(socketURL,{
     onOpen: async () => {
         try{
             const data = await fetchData();
             setNewMessage([]);
             setNewMessage(Array.isArray(data) ? data : []);
             console.log("Connected!");
             console.log("Chat Reloaded.");
         }
         catch (error){
             console.log("Error!");
         }
     },
     onClose: () => {
        console.log("Closed!");
     },
     onError: () => {
        console.log("Error!");
     },
     onMessage: (msg) => {
       const data = JSON.parse(msg.data);
       setNewMessage((prev_msg) =>[...prev_msg, data.new_message]);
       setMessage("");
     }
 });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendJsonMessage({
            type:"message",
            message,
        } as SendMessageData);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter"){
            e.preventDefault();
            sendJsonMessage({
                type:"message",
                message,
            } as SendMessageData);
        }
    };

    function formatTimeStamp(timestamp){
        const date = new Date(Date.parse(timestamp));
        const formatted_date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
     // const formatted_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const formatted_local = date.toLocaleTimeString([],
            {hour: '2-digit', minute:'2-digit', hour12:false});

        return `${formatted_date} at ${formatted_local}`
    }

    return (
        <>
            <ChannelInterface data={data}/>
            {channelId == undefined
            ? (<Box sx={{ overflow:"hidden", p:{xs: 0}, height:`calc(80vh)`,
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <Box sx={{textAlign:"center"}}>
                        <Typography variant="h4" fontWeight={500} letterSpacing={"-0.5px"}
                                    sx={{ px:5, maxWidth:"600px"}}
                        >
                            Welcome to {server_name}!
                        </Typography>

                        <Typography>
                            {data?.[0]?.description ?? "This is our home."}
                        </Typography>
                    </Box>
            </Box>
            ) : (
                <>
                    <Box sx={{overflow:"hidden", p:0, height:`calc(100vh - 100px)`}}>
                        <Scroll>
                            <List sx={{width: "100%", bgcolor:"background.paper"}}>
                            {newMessage.map((msg, index) => {
                                return (
                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="User Image" />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primaryTypographyProps={{fontSize:"12px", variant:"body2"}}
                                            primary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    color="text.primary"
                                                    sx={{display:"inline", fontWeight:400}}
                                                >
                                                    {msg.sender}
                                                </Typography>
                                                <Typography component="span"
                                                            variant="caption"
                                                            color="textSecondary"
                                                >
                                                    {" at "}{formatTimeStamp(msg.time_stamp)}
                                                </Typography>
                                            </>
                                            }
                                            secondary={
                                            <>
                                                <Typography
                                                    variant="body1"
                                                    style={{overflow:"visible", whiteSpace:"normal", textOverflow:"clip"}}
                                                    sx={{display:"inline", lineHeight:1.2, letterSpacing:"-0.2px"}}
                                                    component="span"
                                                    color="text.primary"
                                                >
                                                    {msg.content}
                                                </Typography>
                                            </>
                                            }
                                        >
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
                        </List>
                        </Scroll>
                    </Box>

                    <Box sx={{position:"sticky", bottom:0, width:"100%"}}>
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                bottom:0, right:0, padding: "1rem",
                                backgroundColor: theme.palette.background.default, zIndex: 10,
                            }}
                        >
                            <Box sx={{display:"flex"}}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={1}
                                    maxRows={4}
                                    value={message}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setMessage(e.target.value)}
                                    sx={{flexGrow:1}}
                                />
                            </Box>
                        </form>
                    </Box>
                </>
            )}
        </>
    );
};

export default MessageInterface;