import Web3 from "web3";
import SwitchNetwork from "./switchNetwork";

const web3 = new Web3(window.ethereum);
let res = 1;
const CheckNetwork = async (properNetworkId) => {
  // goerli testnet network id
  const netId = await web3.eth.net.getId().then(async (networkId) => {
    if (networkId != properNetworkId) {
      await SwitchNetwork(properNetworkId).then(() => {
        // window.location.reload();
      });
      res = 0;
    }
  });
  return res;
};

export default CheckNetwork;
