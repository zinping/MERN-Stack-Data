import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { themeSettings } from "./theme";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return <div className="app">
    <ThemeProvider theme={theme}>
      <BrowserRouter></BrowserRouter>
      <CssBaseline />
      <Box width="100%" height="100%" padding="">
        
      </Box>
    </ThemeProvider>
  </div>;
}

export default App;
