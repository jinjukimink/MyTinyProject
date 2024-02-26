import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import { useQuery } from "react-query";
//import ReactApexChart from "react-apexcharts";
import ApexChart from "react-apexcharts";

interface ChartProps{
    coinId:string;
    //isDark:boolean;
}
interface ToggleDarkProps{
    isDark:boolean;
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

interface IMode{
    isDark:boolean;
}
function Chart({isDark}:IMode){
    const {coinId}:ChartProps = useOutletContext();//부모한테 받은 프롭
    //const{isDark}:ToggleDarkProps=useOutletContext();
    const{isLoading:historyLoading, data: historyData} = useQuery<IHistory[]>(["history",coinId], ()=>fetchCoinHistory(coinId));
    return(
    <div>
        {historyLoading?"Loading chart...":<ApexChart 
        type="line"
        series={[
            {
                name:"Price",
                data:historyData?.map((price)=>Number(price.close))as number[],
            },
        ]}
        options={{
            theme:{
                mode: isDark?"dark":"light"
            },
            chart:{
                height:300,
                width:800,
                toolbar:{
                    show:false,//위의 툴바 없애기
                },
                background:"transparent",
            },
            grid:{
                show:false,//라인 없애기
            },
            stroke:{
                curve:"smooth",
                width:5,    
            },
            yaxis:{
                show:false,
            },
            xaxis:{
                //categories: historyData?.map((date)=>date.time_open),
                labels:{
                    show:false,
                },
                axisTicks:{
                    show:false,
                },
                axisBorder:{
                    show:false,
                },
                categories:historyData?.map(date=>date.time_close),
                type:"datetime",
            },
            fill:{
                type:"gradient",
                gradient:{
                    gradientToColors:["#0be881"],
                    stops:[0,100],
                },
                colors:["#0fbcf9"],
            },
            tooltip:{
                y:{
                    formatter:(value)=>`${value.toFixed(3)}`,
                }
            }
        }}/>}
    </div>
    )
    ;
}

export default Chart;