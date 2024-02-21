import { useEffect, useState } from "react";
import { useParams,useLocation, Outlet,Link,useMatch } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
    padding:0px 20px;
    max-width: 480px;
    margin: 0 auto;
`
const Title=styled.h1`
    font-size:48px;
    color:${props=>props.theme.accentColor}
`;
const Loader=styled.span`
    text-align: center;
    display:block;
    color:yellow;
`;

const Header=styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
//
`;

const OverView=styled.div`//크기를 설정 안하면? 
    background-color: rgba(0,0,0,0.5);
    border-radius:10px;
    display:flex;
    justify-content: space-between;
    padding: 40px 20px
    `;

const OverViewItem=styled.div`
`;

const Description=styled.div`
    margin:20px 0px;
`;

interface Params {
    coinId : string|undefined;
}
interface RouteState{
    name:string;
}

interface IInfoData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    logo:string;
    /* tags:ITag[];
    team:object; */
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    //links:object;
    links_extended:object;
    //whitepaper:object;
    first_data_at:string;
    last_data_at:string;
}

interface IPriceData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string ;
    last_updated:string ;
    quotes:{
        USD:{
            ath_date: string
        ath_price: number
        market_cap:number
        market_cap_change_24h:number
        percent_change_1h :number
        percent_change_1y:number
        percent_change_6h :number
        percent_change_7d:number
        percent_change_12h:number
        percent_change_15m:number
        percent_change_24:number
        percent_change_30d:number
        percent_change_30m:number
        percent_from_price_ath:number
        price:number
        volume_24h:number
        volume_24h_change_24h:number
        }
    };
}

const Text=styled.span`
    color: white;
`
const Tab=styled.span<{isActive:boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color:${props=>props.isActive? props.theme.accentColor: props.theme.textColor};
    a{
        display: block;
    }

`;



function Coin(){
    const [loading,setLoading]=useState(true);
    const {coinId} = useParams<string>();// 받아왔다.
    const {state} = useLocation();//받았다.
    const [info,setInfo]=useState<IInfoData>();
    const[priceInfo,setPriceInfo]=useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch=useMatch("/:coinId/chart");
    console.log(priceMatch);

    useEffect(()=>{
        (async()=>{
            const infoData= await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })()
    },[coinId])
    console.log(priceInfo?.quotes.USD.market_cap_change_24h);

    return (
        <Container>
        <Header>
            <Title>{state?.name? state.name: loading? "Loading...": info?.name}</Title>
        </Header>
        {loading? <Loader>Loading...</Loader>
        :(
            <>
            <OverView>
                <OverViewItem>
                <span>Rank:</span>
                <span>{info?.rank}</span>
                </OverViewItem>

                <OverViewItem>
                <span>Symbol: </span>
                <span>{info?.symbol}</span>
                </OverViewItem>

                <OverViewItem>
                <span>Open Source:</span>
                <span>{info?.open_source?"Yes":"No"}</span>
                </OverViewItem>
            </OverView>
            <Description>{info?.description}</Description>
            <OverView>
                <OverViewItem>
                <span>Total Supply:</span>
                <span>{priceInfo?.total_supply}</span>
                </OverViewItem>
                <OverViewItem>
                <span>Max Apply:</span>
                <span>{priceInfo?.max_supply}</span>
                </OverViewItem>
            </OverView>
        </>
        )}
        <Tab isActive={chartMatch!==null}>
        <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
        <Tab isActive={priceMatch!==null}>
        <Link to={`/${coinId}/price`}>Price</Link> 
        </Tab>
        <Outlet/>
        </Container>
        );
} 

export default Coin;
 
