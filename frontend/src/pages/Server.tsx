import {Box, CssBaseline } from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";

import PrimaryAppBar from '../pages/templates/PrimaryAppBar';
import PrimaryDraw from "../pages/templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";

import Main from "./templates/Main";

import MessageInterface from "../components/Main/MessageInterface.tsx";
import ServerChannels from "../components/SecondaryDraw/ServerChannels.tsx";
import UserServers from "../components/PrimaryDraw/UserServers.tsx";

import useCrud from "../hooks/useCrud.ts";

import { Server } from "../@types/server"
import {useEffect} from "react";

const Server = () => {
    const navigate = useNavigate();
    const { serverId, channelId } = useParams();

    const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    `/server/select/?by_serverid=${serverId}`
    );

    if (error !== null && error.message === "400") {
        navigate("/")
        return null;
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Check if the channelId is valid by searching for it in the data fetched from API.
    const isChannel = (): boolean => {
        if(!channelId) {
            return true;
        }

        return dataCRUD.some((server) =>
            server.channel_server.some(
                (channel) => channel.id === parseInt(channelId)
            )
        )
    }

    useEffect(() => {
        if(! isChannel())
        {
            navigate(`/server/${serverId}`)
        }
    }, [isChannel, channelId]);


    return(
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <PrimaryAppBar/>

                <PrimaryDraw>
                    <UserServers open={false} data={dataCRUD}/>
                </PrimaryDraw>

                <SecondaryDraw>
                    <ServerChannels data={dataCRUD}/>
                </SecondaryDraw>

                <Main>
                    <MessageInterface data={dataCRUD}/>
                </Main>
        </Box>
    );
};


export default Server;