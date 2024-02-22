import React from 'react';
import ReactDOM from 'react-dom/client';
//import Router from './screens/Router';
//import { RouterProvider } from 'react-router-dom';
//import router from './screens/Router';
import App from './App';
import {theme} from "./theme";
import { ThemeProvider } from 'styled-components';
import { QueryClient,QueryClientProvider } from 'react-query';

const queryClient=new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>{/*ThemeProvider안에 잇는 모든 것이 theme으로 접근ㅇ할 수 있다*/}
    <App/>
    </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
); 