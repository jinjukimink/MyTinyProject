import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Container=styled.div`
    padding:0px 20px;
    max-width: 480px;
    margin: 0 auto;
    
`
const Header=styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;

//
`;
const CoinsList=styled.ul``

const Coin=styled.li`
    background-color:white;
    color:${props=>props.theme.bgColor};
    margin-bottom:10px;
    padding:20px;
    border-radius: 15px;
    a{
        transition:color 0.2s ease-in;
        display: block;//버튼의 모든 영역을 눌러도 클릭이 되게 하기 위해서.
    }
    &:hover{
        a{
            color: ${props=>props.theme.accentColor};
        }
    }
`;



const Title=styled.h1`
    font-size:48px;
    color:${props=>props.theme.accentColor}
`;

const Loader=styled.span`
    text-align: center;
    display:block
`

interface CoinInterface{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const[coins,setCoins]=useState<CoinInterface[]>([]);//타입스크립트에게 coin는 CoinInterface배열로 이루어진 배열이라는 것을 알려준다.
    const URL= "https://api.coinpaprika.com/v1/coins ";
    const[loading,setLoading]=useState(true);
    useEffect(()=>{(async()=>{
            const response = await fetch(URL);
            const json=await response.json();
            setCoins(json.slice(0,100));//너무 사이즈가 크니깐 100개만 가져올거임
            console.log(coins);
            setLoading(false);
        })();}
    ,[])
    return (
        <>
        <Container>
        <Header>
        <Title>코인</Title>
        </Header>
        {loading?<Loader/>:<CoinsList>{coins.map(coin => <Coin key={coin.id}> <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link></Coin>)}</CoinsList>}
        </Container>
        </>
    );
} 

export default Coins;