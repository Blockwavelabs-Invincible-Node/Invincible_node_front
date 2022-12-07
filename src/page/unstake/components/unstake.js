import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import rewardToken from "../../../artifacts/rewardToken.json";
import { useNavigate } from "react-router-dom";

const LeverageWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  text-align: left;
  max-width: 100%;
`;
const FirstText = styled(BoldText)`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 1px;
`;
const SecondText = styled(LightText)`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 22px;
`;
const WarningWrapper = styled.div` 
    background-color: #2E1E1D;
    border-radius: 10px;
    margin-bottom: 10px;
`;
const WarningText1 = styled(BoldText)` 
    margin-left: 2vw;
    padding-top: 2vh;
    margin-right: 10vw;
    margin-bottom: 10px;
    font-size: 20px;
`;
const WarningText2 = styled(LightText)` 
    margin-left: 2vw;
    color: #EF8C8A;
    font-size: 15px;
    padding-bottom: 2vh;
`;
const StakeStatusWrapper = styled.div` 
    background-color: #292929;
    margin-bottom: 10px;
    border-radius: 10px;

`;
const StakeStatusText = styled.div` 
    margin-left: 2vw;
    padding-top: 2vh;
    display: flex;
    justify-content: space-between;
`;
const YouStaked = styled(BoldText)` 

`;
const Price = styled(LightText)` 
margin-right: 2vw;
`;
const StakeAmountText = styled(LightText)` 
text-align:center;
padding-bottom: 2vh;
`; 
const UndelegateAmountWrapper = styled.div` 
    background-color: #292929;
    margin-bottom: 20px;
    border-radius: 10px;
    padding-bottom: 2vh;
`;
const AmountUndelegate = styled(BoldText)` 
margin-left: 2vw;
padding-top: 2vh;
`;
const UndelegateButton = styled(Button)` 
    width: 100%;
`;
const AmountToStake = styled(BasicInput)`
  width: 100%;
  height: 100%;
  border: hidden;
  text-align: right;
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 500;
  min-width: 30px;
  &:focus {
    outline: none;
  }
  background-color: #292929;
  color: white;
`;
const AmountBox = styled.div`
  margin-right: 2vw;
  margin-left: 2vw;
  height: 62px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  border: 2px solid #333333;
  border-radius: 10px;
  margin-top: 14px;
`;

const MaxButton = styled(Button)`
  padding-left: 1vw;
  padding-right: 1vw;
  width: auto;
  height: 35px;
`;

const CurrencyBox = styled.div`
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 500;
`;


const web3 = new Web3(window.ethereum);
const liquidStakingAddress = address.liquidStaking;
const liquidStakingContract = new web3.eth.Contract(liquidStaking.output.abi, liquidStakingAddress);
const rewardTokenAddress = address.rewardToken;
const rewardTokenContract = new web3.eth.Contract(rewardToken.output.abi, rewardTokenAddress);

const Unstake = ({ token, getAmount }) => {
    const [leveraged, setLeveraged] = useState(true);
    const [leverage, setLeverage] = useState(2);
    const [pressStake, setPressStake] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [stakeAmount, setStakeAmount] = useState();
    const [stakedAmount, setStakedAmount] = useState(); 
    const [ethBalance, setEthBalance] = useState(null);
    const [stageLevel, setStageLevel] = useState(0);
    const [evmosPrice, setEvmosPrice] = useState(0);

    let navigate = useNavigate();
    const routeMain = () => {
        let path = "/";
        navigate(path);
    };

    const unstake = () => {
        const doUnstake = async(amount) => {
            const getAccount = await web3.eth.getAccounts();
            const account = getAccount[0];
            console.log("account: ", account); 
            const realAmount = amount * (web3.utils.toBN(10 ** 18));
            console.log("ra ", realAmount)
            const approve = await rewardTokenContract.methods.approve(liquidStakingAddress, realAmount).send({from: account})
            .then(function(receipt) {
                console.log(receipt);
            });
            const unstake = await liquidStakingContract.methods.withdraw(realAmount).send({from: account})
            .then(function(receipt) {
                console.log(receipt);
                alert("Unstake Request submitted");
                routeMain();
            })
        }
        doUnstake(stakeAmount);
    };
    const maxOnClick = () => {
        setStakeAmount(stakedAmount ? stakedAmount  : 0);
    };
    const handleStakeAmountChange = (event) => {
        setStakeAmount(event.target.value);
    };
    const getTotalStaked = async () => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        const gStaked = await liquidStakingContract.methods.balanceOf(account).call();
        const gSpent = await liquidStakingContract.methods.unstaked(account).call();
        setStakedAmount( (gStaked-gSpent) / 10**18);
        console.log("staked amount: ", gStaked);
    }

    const getEvmosPrice = async() => {
        const APIKEY = process.env.REACT_APP_APIKEY;

        const baseURL = 'https://api.covalenthq.com/v1'
        const blockchainChainId = '9001'
        const demoAddress = '0x3abc249dd82Df7eD790509Fba0cC22498C92cCFc'
        
        async function getWalletBalance(chainId, address) {
            const url = new URL(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`);
            const response = await fetch(url);
            const result = await response.json();
            const data = result.data;
            const evmos_price = Math.round(data.items[0].quote_rate*100)/100;
            console.log(evmos_price)
            setEvmosPrice(evmos_price);
            return data;
        }
        
        const data = await getWalletBalance(blockchainChainId, demoAddress);
        console.log(data);
    }

    useEffect(()=> {
        getTotalStaked();
        getEvmosPrice();
    }, []);

    

    return (
        <LeverageWrapper>
            <FirstText>Unstake</FirstText>
            <SecondText>
                Please prepare inEVMOS ahead of time for making transaction smooth 
            </SecondText>
            <WarningWrapper>
                <WarningText1>
                    Once the undelegation period begins you will : 
                </WarningText1>
                <WarningText2>
                ① Not receive staking rewards <br />
                ② Not be able to cancel the unbonding <br />
                ③ Need to wait 7days for the amount to be withdraw
                </WarningText2>
            </WarningWrapper>
            <StakeStatusWrapper>
                <StakeStatusText>
                    <YouStaked>You Staked</YouStaked>
                    <Price>1Evmos ≈ ${evmosPrice}</Price>
                </StakeStatusText>
                <StakeAmountText>
                    {stakedAmount} EVMOS
                </StakeAmountText>
            </StakeStatusWrapper>
            <UndelegateAmountWrapper>
                <AmountUndelegate>Amount to Undelegate</AmountUndelegate>
                <AmountBox>
                    <MaxButton onClick={maxOnClick}>MAX</MaxButton>
                    <AmountToStake
                    placeholder="0.0"
                    type="text"
                    value={stakeAmount}
                    onChange={handleStakeAmountChange}
                    ></AmountToStake>
                    <CurrencyBox>Evmos</CurrencyBox>
                </AmountBox>
            </UndelegateAmountWrapper>
            <UndelegateButton 
            onClick={() => {
                unstake();
            }}
            >
                UnStake
            </UndelegateButton>
        </LeverageWrapper>
    );
};

export default Unstake;
