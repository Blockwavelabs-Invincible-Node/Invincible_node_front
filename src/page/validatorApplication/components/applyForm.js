import { useState } from "react";
import Web3 from "web3";
import ValidatorApplication from "../../functions/validatorApplication";
import address from "../../../addresses/contractAddress.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";


const web3 = new Web3(window.ethereum);
const goerliWeb3 = new Web3(process.env.REACT_APP_GOERLI_RPC_URL);
const liquidStakingAddress = address.liquidStaking;
const liquidStakingContract = new web3.eth.Contract(liquidStaking.output.abi, liquidStakingAddress);
const ApplyForm = () => {
    const [ stableCoinAmount, setStableCoinAmount ] = useState(0);
    const [ validatorAddress, setValidatorAddress ] = useState(null); 

    const handleStableCoinAmountChange = (event) => {
        setStableCoinAmount(event.target.value);
    }
    const handleValidatorAddressChange = (event) => {
        setValidatorAddress(event.target.value);
    }

    const verifyValidatorAddress = async() => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        console.log(account);
        const addValidatorAddress = await liquidStakingContract.methods.addValidatorAddress(validatorAddress).send({from: account})
        .catch( err => {
            console.log(err.message);
        })
        .then(function(receipt) {
            console.log("receipt: ", receipt);
        })
        .then(async() => {
            const value = stableCoinAmount;
            const number = await web3.utils.toBN(value * 10**18);
            console.log("value: ", number);
            ValidatorApplication(validatorAddress, number);
        })
    }

    
    return (
        <>
            Amount: <input onChange={handleStableCoinAmountChange}></input> (minimum: 1usdt) <br />
            Validator Address: <input onChange={handleValidatorAddressChange}></input><br />
            <button onClick={async() =>{
                verifyValidatorAddress();
                // const value = stableCoinAmount;
                // const number = await web3.utils.toBN(value * 10**18);
                // ValidatorApplication(validatorAddress, number);
            }}>Submit</button>
        </>
    )
}

export default ApplyForm;