import useWebSocket from "react-use-websocket";
import {Button} from "@mui/material";
import {useState} from "react";
import {useParams} from "react-router-dom";

const MessageInterface = () =>
{
    const [newMessage, setNewMessage] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const {serverId, channelId} = useParams();

    const socketURL = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null;


    const { sendJsonMessage } = useWebSocket(socketURL,{
     onOpen: () => {
        console.log("Connected!");
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
        <div>
            {newMessage.map(
                (msg, index) =>
                {
                    return (
                        <div key={index}>
                            <p>{msg}</p>
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
        </div>
    );
};

export default MessageInterface;