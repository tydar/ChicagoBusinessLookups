import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b3ddf2',
    },
    secondary: {
      main: '#ff0000',
    }
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
