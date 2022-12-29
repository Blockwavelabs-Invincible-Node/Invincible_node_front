import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_COINMARKETCAP_API_KEY;

async function GetTokenPrice(tokenName) {
  const response = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=" +
      tokenName +
      "&tsyms=USD"
  );
  console.log(response.data.USD);
  return response.data.USD;
}

export default GetTokenPrice;
