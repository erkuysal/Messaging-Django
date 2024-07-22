import {createTheme} from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar:{
            height: number;
        }
    }
    interface ThemeOptions {
        primaryAppBar:{         // primaryAppBar? : Question mark indicates optional property
            height: number;
        }
    }
}

export const createMuiTheme = () => {
  let theme = createTheme({
      typography:{
        fontFamily: ["Silkscreen", "sans-serif", "VT323", "monospace"].join(","),
      },
      // COMPONENTS
      primaryAppBar: {
        height: 50,
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
  return theme;
}

export default createMuiTheme;