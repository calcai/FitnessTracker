import { createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';

const Theme = createTheme({
    typography: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize : 14,
        header1: {
            fontStyle: "italic",
            fontSize: 30,
        },
        body1: {
            fontSize: 20,
        }
    },
    
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

export default Theme