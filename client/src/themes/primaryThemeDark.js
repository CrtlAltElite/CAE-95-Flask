import { createTheme } from "@mui/material/styles";



export const themeOptions = {
  palette: {
    type: 'dark',
    mode: 'dark', //add
    primary: {
      main: '#AD3A9D',
    },
    secondary: {
      main: '#383AAF',
    },
    info: {
      main: '#CDF7F6',
    },
    error: {
      main: '#FE4A49',
    },
    success: {
      main: '#219835',
    },
    warning: {
      main: '#a09be7',
    },
    background: {
      default: '#231b1b',
      paper: '#201e1e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#160a57"
        }
      }
    }
  }
};


const theme=createTheme(themeOptions);
export default theme