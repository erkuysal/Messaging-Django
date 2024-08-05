import {Box, CssBaseline } from '@mui/material';

import PrimaryAppBar from '../pages/templates/PrimaryAppBar';
import PrimaryDraw from "../pages/templates/PrimaryDraw";


// funtion Home() {}  : is same as using down below
const Home = () => {
    return(
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <PrimaryAppBar/>
            <PrimaryDraw></PrimaryDraw>
        </Box>
    );
};


export default Home;