import React from "react";


interface ThemeModeContextProps
{
    toggleThemeMode: () => void;
}


export const ThemeModeContext = React.createContext<ThemeModeContextProps>
(
    {
     toggleThemeMode: () => {},
    }
)
