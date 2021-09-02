import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import { createTheme } from "@material-ui/core/styles";
export const theme = createTheme({
  palette: {
    // type: "dark",
    light: {
      background: blue[700],
      secondary: grey[50],
      fontMain: grey[800],
      primary: blue[800],
      card: grey[100],
      grey500: grey[500],
      grey400: grey[400],
    },
  },
});
