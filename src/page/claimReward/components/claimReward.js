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
  padding-right: 5vw;
  padding-bottom: 1vh;
`;
const Price = styled(LightText)`
  margin-right: 2vw;
  padding-top: 0.5vh;
  font-size: 1vh;
`;
const StakeAmountText = styled(LightText)`
  text-align: center;
  padding-bottom: 2vh;
`;

const UndelegateButton = styled(Button)`
  width: 100%;
`;

const web3 = new Web3(window.ethereum);
const liquidStakingAddress = address.evmosLiquidStaking;
const liquidStakingContract = new web3.eth.Contract(
  liquidStaking.output.abi,
  liquidStakingAddress
);
const rewardTokenAddress = address.rewardToken;
const rewardTokenContract = new web3.eth.Contract(
  rewardToken.output.abi,
  rewardTokenAddress
);

const ClaimReward = ({ token, getAmount }) => {
  const [leveraged, setLeveraged] = useState(true);
  const [leverage, setLeverage] = useState(2);
  const [pressStake, setPressStake] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rewardAmount, setRewardAmount] = useState();
  const [ethBalance, setEthBalance] = useState(null);
  const [stageLevel, setStageLevel] = useState(0);
  const [evmosPrice, setEvmosPrice] = useState(0);

  let navigate = useNavigate();
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };

  const claimRewards = () => {
    const doClaim = async () => {
      const getAccount = await web3.eth.getAccounts();
      const account = getAccount[0];
      console.log("account: ", account);

      const receiveReward = await liquidStakingContract.methods
        .receiveReward()
        .send({ from: account })
        .then(function (receipt) {
          console.log(receipt);
          alert("Successfully Claimed rewards");
          routeStake();
        });
    };
    if (rewardAmount == 0) {
      alert("No reward to claim!");
      routeStake();
    } else {
      doClaim();
    }
  };

  const getReward = async () => {
    const getAccount = await web3.eth.getAccounts();
    const account = getAccount[0];
    const gReward = await liquidStakingContract.methods.rewards(account).call();
    setRewardAmount(gReward / 10 ** 18);
    // console.log("staked amount: ", gStaked);
  };

  const getEvmosPrice = async () => {
    const APIKEY = process.env.REACT_APP_APIKEY;
    const baseURL = "https://api.covalenthq.com/v1";
    const blockchainChainId = "9001";
    const demoAddress = "0x3abc249dd82Df7eD790509Fba0cC22498C92cCFc";

    async function getWalletBalance(chainId, address) {
      const url = new URL(
        `${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`
      );
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;
      const evmos_price = Math.round(data.items[0].quote_rate * 100) / 100;
      console.log(evmos_price);
      setEvmosPrice(evmos_price);
      return data;
    }

    const data = await getWalletBalance(blockchainChainId, demoAddress);
    console.log(data);
  };
  useEffect(() => {
    getReward();
    getEvmosPrice();
  }, []);

  return (
    <LeverageWrapper>
      <FirstText>Claim Reward</FirstText>
      <SecondText>Rewards are updated once per day</SecondText>
      <StakeStatusWrapper>
        <StakeStatusText>
          <YouStaked>Claimable</YouStaked>
          <Price>1Evmos ≈ ${evmosPrice}</Price>
        </StakeStatusText>
        <StakeAmountText>{rewardAmount} EVMOS</StakeAmountText>
      </StakeStatusWrapper>
      <UndelegateButton
        onClick={() => {
          claimRewards();
        }}
      >
        Claim Rewards
      </UndelegateButton>
    </LeverageWrapper>
  );
};

export default ClaimReward;
