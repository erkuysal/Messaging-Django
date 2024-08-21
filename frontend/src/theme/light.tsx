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

export const createMuiTheme = () => {
  let theme = createTheme({
      typography:{
        fontFamily: ["Silkscreen", "sans-serif", "VT323", "monospace"].join(","),
        body1:{
          fontSize: "1.1rem",
          fontWeight: 500,
          letterSpacing: "-0.25px",
          color: "#333",
        },
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