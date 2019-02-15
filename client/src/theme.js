import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Khula',
    useNextVariants: true,
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px',
      },
    },
  },
});

export default theme;