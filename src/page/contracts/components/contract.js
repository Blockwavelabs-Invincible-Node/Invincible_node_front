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
import { useTable } from "react-table";
import contractAddress from "../../../addresses/contractAddress.json";
import StableTokenPoolMethodObject from "../../functions/getStableTokenPool";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import escapeArrow from "../../../assets/images/escapeArrow.png";
import arrowDownGray from "../../../assets/images/arrowDownGray.png";

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
`;

const goerliWeb3 = new Web3(process.env.REACT_APP_GOERLI_RPC_URL);
const liquidStakingContractAddress = contractAddress.liquidStaking;
const rewardTokenContractAddress = contractAddress.rewardToken;
const stableCoinPoolContractAddress = contractAddress.stableCoinPool;
const testUSDTAddress = contractAddress.testUSDT;
const Contract = () => {
  const [balance, setBalance] = useState();
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };

  const stableCoinPoolRead = async () => {
    const stableTokenPoolContract = new goerliWeb3.eth.Contract(
      stableTokenPool.output.abi,
      contractAddress.stableCoinPool
    );
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

  useEffect(() => {
    stableCoinPoolRead();
  }, []);

  function getShortenedAddress(addr) {
    return addr.substring(0, 5) + "..." + addr.substring(25);
  }

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
              <TableHeader>Recipient Address</TableHeader>
              <TableHeader>Staked Amount</TableHeader>
              <TableHeader>Collateral Amount</TableHeader>
              <TableHeader>Borrowed Amount</TableHeader>
              <TableHeader>Block Signed At</TableHeader>
            </TableHeadRow>
            <TableRow>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
            </TableRow>
            <TableRow>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
            </TableRow>
            <TableRow>
              <TableElement>0x0000</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
              <TableElement>111,111</TableElement>
            </TableRow>
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
