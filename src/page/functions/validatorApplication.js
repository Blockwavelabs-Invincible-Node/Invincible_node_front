import { ethers } from "ethers";
import Web3 from "web3";
import liquidStakingJSON from "../../artifacts/liquidStaking.json";
import stableCoinPoolJSON from "../../artifacts/stableCoinPool.json";
import testUSDTJSON from "../../artifacts/testUSDT.json";

const pw = process.env.PASSPHRASE;
const addresses = require("../../addresses/contractAddress.json");

// ethers
const evmosProvider = new ethers.providers.JsonRpcProvider(process.env.EVMOS_TESTNET_RPC_URL);
const privateKey = process.env.REACT_APP_OWNER_PRIVATE_KEY;
const evmosSigner = new ethers.Wallet(privateKey, evmosProvider);

const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_RPC_URL);
const ethereumSigner = new ethers.Wallet(privateKey, ethereumProvider);
                 
const liquidStakingContractAddress = addresses.liquidStaking;
const liquidStakingContractABI = liquidStakingJSON.output.abi;

const liquidStakingContractWrite = new ethers.Contract(liquidStakingContractAddress, liquidStakingContractABI, evmosSigner);
const liquidStakingContractRead = new ethers.Contract(liquidStakingContractAddress, liquidStakingContractABI, evmosProvider);

const stableCoinPoolContractAddress = addresses.stableCoinPool;
const stableCoinPoolContractABI = stableCoinPoolJSON.output.abi;

const stableCoinPoolContractWrite = new ethers.Contract(stableCoinPoolContractAddress, stableCoinPoolContractABI, ethereumSigner);
const stableCoinPoolContractRead = new ethers.Contract(stableCoinPoolContractAddress, stableCoinPoolContractABI, ethereumProvider);

// web3
const web3 = new Web3(window.ethereum);
const stableCoinPoolContract = new web3.eth.Contract(stableCoinPoolContractABI, stableCoinPoolContractAddress);

const testUSDTABI = testUSDTJSON.output.abi;
const testUSDTAddress = addresses.testUSDT;
const testUSDTContract = new web3.eth.Contract(testUSDTABI, testUSDTAddress);

const owner = "0x3abc249dd82Df7eD790509Fba0cC22498C92cCFc";

//function
const ValidatorApplication = async(amount) => {
    const getAccount = await web3.eth.getAccounts();
    const account = getAccount[0];
    console.log("account: ", account);
    const approve = await testUSDTContract.methods.approve(stableCoinPoolContractAddress, amount).send({from: account})
    .then((result) => {
        console.log(result);
    });
    const receive = await stableCoinPoolContract.methods.receiveStableToken(amount).send({from: account})
    .then((result) => {
        console.log(result);
    });
    // stableCoinPoolContractWrite.receiveStableToken(1000)
    // .then((result) => {
    //     console.log(result);
    // });
 }

 export default ValidatorApplication;