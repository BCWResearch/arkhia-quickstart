import "./index.css";
import App from "./pages/App";
import ThemeProvider from "./providers/themeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider>
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById(`root`)
);

