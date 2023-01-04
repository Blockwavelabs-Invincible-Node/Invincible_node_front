import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";

import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import contractAddress from "../../../addresses/contractAddress.json";

import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import escapeArrow from "../../../assets/images/escapeArrow.png";
import arrowDownGray from "../../../assets/images/arrowDownGray.png";
import toolTip, {
  TooltipProps,
  tooltipClasses,
} from "../../../assets/images/toolTip.svg";
import { styled as mStyled } from "@mui/material/styles";
import { RingLoader } from "react-spinners";

import {
  selectNetworkId,
  selectNetworkName,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";
import Tooltip from "@mui/material/Tooltip";
import GetAddressAndContract from "../../functions/getAddressAndContract";
import networkId from "../../../network/networkId.json";

const LeverageWrapper = styled.div`
  margin-bottom: 5vh;
  text-align: left;
  max-width: 100%;
`;
const FirstText = styled(BoldText)`
  width: 20vw;
  font-size: 1.2vw;
  margin-bottom: 1px;
  color: #f6f7fc;
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

const ToolTipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ToolTipIcon = styled.img`
  /* width: 10px; */
  /* height: 10px; */

  width: 0.6vw;
  height: 0.6vw;

  margin-left: 5px;
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
  vertical-align: middle;
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

const SpinnerBox = styled.div`
  margin-top: 30vh;
  display: flex;
  justify-content: center;
`;

const goerliWeb3 = new Web3(process.env.REACT_APP_GOERLI_RPC_URL);
// const liquidStakingContractAddress = contractAddress.evmosLiquidStaking;
// const evmosRewardTokenContractAddress = contractAddress.evmosRewardToken;
const stableCoinPoolContractAddress = contractAddress.stableCoinPool;
const testUSDTAddress = contractAddress.testUSDT;
const stableTokenPoolContract = new goerliWeb3.eth.Contract(
  stableTokenPool.output.abi,
  contractAddress.stableCoinPool
);
const web3 = new Web3(window.ethereum);
// const liquidStakingContract = new web3.eth.Contract(
//   liquidStaking.output.abi,
//   contractAddress.evmosLiquidStaking
// );

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

const Contract = () => {
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);

  // Staked
  const [stTotalAddressNumber, setStTotalAddressNumber] = useState(0);
  const [stAddress, setStAddress] = useState([]);
  const [stTotalAmount, setStTotalAmount] = useState([]);
  const [stTxHash, setStTxHash] = useState([]);
  const [stBlockHeight, setStBlockHeight] = useState([]);

  // USDT Reserved
  const [totalAddressNumber, setTotalAddressNumber] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState([]);
  const [stakeAmount, setStakeAmount] = useState([]);
  const [collateralAmount, setCollateralAmount] = useState([]);
  const [blockSignedAt, setBlockSignedAt] = useState([]);

  const networkIdRedux = useSelector(selectNetworkId);

  const toolTipComment =
    "This indicates the token amounts that you had requested as stable-hedging. Staking rewards are calculated in proportion to your principal amounts.";
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

  const getStakedData = async (liquidStakingContract) => {
    const totalAddressNum = await liquidStakingContract.methods
      .totalAddressNumber()
      .call();
    setStTotalAddressNumber(totalAddressNum);

    console.log(liquidStakingContract);
    console.log(stableTokenPoolContract);

    if (recipientAddress.length == 0) {
      for (let i = 0; i < totalAddressNum; i++) {
        const newAddress = await liquidStakingContract.methods
          .addressList(i)
          .call();
        console.log("new addr: ", newAddress);
        setStAddress((stAddress) => [...stAddress, newAddress]);

        const newTotalAmount = await liquidStakingContract.methods
          .balanceOf(newAddress)
          .call();
        console.log("new total amount: ", newTotalAmount);
        setStTotalAmount((stTotalAmount) => [...stTotalAmount, newTotalAmount]);
      }
    }
    console.log("StakedData Done");
  };

  const getUsdtData = async () => {
    const totalAddressNum = await stableTokenPoolContract.methods
      .totalAddressNumber()
      .call();
    setTotalAddressNumber(totalAddressNum);
    // console.log("total addr num: ", totalAddressNum);
    // console.log("total addr number: ", totalAddressNumber);

    if (recipientAddress.length == 0) {
      for (let i = 0; i < totalAddressNum; i++) {
        const newAddress = await stableTokenPoolContract.methods
          .addressList(i)
          .call();
        // console.log("new addr: ", newAddress);
        setRecipientAddress((recipientAddress) => [
          ...recipientAddress,
          newAddress,
        ]);

        const newStakeAmount = await stableTokenPoolContract.methods
          .balanceOf(newAddress)
          .call();
        // console.log("new stake amount: ", newStakeAmount);
        setStakeAmount((stakeAmount) => [...stakeAmount, newStakeAmount]);

        const newCollateralAmount = await stableTokenPoolContract.methods
          .borrowed(newAddress)
          .call();
        // console.log("new Collateral amount: ", newCollateralAmount);
        setCollateralAmount((collateralAmount) => [
          ...collateralAmount,
          newCollateralAmount,
        ]);
      }
    }
    console.log("get data");
  };

  function stTableRows() {
    let rows = [];
    for (let i = 0; i < stTotalAddressNumber; i++) {
      if (typeof stAddress[i] != "undefined") {
        const row = (
          <TableRow>
            <TableElement>
              {getShortenedAddress(stAddress[i])}
              {/* {console.log("row val :", i, recipientAddress[i])} */}
            </TableElement>
            <TableElement>{stTotalAmount[i]}</TableElement>
            <TableElement>Not Yet</TableElement>
            <TableElement>101</TableElement>
          </TableRow>
        );
        rows.push(row);
      }
    }
    return rows;
  }

  function usdtTableRows() {
    let rows = [];
    for (let i = 0; i < totalAddressNumber; i++) {
      if (typeof recipientAddress[i] != "undefined") {
        const row = (
          <TableRow>
            <TableElement>
              {getShortenedAddress(recipientAddress[i])}
              {/* {console.log("row val :", i, recipientAddress[i])} */}
            </TableElement>
            <TableElement>
              {stakeAmount[i]} {tokenNameRedux}
            </TableElement>
            <TableElement>
              {collateralAmount[i]} {tokenNameRedux} -{">"}{" "}
              {collateralAmount[i] * 0.8} USDT
            </TableElement>
            <TableElement>101</TableElement>
          </TableRow>
        );
        rows.push(row);
      }
    }
    return rows;
  }

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
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
    await stableCoinPoolRead();
    await getStakedData(liquidStakingContract);
    await getUsdtData();
    setLoading(false);

    // Promise.all([stableCoinPoolRead(), getStakedData(), getUsdtData()]);
  };

  function getShortenedAddress(addr) {
    console.log("length of addr: ", addr.length);
    if (addr.length == 42)
      return addr.substring(0, 5) + "..." + addr.substring(28);
    else if (addr.length == 51)
      return addr.substring(0, 5) + "..." + addr.substring(46);
  }

  const tokenNameRedux = useSelector(selectTokenName);

  return loading ? (
    <>
      <SpinnerBox>
        <RingLoader size={80} color="#f6f7fc" />
      </SpinnerBox>
    </>
  ) : (
    <LeverageWrapper>
      <FirstWrapper>
        <ComponentWrapper>
          <FirstText>Liquid Staking Contract</FirstText>
          <ElementWrapper>
            <Element1>
              <TitleText>Address</TitleText>
              <TextBox>
                <ContentText>
                  {getShortenedAddress(liquidStakingAddress)}
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
            {stTableRows()}
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
              <TableHeader>
                <ToolTipWrapper>
                  Hedged (From -{">"} To)
                  <Tooltip
                    title={toolTipComment}
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          width: 250,
                          color: "white",
                          backgroundColor: "black",
                        },
                      },
                    }}
                  >
                    <ToolTipIcon src={toolTip} />
                  </Tooltip>
                </ToolTipWrapper>
              </TableHeader>
              <TableHeader>Block Signed At</TableHeader>
            </TableHeadRow>
            {usdtTableRows()}
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
