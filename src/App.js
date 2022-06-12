import React, {useEffect, useState} from 'react';
import './css/App.css';
import axios from 'axios';


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
    
    
    </div>
  );
}

export default App;
