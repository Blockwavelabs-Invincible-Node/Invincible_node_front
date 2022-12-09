import { React, useState, useEffect } from "react";
import styled from "styled-components";
import zeroImg from "../../../assets/images/zero.png";
import oneImg from "../../../assets/images/one.png";
import { useDispatch, useSelector } from "react-redux";
import { selectStakeAmount } from "../../../redux/reducers/stakeAmountReducer";
import { setAmount } from "../../../redux/reducers/stakeAmountReducer";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { LightText } from "../../../styles/styledComponents/lightText";
import { NumberImg } from "../../../styles/styledComponents/numberImg";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import { Form } from "../../../styles/styledComponents/form";
import Select from "react-select";
import Web3 from "web3";
import { Button } from "../../../styles/styledComponents/button";
import { useNavigate } from "react-router-dom";

const stage = [
    { status: "selectToken" },
    { status: "setAmount" },
    { status: "??" },
    { status: "??" },
  ];

const AllWrapper = styled(Wrapper)` 
    text-align: left;
`;
const StageBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 22px;
  margin-bottom: 50px;
`;
const StageCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #d9d9d9;
`;
const ContentBox = styled.div`
  display: flex;
  width: 100%;
`;
const LevelBox = styled.div`
  width: 45px;
  position: relative;
  margin-right: 4vw;
`;
const LevelCircle = styled(BoldText)`
  width: calc(30px + 1vw);
  height: calc(30px + 1vw);
  border-radius: 100px;
  background-color: #1f53ff;
  color: #ffffff;
  text-align: center;
  position: absolute;
  top: 43px;
  line-height: calc(30px + 1vw);
  font-size: calc(10px + 0.7vw);
`;
const TitleBox = styled.div` 
`;
const TextBox = styled.div` 
`;
const FirstText = styled(BoldText)` 

`;
const SecondText = styled(LightText)` 
font-size: 20px;
margin-bottom: 1vh;
`;
const ThirdText = styled(LightText)` 
height: 2vh;
margin-top: 2vh;
margin-bottom: 1vh;
`;
const Checker = styled.div` 

`;
const EmptyBox = styled.div` 
width: 45px;
position: relative;
margin-right: 4vw;
`;
const FormBox = styled.div` 
background-color: #1b1b1b;
width: 100%;
`;
const FirstBox = styled.div` 
width: 90%;
margin: auto;
`;
const SecondBox = styled.div` 
display: flex;
justify-content: space-between;
background-color: black;    
width: 95%;
margin: auto;
margin-bottom: 5px;
height: 5vh;
border-radius: 10px;
`;
const ThirdBox = styled(SecondBox)` 

`;
const FourthBox = styled(SecondBox)` 
margin-bottom: 15px;
`;
const LeftSide = styled.div` 
margin-left: 2vw;
margin-top: 2vh;
`;
const RightSide = styled.div` 
margin-right: 2vw;
margin-top: 2vh;
`;
const VolumeControl = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  border: hidden;
  margin-bottom: 1vh;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 15px;
    // box-shadow: 0px 0px 0px 5px #146dd8 inset;
    background-color: #1f53ff;
    // background: ${(props) => (props.volume ? "#d9d9d9" : "#E5E7EB")};
    // margin-top: -5px;
    cursor: pointer;
  }
`;
const ConfirmButton = styled(Button)` 
width: 100%;
border-radius: 10px;
margin-top: 20px;
`;

const web3 = new Web3(window.ethereum);

const RiskHedge = ({
    openModal,
    stakeAmount,
    setStakeAmountGlobal,
    setGetAmountGlobal,
    setHedgeAmountGlobal
}) => {
  const [stageLevel, setStageLevel] = useState(2);
  const [volume, setVolume] = useState(2);

  const tempStake = 500;
  const tempSwapRate = 0.9;

  return (
    <AllWrapper>
        <StageBar>
            {stage.map((v, i) => (
              <StageCircle
                style={i <= stageLevel ? { backgroundColor: "#1F53FF" } : {}}
              />
            ))}
        </StageBar>
        <ContentBox>
            <LevelBox>
              <LevelCircle>3</LevelCircle>
            </LevelBox>
            <TitleBox>
                <TextBox>
                    <FirstText>Risk Hedge with Stable Coin</FirstText>
                    <SecondText>Set your hedging ratio</SecondText>
                </TextBox>
                <Checker>
                </Checker>
            </TitleBox>
        </ContentBox>
        <ContentBox>
            <EmptyBox></EmptyBox>
            <FormBox>
                <FirstBox>
                    <ThirdText>You will stake</ThirdText>
                    <VolumeControl
                        type="range"
                        min={0}
                        max={60}
                        step={1}
                        value={volume}
                        onChange={(event) => {
                        setVolume(event.target.valueAsNumber);
                        }}
                        // onChange={(e)=>leverageOnChange(e)}
                    />
                </FirstBox>
                <SecondBox>
                    <LeftSide>Stable Hedge Ratio</LeftSide>
                    <RightSide>{volume}%</RightSide>
                </SecondBox>
                <ThirdBox>
                    <LeftSide>From</LeftSide>
                    <RightSide>{tempStake * volume / 100} Matic</RightSide>
                </ThirdBox>
                <FourthBox>
                    <LeftSide>To</LeftSide>
                    <RightSide>{tempStake * volume * tempSwapRate / 100} USDT</RightSide>
                </FourthBox>
            </FormBox>
        </ContentBox>
        <ContentBox>
            <EmptyBox></EmptyBox>
            <ConfirmButton 
            onClick={() => {
                openModal();
            }}
            >Confirm</ConfirmButton>
        </ContentBox>
    </AllWrapper>
  );
};

export default RiskHedge;
