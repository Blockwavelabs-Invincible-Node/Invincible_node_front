import { useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import contractAddress from "../../../addresses/contractAddress.json"
import StableTokenPoolMethodObject from "../../functions/getStableTokenPool";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import MaticPrice from "../../functions/fetchTokenPrice";

const MyPageWrapper = styled(Wrapper)` 

`;

const goerliWeb3 = new Web3(process.env.REACT_APP_GOERLI_RPC_URL);
const web3 = new Web3(window.ethereum);
const Info = () => {
    const [isValidator, setIsValidator] = useState(false);
    const [stableCoinLended, setStableCoinLended] = useState(0);
    const [stakedAmount, setStakedAmount] = useState(0);
    
    const stableCoinPoolRead = async() => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        const stableTokenPoolContract = new goerliWeb3.eth.Contract(stableTokenPool.output.abi, contractAddress.stableCoinPool);
        const balanceOf = await stableTokenPoolContract.methods.balanceOf(account).call();
        console.log("Stable Coin Lended: ", balanceOf/10**18);
        setStableCoinLended(balanceOf/10**18);
        if (balanceOf) {
            setIsValidator(true);
        }
    
    }

    const liquidStakingContractRead = async() => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        const liquidStakingContract = new web3.eth.Contract(liquidStaking.output.abi, contractAddress.liquidStaking);
        const staked = await liquidStakingContract.methods.balanceOf(account).call();
        const retrieved = await liquidStakingContract.methods.unstaked(account).call();
        console.log("staked: ", staked-retrieved);
        setStakedAmount((staked-retrieved)/10**18);
    }

  
    useEffect(()=> {
       stableCoinPoolRead();
       liquidStakingContractRead();
  
    }, []);

    function getShortenedAddress(addr) {
        return addr.substring(0,5) + "..." + addr.substring(25);
    }
    return(
        <MyPageWrapper>
            <h1>Is Validator: {isValidator.toString()}</h1>
            <h1>Stable Coin Lended: {stableCoinLended} </h1>
            <h1>Staked: {stakedAmount} </h1>
            <h1>Staking Rank: </h1>
            <h1>Reward Claimed: </h1>
            <h1>Stable Coin Borrowed: </h1>
            <MaticPrice></MaticPrice>
        </MyPageWrapper>
    )

}

export default Info;