import React from 'react';
import ReactDOM from 'react-dom/client';
//import Router from './screens/Router';
//import { RouterProvider } from 'react-router-dom';
//import router from './screens/Router';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { QueryClient,QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient=new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
    <App/>
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
); 