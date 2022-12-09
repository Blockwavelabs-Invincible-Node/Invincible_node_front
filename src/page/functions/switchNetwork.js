import Web3 from "web3";
import AddNetwork from "./addNetwork";

const web3 = Web3(window.ethereum);
const SwitchNetwork = async({networkId}) => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(networkId) }],
    })
    .then(() => console.log('network has been set'))
    .catch((e) => {
        if (e.code === 4902) {
          console.log('network is not available, add it');
          AddNetwork();

        } else {
          console.log('could not set network')
        }
    })
}

export default SwitchNetwork;