//json data를 리턴(엄밀히 말하면 json data의 Promise를 리턴해주는 것)
export async function fetchCoins(){
    const URL= "https://api.coinpaprika.com/v1/coins ";
    return fetch(URL).then(response=>response.json());
    
}