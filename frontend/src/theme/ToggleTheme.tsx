import { CssBaseline, useMediaQuery, ThemeProvider } from "@mui/material"; // Added ThemeProvider import
import {  useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import React from "react";

import createMuiTheme from "./light.tsx";
import { ThemeModeContext } from "../context/DarkModeContext.tsx";

interface ToggleThemeProps {
    children: React.ReactNode;
}

const ToggleTheme: React.FC<ToggleThemeProps> = ({ children }) => {

    const storedMode = Cookies.get("themeMode") as "light" | "dark";
    const preferedDarkMode = useMediaQuery("([prefers-color-scheme: dark])");
    const defaultMode = storedMode || (preferedDarkMode ? "dark" : "light");

    const [mode, setMode] = useState<"light" | "dark">(defaultMode);

    const toggleThemeMode = React.useCallback(() =>
    {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    }, []);

    useEffect(() =>
    {
        Cookies.set("themeMode", mode);
    }, [mode]);

    const themeMode = useMemo(() =>
        ({ toggleThemeMode }), [toggleThemeMode]);

    const theme = useMemo(() =>
        createMuiTheme(mode || 'light'), [mode]);

    return (
        <ThemeModeContext.Provider value={themeMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
};

export default ToggleTheme;