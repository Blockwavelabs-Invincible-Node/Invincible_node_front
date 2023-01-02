import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SwitchNetwork from "./switchNetwork";

const web3 = new Web3(window.ethereum);

const AddNetwork = async (networkId) => {
  /*
    chainName,
  currencyName,
  currencySymbol,
  decimals,
  rpcUrls,
  blockExplorerUrls,
    */
  // add evmos testnet
  console.log("adding netID: ", networkId);
  const netAdd = async () => {
    if (networkId == 9000) {
      await window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(networkId),
              chainName: "Evmos Testnet",
              nativeCurrency: {
                name: "testnetEvmos",
                symbol: "tEVMOS",
                decimals: 18,
              },
              rpcUrls: ["https://eth.bd.evmos.dev:8545"],
              blockExplorerUrls: ["https://evm.evmos.dev"],
            },
          ],
        })
        .then(() => {
          console.log("added evmos");
        })
        .catch(() => console.log("could not add network"));
    }
    // add polygon mumbai testnet
    else if (networkId == 80001) {
      await window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(networkId),
              chainName: "Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        })
        .then(() => {
          console.log("added mumbai");
        })
        .catch(() => console.log("could not add network"));
    }
  };
  netAdd().then(() => {
    window.location.reload();
    alert("network added try again");
  });
};

export default AddNetwork;
