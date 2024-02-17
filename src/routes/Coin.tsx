import { useParams } from "react-router-dom";

interface Params {
    coinId : string|undefined;
}
//test for git
function Coin(){
    const {coinId} = useParams<string>();
    //console.log(params);
    return <h1>Coin:{coinId}</h1>;
}

export default Coin;

