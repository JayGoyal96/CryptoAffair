var coinData = [];
var data = [];
const render = (coinData) => {
    data = coinData.map(coin => {
        return (`<div class="coin-container"><div class="coin-row">
            <div class="coin">
            <img src="${coin.image}" alt="imageofcoin"></img>
            <h1>${coin.name}</h1>
            <p class="coin-symbol">${coin.symbol}</p>
            </div>
            <div class="coin_data">
                <p class="coin-price">₹${coin.current_price}</p>
                <p class="coin-percent ${coin.price_change_percentage_24h < 0 ? "red" : "green"}">${coin.price_change_percentage_24h==null?'NULL':coin.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
            </div></div>`)
    });
    document.getElementById("coin-app").innerHTML = data.join("");
}
const handleChange = (e) => {
    var x = e.target.value;
    var filteredcoinData = coinData.filter(coin => coin.name.toLowerCase().includes(x.toLowerCase()));
    document.getElementById("coin-app").innerHTML = "";
    render(filteredcoinData);
};
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => res.json())
    .then(res => {
        coinData = res;
        render(coinData);
    }).catch(error => {
        console.log(error);
    });
document.getElementById("select").addEventListener("input", handleChange);