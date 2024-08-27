import useWebSocket from "react-use-websocket";
import {Button} from "@mui/material";
import {useState} from "react";

const socketURL = "ws://127.0.0.1:8000/ws/test";

const Server = () =>
{
    const [message, setMessage] = useState<string>("");


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
         setMessage(msg.data);
     }
 });

    const sendMessage = () => {
        const message = {text: "Hello!"};
        sendJsonMessage(message);
    }

    return (
        <div>
            <Button onClick={sendMessage}> Send </Button>
            <div>Received Data : {message}</div>
        </div>
    );
};

export default Server;