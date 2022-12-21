import { useState } from "react";
import Web3 from "web3";
// import ValidatorApplication from "../../functions/validatorApplication";
import address from "../../../addresses/contractAddress.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import SwitchNetwork from "../../functions/switchNetwork";
import { useDispatch, useSelector } from "react-redux";
import { increasePageNumber, resetPageNumber, selectModalPageNumber } from "../../../redux/reducers/modalPageNumberReducer";
import testUSDTJSON from "../../../artifacts/testUSDT.json";
import liquidStakingJSON from "../../../artifacts/liquidStaking.json";
import stableCoinPoolJSON from "../../../artifacts/stableCoinPool.json";

const web3 = new Web3(window.ethereum);

const stableCoinPoolContractAddress = address.stableCoinPool;
const stableCoinPoolContractABI = stableCoinPoolJSON.output.abi;
const liquidStakingContractAddress = address.liquidStaking;
const liquidStakingContractABI = liquidStakingJSON.output.abi;
const testUSDTABI = testUSDTJSON.output.abi;
const testUSDTAddress = address.testUSDT;
const stableCoinPoolContract = new web3.eth.Contract(stableCoinPoolContractABI, stableCoinPoolContractAddress);
const testUSDTContract = new web3.eth.Contract(testUSDTABI, testUSDTAddress);


const goerliProvider = process.env.REACT_APP_GOERLI_RPC_URL;
const web3Provider = new Web3.providers.HttpProvider(goerliProvider);
const goerliWeb3 = new Web3(web3Provider);
const liquidStakingAddress = address.liquidStaking;
const liquidStakingContract = new web3.eth.Contract(liquidStaking.output.abi, liquidStakingAddress);

const ApplyForm = ({openModal}) => {
    const [ stableCoinAmount, setStableCoinAmount ] = useState(0);
    const [ validatorAddress, setValidatorAddress ] = useState(null); 

    const dispatch = useDispatch();
    //console.log(dispatch(setStakeAmount(event.target.value)));
    dispatch(resetPageNumber());

    const handleStableCoinAmountChange = (event) => {
        setStableCoinAmount(event.target.value);
    }
    const handleValidatorAddressChange = (event) => {
        setValidatorAddress(event.target.value);
    }
    const retryCheck = async() => {
        setTimeout(async() => {
            const checkValidatorAddress = await liquidStakingContract.methods.validatorAddresses(validatorAddress).call()
            .catch( err => {
                console.log(err.message);
            })
            .then(async function (receipt) {
                console.log("check result: ", receipt);
                if (receipt == 0) {
                    //retry
                    console.log("retry");
                }
                else if (receipt == 1) {
                    //send stable coin
                    const value = stableCoinAmount;
                    const number = await web3.utils.toBN(value * 10**18);
                    console.log("value: ", number);
                    dispatch(increasePageNumber());
                    ValidatorApplication(validatorAddress, number);
                }
            })
        },20000)
    }
    const ValidatorApplication = async(validatorAddress, amount) => {
      
        SwitchNetwork(5)
        .then( async() => {
            const getAccount = await web3.eth.getAccounts();

            console.log("account: ", getAccount[0]);
            console.log(validatorAddress, amount);
            console.log(await testUSDTContract.methods);
            dispatch(increasePageNumber());
            const approve = await testUSDTContract.methods.approve(stableCoinPoolContractAddress, amount).send({from: getAccount[0]})
            .then((result) => {
                console.log(result);
            });
            dispatch(increasePageNumber());
            const receive = await stableCoinPoolContract.methods.receiveStableToken(amount, validatorAddress).send({from: getAccount[0]})
            .then((result) => {
                console.log(result);
            });
            dispatch(increasePageNumber());
        })
     }

    const verifyValidatorAddress = async() => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        console.log(account);
        const addValidatorAddress = await liquidStakingContract.methods.addValidatorAddress(validatorAddress).send({from: account})
        .catch( err => {
            console.log(err.message);
            return;
        })
        .then(function(receipt) {
            console.log("receipt: ", receipt);
        })
        // check if it is right address
        .then(async() => {
            // 20초 간격으로 세 번 반복
            setTimeout(async() => { 
                const checkValidatorAddress = await liquidStakingContract.methods.validatorAddresses(validatorAddress).call()
                .catch( err => {
                    console.log(err.message);
                })
                .then(async function (receipt) {
                    console.log("check result: ", receipt);
                    if (receipt == 0) {
                        //retry
                        console.log("Retry");
                        retryCheck();
                    }
                    else if (receipt == 1) {
                        //send stable coin
                        const value = stableCoinAmount;
                        const number = await web3.utils.toBN(value * 10**18);
                        console.log("value: ", number);
                        dispatch(increasePageNumber());
                        ValidatorApplication(validatorAddress, number);
                    }
                })
            }, 10000);
            
        })

    }

    
    return (
        <>
            Amount: <input onChange={handleStableCoinAmountChange}></input> (minimum: 1usdt) <br />
            Validator Address: <input onChange={handleValidatorAddressChange}></input><br />
            <button onClick={async() =>{
                SwitchNetwork(9000)
                .then(()=>{
                    openModal();
                })
                .then(async() => {
                    verifyValidatorAddress();
                })
                // const value = stableCoinAmount;
                // const number = await web3.utils.toBN(value * 10**18);
                // ValidatorApplication(validatorAddress, number);
            }}>Submit</button>
        </>
    )
}

export default ApplyForm;