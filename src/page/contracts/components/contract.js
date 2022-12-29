import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import address from "../../../addresses/contractAddress.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import rewardToken from "../../../artifacts/rewardToken.json";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import contractAddress from "../../../addresses/contractAddress.json";
import StableTokenPoolMethodObject from "../../functions/getStableTokenPool";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import escapeArrow from "../../../assets/images/escapeArrow.png";
import arrowDownGray from "../../../assets/images/arrowDownGray.png";
import {
  selectNetworkName,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";

const LeverageWrapper = styled.div`
  margin-bottom: 5vh;
  text-align: left;
  max-width: 100%;
`;
const FirstText = styled(BoldText)`
  width: 20vw;
  font-size: 1.2vw;
  margin-bottom: 1px;
`;
const TitleText = styled(BoldText)`
  font-size: 0.8vw;
  text-align: left;
`;
const SecondText = styled(LightText)`
  font-size: 0.8vw;
  font-weight: 400;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;
const FirstWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
`;

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 10px;
  background-color: #212121;

  margin-top: 3vh;
  margin-left: 3vw;
  margin-right: 3vw;

  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;

const CompoentWrapperCol = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #212121;

  margin-top: 3vh;
  margin-left: 3vw;
  margin-right: 3vw;

  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;

const ElementWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: 2vw;
`;

const Element1 = styled.div`
  flex-basis: 50%;
  text-align: center;
  margin-left: 2vh;
`;

const StakedTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EscapeArrow = styled.img`
  margin-left: auto;
  width: 10px;
  height: 10px;
`;

const MoreWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ArrowDownGray = styled.img`
  width: 9px;
  height: 4.5px;

  margin-left: 3px;
`;

const TextBox = styled.div`
  background-color: #1b1b1b;
  border-radius: 10px;
  margin-top: 1vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 1vw;
  padding-right: 1vw;
`;

const UnitBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ContentText = styled(LightText)`
  font-size: 0.8vw;
  text-align: center;
`;

const ContentTextBold = styled(LightText)`
  font-size: 0.8vw;
  text-align: center;
`;

const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #4e4e4e;
`;
const Table = styled.table`
  width: 100%;
  margin: auto;
  text-align: center;
  border-collapse: 0;
  border-spacing: 0 1vh;
`;
const TableHeadRow = styled.tr`
  height: 3vh;
`;
const TableRow = styled.tr`
  height: 5vh;
  background: #1b1b1b;
`;
const TableHeader = styled.th`
  font-size: 0.8vw;
  &:nth-child(2n) {
    text-align: right;
  }
`;
const TableElement = styled.td`
  font-size: 0.8vw;
  text-align: center;
  border: 2px solid #1b1b1b;

  &:first-child {
    border-left-style: solid;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  &:last-child {
    border-right-style: solid;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:nth-child(2n) {
    text-align: right;
  }
`;

const goerliWeb3 = new Web3(process.env.REACT_APP_GOERLI_RPC_URL);
const liquidStakingContractAddress = contractAddress.liquidStaking;
const rewardTokenContractAddress = contractAddress.rewardToken;
const stableCoinPoolContractAddress = contractAddress.stableCoinPool;
const testUSDTAddress = contractAddress.testUSDT;
const stableTokenPoolContract = new goerliWeb3.eth.Contract(
  stableTokenPool.output.abi,
  contractAddress.stableCoinPool
);

// const getBlockNumOfTrx = () =>

const Contract = () => {
  const [balance, setBalance] = useState();
  const [totalAddressNumber, setTotalAddressNumber] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState([]);
  const [stakeAmount, setStakeAmount] = useState([]);
  const [collateralAmount, setCollateralAmount] = useState([]);
  const [blockSignedAt, setBlockSignedAt] = useState([]);

  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };

  const stableCoinPoolRead = async () => {
    const totalSupplyPro = stableTokenPoolContract.methods
      .totalReceived()
      .call();
    const totalLendPro = stableTokenPoolContract.methods.totalSent().call();

    const [totalSupply, totalLend] = await Promise.all([
      totalSupplyPro,
      totalLendPro,
    ]);

    console.log(totalSupply, totalLend);
    setBalance((totalSupply - totalLend) / 10 ** 18);
  };

  const getUsdtData = async () => {
    const totalAddressNum = await stableTokenPoolContract.methods
      .totalAddressNumber()
      .call();
    setTotalAddressNumber(totalAddressNum);
    console.log("total addr num: ", totalAddressNum);
    console.log("total addr number: ", totalAddressNumber);

    if (recipientAddress.length == 0) {
      for (let i = 0; i < totalAddressNum; i++) {
        const newAddress = await stableTokenPoolContract.methods
          .addressList(i)
          .call();
        console.log("new addr: ", newAddress);
        setRecipientAddress((recipientAddress) => [
          ...recipientAddress,
          newAddress,
        ]);

        const newStakeAmount = await stableTokenPoolContract.methods
          .balanceOf(newAddress)
          .call();
        console.log("new stake amount: ", newStakeAmount);
        setStakeAmount((stakeAmount) => [...stakeAmount, newStakeAmount]);

        const newCollateralAmount = await stableTokenPoolContract.methods
          .borrowed(newAddress)
          .call();
        console.log("new Collateral amount: ", newCollateralAmount);
        setCollateralAmount((collateralAmount) => [
          ...collateralAmount,
          newCollateralAmount,
        ]);
      }
    }
    console.log("get data");
  };

  function TableRows() {
    let rows = [];
    for (let i = 0; i < totalAddressNumber; i++) {
      const row = (
        <TableRow>
          <TableElement>
            {getShortenedAddress(recipientAddress[i])}
          </TableElement>
          <TableElement>
            {stakeAmount[i]} ({tokenNameRedux})
          </TableElement>
          <TableElement>
            {collateralAmount[i]} ({tokenNameRedux}) -{">"}{" "}
            {collateralAmount[i] * 0.8} (USDT)
          </TableElement>
          <TableElement>101</TableElement>
        </TableRow>
      );
      rows.push(row);
    }
    return rows;
  }

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    await stableCoinPoolRead();
    await getUsdtData();
  };

  function getShortenedAddress(addr) {
    return addr.substring(0, 5) + "..." + addr.substring(25);
  }

  const tokenNameRedux = useSelector(selectTokenName);

  return (
    <LeverageWrapper>
      <FirstWrapper>
        <ComponentWrapper>
          <FirstText>Liquid Staking Contract</FirstText>
          <ElementWrapper>
            <Element1>
              <TitleText>Address</TitleText>
              <TextBox>
                <ContentText>
                  {getShortenedAddress(liquidStakingContractAddress)}
                </ContentText>
              </TextBox>
            </Element1>
            <Element1>
              <TitleText>Block Height</TitleText>
              <TextBox>
                <ContentTextBold>111,111</ContentTextBold>
              </TextBox>
            </Element1>
            <Element1></Element1>
            <EscapeArrow src={escapeArrow} />
          </ElementWrapper>
        </ComponentWrapper>

        <ComponentWrapper>
          <FirstText>Reserved USDT Usage</FirstText>
          <ElementWrapper>
            <Element1>
              <TitleText>Address</TitleText>
              <TextBox>
                <ContentText>
                  {getShortenedAddress(stableCoinPoolContractAddress)}
                </ContentText>
              </TextBox>
            </Element1>
            <Element1>
              <TitleText>Balance</TitleText>
              <TextBox>
                <UnitBox>
                  <ContentTextBold>{balance}</ContentTextBold>
                  <ContentTextBold>USDT</ContentTextBold>
                </UnitBox>
              </TextBox>
            </Element1>
            <Element1>
              <TitleText>Block Height</TitleText>
              <TextBox>
                <ContentTextBold>111,111</ContentTextBold>
              </TextBox>
            </Element1>
            <EscapeArrow src={escapeArrow}></EscapeArrow>
          </ElementWrapper>
        </ComponentWrapper>

        <CompoentWrapperCol>
          <StakedTitleWrapper>
            <FirstText>Staked</FirstText>
            <EscapeArrow src={escapeArrow} />
          </StakedTitleWrapper>
          <SecondText>
            The logs of staked amounts that the users had done toward INVI node
          </SecondText>
          <Line></Line>
          <Table>
            <TableHeadRow>
              <TableHeader>Address</TableHeader>
              <TableHeader>Total Amount</TableHeader>
              <TableHeader>TX Hash</TableHeader>
              <TableHeader>Block Signed At</TableHeader>
            </TableHeadRow>
            <TableRow>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
            </TableRow>
            <TableRow>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
            </TableRow>
            <TableRow>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
            </TableRow>
          </Table>
          <MoreWrapper>
            <ContentText>More</ContentText>
            <ArrowDownGray src={arrowDownGray} />
          </MoreWrapper>
        </CompoentWrapperCol>
        <CompoentWrapperCol>
          <FirstText>Reserved USDT Usage</FirstText>
          <SecondText>
            The logs of reserved $USDT for risk hedging that the users had done
          </SecondText>
          <Line></Line>
          <Table>
            <TableHeadRow>
              <TableHeader>Recipient</TableHeader>
              <TableHeader>Staked</TableHeader>
              <TableHeader>Hedged (From -{">"} To)</TableHeader>
              <TableHeader>Block Signed At</TableHeader>
            </TableHeadRow>
            {TableRows()}
          </Table>
          <MoreWrapper>
            <ContentText>More</ContentText>
            <ArrowDownGray src={arrowDownGray} />
          </MoreWrapper>
        </CompoentWrapperCol>
      </FirstWrapper>
    </LeverageWrapper>
  );
};

export default Contract;
