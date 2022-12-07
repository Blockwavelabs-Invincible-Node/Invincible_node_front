const Web3 = require('web3')
// import Web3 from "web3";

//public rpc
const rpc = "https://eth.bd.evmos.org:8545"
const web3Evmos = new Web3(rpc);

const getAccount = async () => {
    const accounts = await web3Evmos.eth.getTransaction("0x1d3b3d0b33547033173c35d27827723aa15b891e1c7c629a4433e5ca5d739964");
    console.log(accounts);
}

getAccount();