import { createTheme } from '@mui/material';




export const theme = createTheme({
    palette: {
      primary: {
        main: '#FFA500', // Define your primary color
      },
      secondary: {
        main: '#FFC0CB', // Define your secondary color
      },
    },
    typography: {
      fontFamily: 'Baloo 2 Cursive,cursive',// Define your font family
      h1: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
      },
    },
  });