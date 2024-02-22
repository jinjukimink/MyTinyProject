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