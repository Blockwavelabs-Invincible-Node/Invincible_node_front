import { useEffect } from "react";
import Web3 from "web3";
import AddNetwork from "./addNetwork";

let res = 0;
const web3 = new Web3(window.ethereum);
const SwitchNetwork = async (networkId) => {
  console.log(networkId);
  await window.ethereum
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(networkId) }],
    })
    .then(() => {
      console.log("network has been set123");
      res = 1;
    })
    .catch((e) => {
      if (e.code === 4902) {
        console.log("network is not available, add it");
        AddNetwork(networkId);
      } else {
        console.log("could not set network");
      }
      res = 0;
      // AddNetwork(networkId);
    });
  return res;
};

export default SwitchNetwork;
