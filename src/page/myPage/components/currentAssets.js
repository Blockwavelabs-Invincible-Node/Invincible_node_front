import styled from "styled-components";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { BorderWrapper } from "../../../styles/styledComponents/borderWrapper";
import { LightText } from "../../../styles/styledComponents/lightText";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import { React, useState, useEffect } from "react";
import Web3 from "web3";
// import contractAddress from "../../../addresses/contractAddress.json"
// import evmosLiquidStaking from "../../../artifacts/contracts/evmosLiquidStaking.sol/liquidStaking.json";
// import evmosRewardToken from "../../../artifacts/contracts/evmosRewardToken.sol/rewardToken.json";

// const liquidStakingContractAddress = contractAddress.evmosLiquidStaking;
// const evmosRewardTokenAddress = contractAddress.evmosRewardToken;

const AssetWrapper = styled.div`
  margin-bottom: 80px;
`;
const AssetBox = styled(BorderWrapper)`
  border: 1px solid #939393; ;
`;
const CurrentAssetText = styled(BoldText)`
  margin-left: 5%;
  margin-top: 30px;
`;
const MyAssetText = styled(BoldText)`
  margin-left: 13%;
  margin-bottom: 30px;
  margin-top: 50px;
`;
const AssetElementBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const AssetElements = styled.div``;
const TitleText = styled(LightText)`
  color: #939393;
  font-size: 20px;
`;
const ValueTextBig = styled(BoldText)`
  margin-top: 8px;
  font-size: 40px;
`;
const ValueTextSmall = styled(BoldText)`
  font-size: 25px;
`;
const CurrentAssets = () => {
  const [totalStaked, setTotalStaked] = useState(0);
  const [ethBalance, setEthBalance] = useState(null);
  const [evmosLiquidStakingContract, setLiquidStakingContract] = useState();
  const [evmosRewardTokenContract, setevmosRewardTokenContract] = useState();
  const [account, setAccount] = useState();
  const [accumulatedRewards, setAccumulatedRewards] = useState(0);

  const web3 = new Web3(window.ethereum);

  // function load() {
  //     const evmosLiquidStakingContract = new web3.eth.Contract(evmosLiquidStaking.abi, liquidStakingContractAddress);
  //     const evmosRewardTokenContract = new web3.eth.Contract(evmosRewardToken.abi, evmosRewardTokenAddress);

  //     //콜백 함수
  //     if (evmosLiquidStakingContract == null || evmosRewardTokenContract == null) {
  //         console.log("contract Still null");
  //     }
  //     else {
  //         setLiquidStakingContract(evmosLiquidStakingContract);
  //         setevmosRewardTokenContract(evmosRewardTokenContract);
  //     }
  // }

  const getEthBalance = async (account) => {
    try {
      console.log("Account for balance: ", account);
      const getEthBalance = await web3.eth.getBalance(account);
      console.log("ETH Balance: ", getEthBalance);
      const ethBalanceShort = (getEthBalance / 10 ** 18)
        .toString()
        .slice(0, 10);
      setEthBalance(ethBalanceShort);
    } catch (error) {
      return error;
    }
  };
  const getAccount = async () => {
    try {
      const getAccount = await web3.eth.getAccounts();
      setAccount(getAccount[0]);
      getEthBalance(getAccount[0]);
      console.log("account :", getAccount[0]);
    } catch (error) {
      return error;
    }
  };

  const getTotalStaked = async () => {
    const gStaked = await evmosLiquidStakingContract.methods
      .balanceOf(account)
      .call();
    const sliceStaked = gStaked / 10 ** 18;
    setTotalStaked(sliceStaked);
    console.log("staked amount: ", gStaked);
  };

  // useEffect(()=> {
  //     getAccount();
  //     load();
  // }, []);

  if (account == null || evmosLiquidStakingContract == null) {
    return (
      <AssetWrapper>
        <MyAssetText>My Asset</MyAssetText>
        <AssetBox>
          <h1>Connect Wallet First</h1>
        </AssetBox>
      </AssetWrapper>
    );
  }

  getTotalStaked();

  return (
    <>
      <AssetWrapper>
        <MyAssetText>My Asset</MyAssetText>
        <AssetBox>
          <CurrentAssetText>Your Assets</CurrentAssetText>
          <AssetElementBox>
            <AssetElements>
              <TitleText>Total</TitleText>
              <ValueTextBig>{totalStaked + accumulatedRewards}ETH</ValueTextBig>
            </AssetElements>
            <AssetElements>
              <TitleText>You Staked</TitleText>
              <ValueTextSmall>{totalStaked} ETH</ValueTextSmall>
              <TitleText>You staked -- 10months ago</TitleText>
            </AssetElements>
            <AssetElements>
              <TitleText>Accumulated Rewards</TitleText>
              <ValueTextSmall>{accumulatedRewards} ETH</ValueTextSmall>
              <TitleText>APR --------- 7%</TitleText>
            </AssetElements>
            <AssetElements>
              <TitleText>ETH Price</TitleText>
              <ValueTextBig>$1,263.32</ValueTextBig>
            </AssetElements>
          </AssetElementBox>
        </AssetBox>
      </AssetWrapper>
    </>
  );
};

export default CurrentAssets;
