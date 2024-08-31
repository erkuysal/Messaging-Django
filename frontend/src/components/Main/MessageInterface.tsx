import useWebSocket from "react-use-websocket";
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";
import {useParams} from "react-router-dom";

import {Server} from "../../@types/server";

import useCrud from "../../hooks/useCrud";


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
            </Box>)
            : (<>
                <div>
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
                </div></>
            )}
        </>
    );
};

export default MessageInterface;