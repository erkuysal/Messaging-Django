import {Box, CssBaseline } from '@mui/material';

import PrimaryAppBar from '../pages/templates/PrimaryAppBar';
import PrimaryDraw from "../pages/templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";

import Main from "./templates/Main";

import PopularChannels from "../components/PrimaryDraw/PopularChannels.tsx";
import ExploreCategories from "../components/SecondaryDraw/ExploreCategories.tsx";

// funtion Home() {}  : is same as using down below
const Home = () => {
    return(
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <PrimaryAppBar/>
            <PrimaryDraw>
                <PopularChannels/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ExploreCategories/>
            </SecondaryDraw>
            <Main/>
        </Box>
    );
};


export default Home;