import Web3 from 'web3'

async function ConnectToMetamask() {
    if (window.ethereum) {
       await window.ethereum.request({ method: "eth_requestAccounts" });
       const web3 = new Web3(window.ethereum);
       const account = web3.eth.accounts;
       //Get the current MetaMask selected/active wallet
       const walletAddress = account.givenProvider.selectedAddress;
       console.log(`Wallet Address: ${walletAddress}`);
       return true;
    } else {
        console.log("No wallet");
        return false;
    }
}

export default ConnectToMetamask;