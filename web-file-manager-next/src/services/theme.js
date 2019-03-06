import { createMuiTheme } from '@material-ui/core/styles';

export function createTheme() {
  return createMuiTheme({
    typography: {
      useNextVariants: true
    }
  });
}
