import React from "react";
import "./App.css";
import { Router } from "./Router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./common/theme/theme";
import { OpenAPI } from "./api";

function App() {
  OpenAPI.BASE = "http://localhost:3001";

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
