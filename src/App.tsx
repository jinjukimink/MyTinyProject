import Router from "./routes/Router";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import {ReactQueryDevtools} from "react-query/devtools";
import {darkTheme,lightTheme} from "./theme";
import { useState } from "react";
import { current } from "@reduxjs/toolkit";
import { Outlet } from "react-router-dom";
const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap')

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video{ 
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
};
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: "Ubuntu", sans-serif;
  font-weight: 300;
  font-style: normal;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}

a {
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  const [isDark , setIsDark]=useState(false);
  const toggleDark=()=>{
      setIsDark(current=>!current);
  }//toggleDark를 Coin에 보내야 하는데, 이 경우에는 Router.tsx에서 Coin.tsx를 라우팅하므로 Router.tsx에 해당 Props를 보내야 한다.
  //<Router toggleDark={toggleDark}/>이렇게 보내면 되는데 그렇다고 Router가 그걸 받을 준비가 되느냐? 그게 아니지 다시 Router.tsx에 가서 Router({toggleDark})로 받아줄 준비를 해야 한다.
  
  return (
    <><ThemeProvider theme={isDark?darkTheme:lightTheme}>
      {/* <button onClick={toggleDark}>mode change</button> */}
    <GlobalStyle/>
    <Router toggleDark={toggleDark} isDark={isDark}/>
    {/* <Outlet context={{toggleDark, isDark}}/> */}
    <ReactQueryDevtools initialIsOpen={true}/>
    </ThemeProvider>
    
    </>
  )
}

// App(isDark,modifierFn)
// ->Router->Coins(modeifierFn)
// ->Router->Coin->Chart(isDark)
export default App;   