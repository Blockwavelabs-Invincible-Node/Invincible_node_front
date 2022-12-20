import { useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import contractAddress from "../../../addresses/contractAddress.json"
import StableTokenPoolMethodObject from "../../functions/getStableTokenPool";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import { Button } from "../../../styles/styledComponents/button";

const MyPageWrapper = styled(Wrapper)` 

`;
const ButtonWrapper = styled.div` 
    display: flex;
    justify-content: center;
`;
const StakeStatusButton = styled(Button)` 

`;
const ValidatorStatusButton = styled(Button)` 

`;
const ContentWrapper = styled.div` 

`;

const goerliProvider = process.env.REACT_APP_GOERLI_RPC_URL;
const web3Provider = new Web3.providers.HttpProvider(goerliProvider);
const goerliWeb3 = new Web3(web3Provider);
console.log("goerli Web3: ", goerliWeb3)

const web3 = new Web3(window.ethereum);
const Info = () => {
    const [isValidator, setIsValidator] = useState(false);
    const [stableCoinLended, setStableCoinLended] = useState(0);
    const [stakedAmount, setStakedAmount] = useState(0);
    const [pageStatus, setPageStatus] = useState(0);
    
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
        console.log(account);
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
            <ButtonWrapper>
                <StakeStatusButton onClick={() => {
                    setPageStatus(0);
                }}>
                    Stake Status
                </StakeStatusButton>
                <ValidatorStatusButton onClick={() => {
                    setPageStatus(1);
                }}>
                    Validator Status
                </ValidatorStatusButton>
            </ButtonWrapper>
            {
                !pageStatus ? (
                <ContentWrapper>
                    <h1>Staking Rank: </h1>
                    <h1>Staked: {stakedAmount} </h1>
                    <h1>Reward Claimed: </h1>
                </ContentWrapper>
                ) : (
                <ContentWrapper>
                    <h1>Is Validator: {isValidator.toString()}</h1>
                    <h1>Stable Coin Lended: {stableCoinLended} </h1>
                    <h1>Stable Coin Borrowed: </h1>
                </ContentWrapper>
                )
            }
        </MyPageWrapper>
    )

}

export default Info;