import { useState } from "react";
import Web3 from "web3";
import ValidatorApplication from "../../functions/validatorApplication";

const web3 = new Web3(window.ethereum);
const ApplyForm = () => {
    const [ stableCoinAmount, setStableCoinAmount ] = useState(0);

    const handleStableCoinAmountChange = (event) => {
        setStableCoinAmount(event.target.value);
    }

    
    return (
        <>
            Amount: <input onChange={handleStableCoinAmountChange}></input> (minimum: 1usdt) <br />
            Validator Address: <input></input><br />
            <button onClick={() =>{
                const value = stableCoinAmount;
                const number = web3.utils.toBN(value * 10**18);
                ValidatorApplication(number);
            }}>Submit</button>
        </>
    )
}

export default ApplyForm;