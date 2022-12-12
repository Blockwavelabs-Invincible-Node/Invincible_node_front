import SwitchNetwork from "./switchNetwork";
import Web3 from "web3";


const ConnectToMetamask = async () => {
    const web3 = new Web3(window.ethereum);
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const yourNetworkId = '9000'
      const netId = await web3.eth.net.getId()
      .then((networkId) => {
        if (networkId != yourNetworkId) {
          // MetaMask network is wrong
          console.log('current net id: ', networkId);
          // set network
          SwitchNetwork();
        }
        else {
          console.log("proper network. id: ", networkId);
          
        }
      })
      .catch((err) => {
        // unable to retrieve network id
        console.log(err);
      });

      const account = web3.eth.accounts;
      //Get the current MetaMask selected/active wallet
      const walletAddress = account.givenProvider.selectedAddress;
      console.log(`Wallet Address: ${walletAddress}`);
    //   console.log(dispatch(setStatus(true)));
      window.localStorage.setItem("connectMetamask", true);
      window.location.reload();
      return true;
    } else {
      console.log("No wallet");
      return false;
    }
  };

  export default ConnectToMetamask;