import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

import DarkModeSwitch from "./DarkModeSwitch.tsx";
import {useState} from "react";


const AccountButton = () =>
{

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(event.currentTarget)
    }

    const handleProfileMenuClose = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(null)
    }


    const renderMenu = (
        <Menu anchorEl={anchorEl} anchorOrigin={{vertical:"bottom", horizontal:"right"}}
              open={isMenuOpen}
              keepMounted
              onClose={handleProfileMenuClose}
        >
            <MenuItem>
                <DarkModeSwitch/>
            </MenuItem>
        </Menu>
    )


    return <Box sx={{display: {xs:"flex"} }}>
        <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle/>
        </IconButton>

        { renderMenu }
    </Box>
}


export default AccountButton;
