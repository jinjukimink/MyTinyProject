import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import{Helmet} from "react-helmet";


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
        display: flex;
        align-items: center;
        padding: 20px;
        transition:color 0.2s ease-in;
        //display: block;//버튼의 모든 영역을 눌러도 클릭이 되게 하기 위해서.
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
    display:block;
    color:yellow;
`
;

const Img=styled.img`
    width:35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const {isLoading,data}=useQuery<ICoin[]>("allCoins",fetchCoins);//useQuery가 우리가 만든 fetcher함수를 부르고 그것을 return 값을 data에 담아주기까지 한다
    console.log(data);
    return (
        <>
        <Container>
        <Helmet><title>Coins</title></Helmet>
        <Header>
        <Title>코인</Title>
        </Header>
        {isLoading?<Loader/>:
            <CoinsList>{data?.slice(0,100).map(coin => <Coin key={coin.id}> 
            <Link to= {`/${coin.id}`} state ={coin}
            >
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="코인 사진"/>{coin.name} &rarr;</Link>
            </Coin>)
        }
            </CoinsList>}
        </Container>
        </>
    );
} 

export default Coins;