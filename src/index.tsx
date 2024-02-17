import React from 'react';
import ReactDOM from 'react-dom/client';
//import Router from './screens/Router';
//import { RouterProvider } from 'react-router-dom';
//import router from './screens/Router';
import App from './App';
import {theme} from "./theme";
import { ThemeProvider } from 'styled-components';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App/>
    </ThemeProvider>
  </React.StrictMode>
); 