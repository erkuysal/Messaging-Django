import {useState} from "react";
import useWebSocket from "react-use-websocket";

import useCrud from "../hooks/useCrud";

import {useAuthService} from "./AuthService";
import {Server} from "../@types/server";

import {WS_ROOT} from "../config.ts";

interface Message {
    sender: string;
    content: string;
    time_stamp: string;
}


const useChatServiceWS = (channelId: string, serverId: string) => {

    const socketURL = channelId
    ? `${WS_ROOT}/${serverId}/${channelId}`
    : null;

    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState<Message[]>([]);

    const {logout, refreshAccessToken} = useAuthService();

    const {fetchData} = useCrud<Server>(
        [],
        `/messages/?channel_id=${channelId}`
    );

    const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
    const maxConnectionAttempts = 4;

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

     onClose: (event: CloseEvent) => {
        if (event.code === 4001) {
            console.log("Authentication Error!");
            refreshAccessToken().catch((error) => {
                if(error.response && error.response.status === 401){
                    logout();
                }
            });
        }
         console.log("Closed!");
         setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
     },

     onError: () => {
        console.log("Error!");
     },

     onMessage: (msg) => {
       const data = JSON.parse(msg.data);
       setNewMessage((prev_msg) =>[...prev_msg, data.new_message]);
       setMessage("");
     },

     shouldReconnect: (closeEvent) => {
        if(closeEvent.code === 4001 && reconnectionAttempt >= maxConnectionAttempts){
            setReconnectionAttempt(0)
            return false;
        }
        return true;
     },
     reconnectInterval: 1000,
 });

    return {
        newMessage,
        message,
        setMessage,
        sendJsonMessage,
    }

}

export default useChatServiceWS;