import { React, useState, useEffect } from "react";
import styled from "styled-components";

import contractAddress from "../../../addresses/contractAddress.json";
import twoImg  from '../../../assets/images/twoGray.png';
import leverageImg from '../../../assets/images/leverage.png'
import { LightText } from "../../../styles/styledComponents/lightText";
import { NumberImg } from "../../../styles/styledComponents/numberImg";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import { Form } from "../../../styles/styledComponents/form";

import { useDispatch, useSelector } from "react-redux";
import { selectStakeAmount } from "../../../redux/reducers/stakeAmountReducer";

const liquidStakingContractAddress = contractAddress.liquidStaking;
console.log("contract Addr: ", liquidStakingContractAddress)

//--------------------------style-----------------------------//
const LeverageWrapper = styled(Wrapper)`

`;
const LeverageForm = styled(Form)` 
    display: grid;
    grid-template-columns: 2fr 4fr 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);;
`;
const LeverageText = styled(BoldText)`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;
`;
const TwoImage = styled(NumberImg)` 
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 3;
    grid-row-end: 4;
`;
const LeverageLine = styled.img`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    color: blue;
`;
const StakeText = styled(LightText)`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
`;
const GetText = styled(LightText)`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
`;
const EthText = styled(LightText)` 
    grid-column-start: 4;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
`;
const InethText = styled(LightText)` 
    grid-column-start: 4;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;
`;
const EthValue = styled(BoldText)` 
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    width: 100%;
`;
const InethValue = styled(BoldText)` 
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
`;
const ExpectedAprBox = styled.div` 
    background: #F1F1F1;
    border-radius: 5px;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 5;
    grid-row-end: 6;
`;
const ExpectedAprText = styled.div` 
    padding: 5% 5% 5% 5%;
`;

//--------------------------------------------------------------//


const Leverage = () => {    
    const stakeAmountRedux = useSelector(selectStakeAmount);
    const dispatch = useDispatch();
    return(
        <div>
            <LeverageWrapper>
                <LeverageForm>
                    <TwoImage src={twoImg}></TwoImage>
                    <LeverageText>Leverage</LeverageText><br />
                    <LeverageLine src={leverageImg}></LeverageLine>
                    <StakeText>You will Stake  </StakeText>
                    <EthValue>{stakeAmountRedux}</EthValue>
                    <EthText>ETH</EthText>
                    <GetText>You will get </GetText>
                    <InethValue>{stakeAmountRedux}</InethValue>
                    <InethText>inETH</InethText>
                    <ExpectedAprBox>
                        <ExpectedAprText>Expected APR ........................... %</ExpectedAprText>
                    </ExpectedAprBox>
                </LeverageForm>
            </LeverageWrapper>
        </div>
    );
}

export default Leverage;