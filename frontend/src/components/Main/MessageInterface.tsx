import useWebSocket from "react-use-websocket";
import {Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useState} from "react";
import {useParams} from "react-router-dom";

import {Server} from "../../@types/server";

import useCrud from "../../hooks/useCrud";

import ChannelInterface from "./ChannelInterface.tsx";


interface ServerChannelProps {
    data: Server[];
}

interface Message {
    sender: string;
    content: string;
    timestamp: string;
}


const MessageInterface = (props : ServerChannelProps) =>
{
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
     }
 });

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
                    <Box sx={{overflow:"hidden", p:0, height:`calc(100-100px)`}}>
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
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    color="text.primary"
                                                    sx={{display:"inline", fontWeight:400}}
                                                >
                                                    {msg.sender}
                                                </Typography>
                                            }
                                            secondary={
                                            <Box>
                                                <Typography
                                                    variant="body1"
                                                    style={{overflow:"visible", whiteSpace:"normal", textOverflow:"clip"}}
                                                    sx={{display:"inline", lineHeight:1.2, letterSpacing:"-0.2px"}}
                                                    component="span"
                                                    color="text.primary"
                                                >
                                                    {msg.content}
                                                </Typography>
                                            </Box>
                                            }
                                        >
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
                        </List>

                    </Box>



                {/*<div>
                    {newMessage.map(
                        (msg, index) =>
                        {
                            return (
                                <div key={index}>
                                    <p>{msg.sender}</p>
                                    <p>{msg.content}</p>
                                </div>
                            )
                        }
                    )}
                    <form>
                        <label> Enter Message: </label>
                        <input type="text" value={message}
                               onChange={(e) => setMessage(e.target.value)}
                        />
                    </form>
                    <Button onClick={() =>
                        {
                        sendJsonMessage({type:"message", message})
                        }
                    }
                    > Send </Button>
                </div>*/}
                </>
            )}
        </>
    );
};

export default MessageInterface;