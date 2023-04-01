import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/pages/navbar";
import Dashboard from "@/pages/dashboard";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter></BrowserRouter>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
          <Routes>
            <Route path="/" element={<div>dashboard page</div>} />
            <Route path="/forecasts" element={<div>Forcasts Page</div>} />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
