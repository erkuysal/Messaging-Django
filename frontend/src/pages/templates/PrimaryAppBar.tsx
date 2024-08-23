import {AppBar, Box, Drawer, IconButton, Link, MenuItem, Toolbar, Typography, useMediaQuery} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";

import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories.tsx";

const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false);
    const theme = useTheme();

    const isScreenSmall = useMediaQuery(theme.breakpoints.up("sm"))

    useEffect(() => {
        if(isScreenSmall && sideMenu){
            setSideMenu(false);
        }
    }, [isScreenSmall]);

    const toggleDrawer = (open: boolean) =>
        (event: React.MouseEvent) => {
        setSideMenu(open);
    };

    const list = () => (
        <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}}
             role = "presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}
        >
            <ExploreCategories/>
        </Box>
    );

    return(
        <AppBar position={"fixed"} sx={{
            zIndex:(theme) => theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
            <Toolbar variant="dense" sx={{
                height: theme.primaryAppBar.height,
                minHeight: theme.primaryAppBar.height,
            }}>

                <Box sx={{ display:{xs:"block", sm:"none"} }}>
                    <IconButton color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={toggleDrawer(true)}
                                sx={{mr:2}}>
                        <MenuIcon/>
                    </IconButton>
                </Box>

                <Drawer anchor={"left"} open={sideMenu} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>

                <Link href="/" underline={"none"} color={"inherit"}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                        display:{fontWeight:700, letterSpacing:"-0.5px"}
                    }}>
                        MESSAGE
                    </Typography>
                </Link>

            </Toolbar>
        </AppBar>
    )
}

export default PrimaryAppBar;