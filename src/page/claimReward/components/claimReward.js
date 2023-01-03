import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";
import networkId from "../../../network/networkId.json";
import { useNavigate } from "react-router-dom";

import evmosLiquidStaking from "../../../artifacts/liquidStaking.json";
import evmosRewardToken from "../../../artifacts/rewardToken.json";

import { useSelector } from "react-redux";
import {
  selectNetworkId,
  selectNetworkName,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";
import GetTokenPrice from "../../functions/fetchTokenPrice";
import GetAddressAndContract from "../../functions/getAddressAndContract";

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

// address and contracts
const web3 = new Web3(window.ethereum);
const [
  evmosLiquidStakingAddress,
  evmosLiquidStakingContract,
  evmosRewardTokenAddress,
  evmosRewardTokenContract,
  kavaLiquidStakingAddress,
  kavaLiquidStakingContract,
  kavaRewardTokenAddress,
  kavaRewardTokenContract,
] = GetAddressAndContract();

let liquidStakingContract;
let rewardTokenContract;
let liquidStakingAddress;
let rewardTokenAddress;

const ClaimReward = ({ token, getAmount }) => {
  const [leveraged, setLeveraged] = useState(true);
  const [leverage, setLeverage] = useState(2);
  const [pressStake, setPressStake] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rewardAmount, setRewardAmount] = useState();
  const [ethBalance, setEthBalance] = useState(null);
  const [stageLevel, setStageLevel] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  // const [liquidStakingAddress, setLiquidStakingAddress] = useState(null);
  // const [rewardTokenAddress, setRewardTokenAddress] = useState();
  // const [liquidStakingContract, setLiquidStakingContract] = useState(null);
  // const [rewardTokenContract, setRewardTokenContract] = useState();

  const networkIdRedux = useSelector(selectNetworkId);
  const tokenNameRedux = useSelector(selectTokenName);

  let navigate = useNavigate();
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };

  const claimRewards = (liquidStakingContract) => {
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

  const getReward = async (liquidStakingContract) => {
    const getAccount = await web3.eth.getAccounts();
    const account = getAccount[0];
    const gReward = await liquidStakingContract.methods.rewards(account).call();
    setRewardAmount(gReward / 10 ** 18);
    // console.log("staked amount: ", gStaked);
  };
  const fetchTokenPrice = async () => {
    const price = await GetTokenPrice(tokenNameRedux.toUpperCase());
    setTokenPrice(price);
  };

  useEffect(() => {
    if (networkIdRedux == networkId.evmos) {
      liquidStakingContract = evmosLiquidStakingContract;
      liquidStakingAddress = evmosLiquidStakingAddress;
      rewardTokenContract = evmosRewardTokenContract;
      rewardTokenAddress = evmosRewardTokenAddress;
    } else if (networkIdRedux == networkId.kava) {
      liquidStakingContract = kavaLiquidStakingContract;
      liquidStakingAddress = kavaLiquidStakingAddress;
      rewardTokenContract = kavaRewardTokenContract;
      rewardTokenAddress = kavaRewardTokenAddress;
    }
    getReward(liquidStakingContract);
    fetchTokenPrice();
  }, []);

  return (
    <LeverageWrapper>
      <FirstText>Claim Reward</FirstText>
      <SecondText>Rewards are updated once per day</SecondText>
      <StakeStatusWrapper>
        <StakeStatusText>
          <YouStaked>Claimable</YouStaked>
          <Price>
            1{tokenNameRedux} ≈ ${tokenPrice}
          </Price>
        </StakeStatusText>
        <StakeAmountText>
          {rewardAmount} {tokenNameRedux}
        </StakeAmountText>
      </StakeStatusWrapper>
      <UndelegateButton
        onClick={() => {
          claimRewards(liquidStakingContract);
        }}
      >
        Claim Rewards
      </UndelegateButton>
    </LeverageWrapper>
  );
};

export default ClaimReward;
