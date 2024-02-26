import { BrowserRouter,Routes,Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";
import Chart from "./Chart";
import Price from "./Price";

interface IRouterProps{
    toggleDark:()=>void;
    isDark:boolean;
}

function Router({toggleDark,isDark}:IRouterProps){
    return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Coins toggleDark={toggleDark} isDark={isDark} />}/>
        <Route path="/:coinId" element={<Coin isDark={isDark}/>}>
            <Route path="price" element={<Price/>}/>
            <Route path="chart" element={<Chart isDark={isDark}/>}/>
         </Route>
    </Routes>
    </BrowserRouter>
    </>
    );
}
export default Router; 