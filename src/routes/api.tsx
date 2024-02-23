//json data를 리턴(엄밀히 말하면 json data의 Promise를 리턴해주는 것)

const BASE_URL=`https://api.coinpaprika.com/v1`;

export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then(response=>response.json());
}
export function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response=>response.json());
}
export function fetchCoinTickers(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response=>response.json());
}

export function fetchCoinHistory(coinId:string){
    // const endDate=Math.floor(Date.now()/1000);//현재
    // const startDate=endDate-60*60*24*7;//일주일 전
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(response=>response.json());
}

//https://ohlcv-api.nomadcoders.workers.dev