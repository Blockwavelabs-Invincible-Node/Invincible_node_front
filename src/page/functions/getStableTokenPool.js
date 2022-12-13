import Web3 from "web3";
import contractAddress from "../../addresses/contractAddress.json";
import stableTokenPool from "../../artifacts/stableCoinPool.json";


const web3 = new Web3(window.ethereum);

async function StableTokenPoolMethodObject() {
    const stableTokenPoolContract = new web3.eth.Contract(stableTokenPool.output.abi, contractAddress.stableCoinPool)
    const obj = await stableTokenPoolContract.methods
    return obj;
}

export default StableTokenPoolMethodObject;