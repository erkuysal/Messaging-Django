import {Box, CssBaseline } from '@mui/material';

import PrimaryAppBar from '../pages/templates/PrimaryAppBar';


// funtion Home() {}  : is same as using down below
const Home = () => {
    return(
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <PrimaryAppBar/>
        </Box>
    );
};


export default Home;