import {Box, CssBaseline } from '@mui/material';

import PrimaryAppBar from '../pages/templates/PrimaryAppBar';
import PrimaryDraw from "../pages/templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";


// funtion Home() {}  : is same as using down below
const Home = () => {
    return(
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <PrimaryAppBar/>
            <PrimaryDraw></PrimaryDraw>
            <SecondaryDraw/>
            <Main/>
        </Box>
    );
};


export default Home;