import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";
import evmosLiquidStaking from "../../../artifacts/liquidStaking.json";
import evmosRewardToken from "../../../artifacts/rewardToken.json";
import { useNavigate } from "react-router-dom";
import GetAddressAndContract from "../../functions/getAddressAndContract";
import { useSelector } from "react-redux";
import {
  selectNetworkId,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";
import GetTokenPrice from "../../functions/fetchTokenPrice";
import networkId from "../../../network/networkId.json";

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
  background-color: #2e1e1d;
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
  color: #ef8c8a;
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
const YouStaked = styled(BoldText)``;
const Price = styled(LightText)`
  margin-right: 2vw;
`;
const StakeAmountText = styled(LightText)`
  text-align: center;
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

const [
  evmosLiquidStakingAddress,
  evmosLiquidStakingContract,
  evmosRewardTokenAddress,
  evmosRewardTokenContract,
  kavaLiquidStakingAddress,
  kavaLiquidStakingContract,
  kavaRewardTokenAddress,
  kavaRewardTokenContract,
  polygonLiquidStakingAddress,
  polygonLiquidStakingContract,
  polygonRewardTokenAddress,
  polygonRewardTokenContract,
] = GetAddressAndContract();

let liquidStakingContract;
let rewardTokenContract;
let liquidStakingAddress;
let rewardTokenAddress;

const Unstake = () => {
  const [stakeAmount, setStakeAmount] = useState();
  const [stakedAmount, setStakedAmount] = useState();
  const [tokenPrice, setTokenPrice] = useState(0);

  let navigate = useNavigate();
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };
  const tokenNameRedux = useSelector(selectTokenName);
  const networkIdRedux = useSelector(selectNetworkId);
  console.log(networkIdRedux);

  const unstake = (
    liquidStakingContract,
    rewardTokenContract,
    liquidStakingAddress
  ) => {
    const doUnstake = async (amount) => {
      const getAccount = await web3.eth.getAccounts();
      const account = getAccount[0];
      console.log("account: ", account);
      const realAmount = web3.utils.toBN(amount * 10 ** 18);
      console.log("ra ", realAmount);
      const approve = await rewardTokenContract.methods
        .approve(liquidStakingAddress, realAmount)
        .send({ from: account })
        .then(function (receipt) {
          console.log(receipt);
        });
      const unstake = await liquidStakingContract.methods
        .withdraw(realAmount)
        .send({ from: account })
        .then(function (receipt) {
          console.log(receipt);
          alert("Unstake Request submitted");
          routeStake();
        });
    };
    doUnstake(stakeAmount);
  };

  const unstakeByNetwork = () => {
    if (networkIdRedux == networkId.evmos) {
      unstake(
        evmosLiquidStakingContract,
        evmosRewardTokenContract,
        evmosLiquidStakingAddress
      );
    } else if (networkIdRedux == networkId.kava) {
      unstake(
        kavaLiquidStakingContract,
        kavaRewardTokenContract,
        kavaLiquidStakingAddress
      );
    } else if (networkIdRedux == networkId.polygon) {
      unstake(
        polygonLiquidStakingContract,
        polygonRewardTokenContract,
        polygonLiquidStakingAddress
      );
    }
  };

  const getTotalStaked = async (liquidStakingContract) => {
    const getAccount = await web3.eth.getAccounts();
    const account = getAccount[0];
    const gStaked = await liquidStakingContract.methods
      .balanceOf(account)
      .call();
    const gSpent = await liquidStakingContract.methods.unstaked(account).call();
    setStakedAmount((gStaked - gSpent) / 10 ** 18);
    console.log("staked amount: ", gStaked);
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
    } else if (networkIdRedux == networkId.polygon) {
      liquidStakingContract = polygonLiquidStakingContract;
      liquidStakingAddress = polygonLiquidStakingAddress;
      rewardTokenContract = polygonRewardTokenContract;
      rewardTokenAddress = polygonRewardTokenAddress;
    }
    getTotalStaked(liquidStakingContract);
    fetchTokenPrice();
  }, []);

  const maxOnClick = () => {
    setStakeAmount(stakedAmount ? stakedAmount : 0);
  };
  const handleStakeAmountChange = (event) => {
    setStakeAmount(event.target.value);
  };

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
          ② Not be able to cancel the unbonding <br />③ Need to wait 7 days for
          the amount to be withdraw
        </WarningText2>
      </WarningWrapper>
      <StakeStatusWrapper>
        <StakeStatusText>
          <YouStaked>You Staked</YouStaked>
          <Price>
            1{tokenNameRedux} ≈ ${tokenPrice}
          </Price>
        </StakeStatusText>
        <StakeAmountText>
          {stakedAmount} {tokenNameRedux}
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
          unstakeByNetwork();
        }}
      >
        UnStake
      </UndelegateButton>
    </LeverageWrapper>
  );
};

export default Unstake;
