import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import liquidStakingJSON from "../../artifacts/liquidStaking.json";
import stableCoinPoolJSON from "../../artifacts/stableCoinPool.json";
import testUSDTJSON from "../../artifacts/testUSDT.json";
import { increasePageNumber } from "../../redux/reducers/modalPageNumberReducer";
import SwitchNetwork from "./switchNetwork";

const addresses = require("../../addresses/contractAddress.json");
const stableCoinPoolContractAddress = addresses.stableCoinPool;
const stableCoinPoolContractABI = stableCoinPoolJSON.output.abi;
const liquidStakingContractAddress = addresses.liquidStaking;
const liquidStakingContractABI = liquidStakingJSON.output.abi;
const testUSDTABI = testUSDTJSON.output.abi;
const testUSDTAddress = addresses.testUSDT;

// ethers

// const evmosProvider = new ethers.providers.JsonRpcProvider(process.env.EVMOS_TESTNET_RPC_URL);
// const privateKey = process.env.REACT_APP_OWNER_PRIVATE_KEY;
// const evmosSigner = new ethers.Wallet(privateKey, evmosProvider);

// const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_GOERLI_RPC_URL);
// const ethereumSigner = new ethers.Wallet(privateKey, ethereumProvider);
            
// const liquidStakingContractWrite = new ethers.Contract(liquidStakingContractAddress, liquidStakingContractABI, evmosSigner);
// const liquidStakingContractRead = new ethers.Contract(liquidStakingContractAddress, liquidStakingContractABI, evmosProvider);

// const stableCoinPoolContractWrite = new ethers.Contract(stableCoinPoolContractAddress, stableCoinPoolContractABI, ethereumSigner);
// const stableCoinPoolContractRead = new ethers.Contract(stableCoinPoolContractAddress, stableCoinPoolContractABI, ethereumProvider);

// web3
// web3 window ethereum
const web3 = new Web3(window.ethereum);

//goerli web3
// const goerliProvider = process.env.REACT_APP_GOERLI_RPC_URL;
// const web3Provider = new Web3.providers.HttpProvider(goerliProvider);
// const goerliWeb3 = new Web3(web3Provider);
// console.log("goerli Web3: ", goerliWeb3)

// contracts(goerli)
const stableCoinPoolContract = new web3.eth.Contract(stableCoinPoolContractABI, stableCoinPoolContractAddress);
const testUSDTContract = new web3.eth.Contract(testUSDTABI, testUSDTAddress);

const owner = "0x3abc249dd82Df7eD790509Fba0cC22498C92cCFc";


//function
const ValidatorApplication = async(validatorAddress, amount) => {
    const dispatch = useDispatch();
    SwitchNetwork(5)
    .then( async() => {
        const getAccount = await web3.eth.getAccounts();
        // const getBalance = await web3.eth.getBalance(getAccount[0]);
        // console.log("balance: ", getBalance);
        console.log("account: ", getAccount[0]);
        console.log(validatorAddress, amount);
        console.log(await testUSDTContract.methods);
        // dispatch(increasePageNumber());
        const approve = await testUSDTContract.methods.approve(stableCoinPoolContractAddress, amount).send({from: getAccount[0]})
        .then((result) => {
            console.log(result);
        });
        // dispatch(increasePageNumber());
        const receive = await stableCoinPoolContract.methods.receiveStableToken(amount, validatorAddress).send({from: getAccount[0]})
        .then((result) => {
            console.log(result);
        });
        // dispatch(increasePageNumber());
    })
 }

 export default ValidatorApplication;