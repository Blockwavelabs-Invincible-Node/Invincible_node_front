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
import { useTable } from 'react-table'
import contractAddress from "../../../addresses/contractAddress.json"
import StableTokenPoolMethodObject from "../../functions/getStableTokenPool";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";


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
const TitleText = styled(BoldText)` 
text-align: left;
`;
const SecondText = styled(LightText)`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 22px;
`;
const FirstWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: left;
`;
const SecondWrapper = styled.div` 
    margin-top: 5vh;
    display: flex;
    justify-content: space-between;
    text-align: left;
`;
const ThirdWrapper = styled.div` 
margin-top: 5vh;
    margin-left: 3vw;
    margin-right: 3vw;
`;
const ComponentWrapper = styled.div` 
    width: 45%;
    margin-left: 3vw;
    margin-right: 3vw;
`;
const ElementWrapper = styled.div` 
    display: flex;
    justify-content: space-evenly;
`;
const Element1 = styled.div` 
     width: 45%;
     text-align: center;
`;
const Element2 = styled(Element1)` 
    width: 30%;
`;
const TextBox = styled.div` 
background: #1B1B1B;
border-radius: 10px;
`;
const ContentText = styled(LightText)` 
width: 95%;
font-size: 15px ;
`;
const Line = styled.hr` 
width: 100%;
color: white;
`;
const Table = styled.table` 
width: 90%;
margin:auto;
text-align: center;
`;
const TableHeadRow = styled.tr` 

`;
const TableRow = styled.tr` 
background: #1B1B1B;
margin-top: 2vh;
margin-bottom: 2vh;
`;
const TableHeader = styled.th` 

`;
const TableElement = styled.td` 

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

    const stableCoinPoolRead = async() => {
        const stableTokenPoolContract = new goerliWeb3.eth.Contract(stableTokenPool.output.abi, contractAddress.stableCoinPool);
        const totalSupplyPro = stableTokenPoolContract.methods.totalReceived().call();
        const totalLendPro = stableTokenPoolContract.methods.totalSent().call();
        
        const [totalSupply, totalLend] = await Promise.all([
            totalSupplyPro,
            totalLendPro
        ]);

        console.log(totalSupply, totalLend);
        setBalance((totalSupply-totalLend) / 10**18);
    }
  
    useEffect(()=> {
       stableCoinPoolRead();
    }, []);

    function getShortenedAddress(addr) {
        return addr.substring(0,5) + "..." + addr.substring(25);
    }
  
    return (
        <LeverageWrapper>
            <FirstWrapper>
                <ComponentWrapper>
                    <FirstText>Liquid Staking Contract Info</FirstText>
                    <Line></Line>
                    <ElementWrapper>
                        <Element1>
                            <TitleText>Address</TitleText>
                            <TextBox>
                                <ContentText>{getShortenedAddress(liquidStakingContractAddress)}</ContentText>
                            </TextBox>
                        </Element1>
                        <Element1>
                            <TitleText>Block Height</TitleText>
                            <TextBox>
                                <ContentText>111,111</ContentText>
                            </TextBox>
                        </Element1>
                    </ElementWrapper>
                </ComponentWrapper>
                <ComponentWrapper>
                    <FirstText>Reserved USDT Contract Info</FirstText>
                    <Line></Line>
                    <ElementWrapper>
                        <Element2>
                            <TitleText>Address</TitleText>
                            <TextBox>
                                <ContentText>{getShortenedAddress(stableCoinPoolContractAddress)}</ContentText>
                            </TextBox>
                        </Element2>
                        <Element2>
                            <TitleText>Balance</TitleText>
                            <TextBox>
                                <ContentText>{balance}</ContentText>
                            </TextBox>
                        </Element2>
                    </ElementWrapper>

                    <ElementWrapper>
                        <Element2>
                            <TitleText>Token Address</TitleText>
                            <TextBox>
                                <ContentText>{contractAddress.testUSDT}</ContentText>
                            </TextBox>
                        </Element2>
                        <Element2>
                            <TitleText>Block Height</TitleText>
                            <TextBox>
                                <ContentText>111,111</ContentText>
                            </TextBox>
                        </Element2>
                    </ElementWrapper>
                </ComponentWrapper>
            </FirstWrapper>
            <SecondWrapper>
                <ComponentWrapper>
                    <FirstText>Staked</FirstText>
                    <SecondText>Logs of staked amounts that the users had done toward INVI node</SecondText>
                    <Line></Line>
                    <Table>
                        <TableHeadRow>
                            <TableHeader>From</TableHeader>
                            <TableHeader>Token Amount</TableHeader>
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
                </ComponentWrapper>
                <ComponentWrapper>
                    <FirstText>Redelegated</FirstText>
                    <SecondText>Logs of redelegated amounts that INVI node had done</SecondText>
                    <Line></Line>
                    <Table>
                        <TableHeadRow>
                            <TableHeader>From</TableHeader>
                            <TableHeader>Token Amount</TableHeader>
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
                </ComponentWrapper>
            </SecondWrapper>
            <ThirdWrapper>
                <FirstText>Reserved USDT Usage</FirstText>
                <SecondText>Logs of reserved $USDT for risk hedging that the users had done</SecondText>
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
            </ThirdWrapper>
        </LeverageWrapper>
    );
};

export default Contract;