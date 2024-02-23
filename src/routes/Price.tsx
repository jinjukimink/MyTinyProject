import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface PriceProps{
    coinId:string;
}
interface IHistory{
    time_open: number;
    time_close:number;
    open:string;//시가
    high:string;//
    low:string;
    close:string;//종가
    volume:string;
    market_cap:number;
}


function Price(){
    const {coinId}:PriceProps =useOutletContext();//1.일단 부모한테서 어떤 코인의 정보를 띄울지에 대한 정보를 받아야 하잖아.
    //2.이제 fetch를 받아오자
    const{isLoading,data:PriceData}=useQuery<IHistory[]>(["price",coinId],()=>fetchCoinHistory(coinId));
    console.log(PriceData);
    console.log(coinId);
    
    return (
        <>
        {isLoading?"Loading price....":<ApexChart 
            type="candlestick"
            series = {[{
                data: PriceData?.map(date=>({
                    x: new Date(date.time_open).getTime(),
                    y:[
                        parseFloat(date.open),
                        parseFloat(date.high),
                        parseFloat(date.low),
                        parseFloat(date.close),
                    ]
                })) || [],
            }] as any}
            options = {{
                chart:{
                    type:'candlestick',
                    height:350,
                    width:700,
                    toolbar:{
                        show:false,//위의 툴바 없애기
                    },
                },
                /*tooltip:{
                    shared:true,
                    enabled:true,
                    style:{
                        fontSize:'12px',
                        fontFamily:undefined,
                        
                    },
                    // y:{
                    //     formatter(val: number[], opts: any) {
                    //         const [open, high, low, close] = val;
                    //         return `Open: ${open}, High: ${high}, Low: ${low}, Close: ${close}`;
                    //     }
                    // },
                    y:[{formatter:function(y){
                            if(typeof y!== "undefined"){
                                return y.toFixed(0)
                            }
                            return y;
                        }
                        },
                        {
                        formatter:function(y){
                            if(typeof y!== "undefined"){
                                return y.toFixed(0)
                            }
                            return y;
                        }
                        },
                        {
                        formatter:function(y){
                            if(typeof y!== "undefined"){
                                return y.toFixed(0)
                            }return y;
                        }
                        },{
                        formatter:function(y){
                            if(typeof y!== "undefined"){
                                return y.toFixed(0)
                            }return y;
                        }
                        }
                ]
            },*/
                tooltip:{
                    enabled:false,
                },
                xaxis:{
                    type:"datetime",
                },
                yaxis:{
                    show:false,
                    tooltip:{
                        enabled:false,
                    },
                },
                title:{
                    text:'CandleStick Chart',
                    align:'left',  
                    style:{
                        color:"white",
                    }
                },
                grid:{
                    show:false,
                },
            }}
        />}
        </>

    );
}

export default Price;