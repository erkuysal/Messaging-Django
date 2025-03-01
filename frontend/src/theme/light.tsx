import {createTheme, responsiveFontSizes} from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar:{
            height: number;
        },
        primaryDraw:{
            width: number;
            closed: number;
        },
        secondaryDraw:{
            width: number;
        },
    }

// ----------------------------------------------

    interface ThemeOptions {
        primaryAppBar:{         // primaryAppBar? : Question mark indicates optional property
            height: number;
        },
        primaryDraw:{
            width: number;
            closed: number;
        },
        secondaryDraw:{
            width: number;
        },
    }
}

export const createMuiTheme = (mode: "light" | "dark") => {
  let theme = createTheme({
      typography:{
        fontFamily: ["Oswald", "sans-serif"].join(","),
        body1:{
          fontSize: "1.1rem",
          fontWeight: 500,
          letterSpacing: "-0.25px",
          color: "#333",
        },
        body2:{
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "-0.5px",
            color: "#333",
        },
        body3:{
            fontFamily: ["VT323","monospace"].join(","),
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "-0.25px",
            color: "#333",
        }
      },
      // COMPONENTS
      primaryAppBar: {
        height: 50,
      },
      primaryDraw: {
        width: 240,
        closed: 70,
      },
      secondaryDraw:{
            width: 240,
      },
      palette: {
          mode,
      },
      // OVERRIDES
      components:{
        MuiAppBar:{
            defaultProps:{
                color: "default",
                elevation: 0,
            },
        },
      },
      // ----------

  });
  theme = responsiveFontSizes(theme);
  return theme;
}

export default createMuiTheme;