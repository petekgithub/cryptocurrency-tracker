import React, {useEffect, useState} from 'react';
import './css/App.css';
import axios from 'axios';
import Coin from './Coin';


function App() {

  const [search,setSearch] = useState('');
  const [coins, setCoins] = useState([]);


  // fetching data from coingeckoapi with axios
  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => {
          setCoins(response.data);
      })
      .catch(error=>console.log(error))
  }, []);


  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  // function filters the actual coins and display it whatever we type in
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  
  return (
    <div className='coin-app'>
      <div className='coin-search'>
      <h1>Search A Currency</h1>
      <form>
        <input
          type="text"
          placeholder="Search"
          className="coin-input"
          onChange={handleChange} 
        />
      </form>
      </div>

      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />);
      })}
    </div>
  );
}

export default App;
