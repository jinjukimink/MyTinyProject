import { BrowserRouter,Routes,Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";
import Chart from "./Chart";
import Price from "./Price";

interface IRouterProps{
    toggleDark:()=>void;
    isDark:boolean;
}

function Router(){
    return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Coins />}/>
        <Route path="/:coinId" element={<Coin />}>
            <Route path="price" element={<Price/>}/>
            <Route path="chart" element={<Chart />}/>
         </Route>
    </Routes>
    </BrowserRouter>
    </>
    );
}
export default Router; 