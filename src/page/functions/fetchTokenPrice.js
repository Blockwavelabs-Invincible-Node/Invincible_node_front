import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MaticPrice() {
  // Set up state variables to store the MATIC price and loading status
  const [maticPrice, setMaticPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set the CoinMarketCap API endpoint and API key
  const endpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
  const apiKey = process.env.REACT_APP_COINMARKETCAP_API_KEY;


  // Set the options for the API request
  const options = {
    headers: {
      'X-CMC_PRO_API_KEY': apiKey,
    },
  };

  // Fetch the latest price data for MATIC when the component mounts
  useEffect(() => {
    axios
      .get(endpoint, options)
      .then((response) => {
        const maticPrice = response.data.data['MATIC'].quote.USD.price;
        setMaticPrice(maticPrice);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  // Render the component
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>The current price of MATIC is ${maticPrice}</p>
      )}
    </div>
  );
}

export default MaticPrice;