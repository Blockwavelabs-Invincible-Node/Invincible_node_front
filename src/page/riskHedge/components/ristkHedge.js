import { React, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import zeroImg from "../../../assets/images/zero.png";
import oneImg from "../../../assets/images/one.png";
import { useDispatch, useSelector } from "react-redux";
import { selectStakeAmount } from "../../../redux/reducers/stakeAmountReducer";

import { setHedgeAmount } from "../../../redux/reducers/hedgeAmountReducer";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { LightText } from "../../../styles/styledComponents/lightText";
import { NumberImg } from "../../../styles/styledComponents/numberImg";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import { Form } from "../../../styles/styledComponents/form";
import Web3 from "web3";
import { Button } from "../../../styles/styledComponents/button";
import { useNavigate } from "react-router-dom";
import { First } from "react-bootstrap/esm/PageItem";
import { selectHedgeAmount } from "../../../redux/reducers/hedgeAmountReducer";
import {
  selectNetworkName,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";
import toggleOn from "../../../assets/images/toggleOn.svg";
import toggleOff from "../../../assets/images/toggleOff.svg";
import riskHedgeArrow from "../../../assets/images/riskHedgeArrow.svg";
import { Slider } from "@mui/material";
import GetTokenPrice from "../../functions/fetchTokenPrice";
import { setHedgeRatio } from "../../../redux/reducers/hedgeRatioReducer";

import { alpha, styled as muiStyled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import { FiPercent } from "react-icons/fi";

const stage = [{ status: "setAmount" }, { status: "stableHedging" }];

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
  margin-bottom: 1vh;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const TextBox = styled.div``;
const TextBox2 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FirstText = styled(BoldText)`
  /* font-size: 18px; */
  margin-bottom: 4px;
`;
const SecondText = styled(LightText)`
  /* font-size: 13px; */
  margin-bottom: 1vh;
`;
const ThirdText = styled(LightText)`
  height: 2vh;
  margin-top: 2vh;
  margin-bottom: 1vh;
  /* font-size: 20px; */
`;
const FourthText = styled(LightText)`
  font-size: 0.1vw;
  margin-left: 1.5vw;
  ${(props) =>
    props.top &&
    css`
      margin-bottom: 0.5vh;
    `}
  ${(props) =>
    props.under &&
    css`
      margin-top: 0.5vh;
    `}
`;
const FifthText = styled(LightText)``;
const Checker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ToggleImg = styled.img`
  width: 70%;
  height: 70%;
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
  margin-bottom: 5vh;
`;
const SecondBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: black;
  width: 95%;
  margin: auto;
  margin-top: 1vh;
  margin-bottom: 5px;
  height: 5vh;
  border-radius: 10px;
`;
const ThirdBox = styled(SecondBox)`
  height: 10vh;
  margin-top: 0vh;
`;
const FourthBox = styled(SecondBox)`
  height: 10vh;
  margin-top: 0vh;
  margin-bottom: 15px;
`;
const FifthBox = styled(FirstBox)`
  margin-bottom: 15px;
`;
const ThirdFourBoxWrapper = styled.div`
  position: relative;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
  /* margin-top: 2vh; */
  /* margin-bottom: 2vh; */
`;
const LeftSideFromTo = styled(LeftSide)`
  align-items: flex-start;
  margin-left: 2vw;
  margin-top: 2vh;
`;
const RightSide = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-right: 2vw;
  /* margin-top: 2vh; */
`;
const RightSideTokenName = styled.div`
  width: 6vw;
  height: 5vh;
  text-align: center;
  line-height: 5vh;
  margin-left: 1.5vw;
  border-radius: 5px;
  background-color: #1b1b1b;
  color: white;
`;
const RightsideMiniWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VolumeControl = styled.div`
  position: relative;
  width: 100%;
  height: 5vh;
  /* border-radius: 20px;
  display: flex;
  justify-content: space-between;
  border: hidden; */
  /* margin-top: 3vh; */
  /* margin-bottom: 5vh; */
`;
const VolumeControlOver1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* border-radius: 20px;
  display: flex;
  justify-content: space-between;
  border: hidden; */
  top: 50%;
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */

  /* margin-bottom: 1vh; */
`;
const VolumeControlOver2 = styled.div`
  position: absolute;
  width: 15vw;
  height: 100%;
  /* border-radius: 20px;
  display: flex;
  justify-content: space-between;
  border: hidden; */
  top: 50%;

  /* transform: translate(0%, 0%); */
  /* margin-bottom: 1vh; */
`;
// const SliderLine = styled.hr`
//   width: 100%;
//   border-top: 2px solid #4e4e4e;
// `;
const SpecifyButton = styled(Button)`
  background-color: #ffffff;
  color: #1f53ff;
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;
const ConfirmButton = styled(Button)`
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;
const RiskHedgeArrowWrapper = styled.img`
  height: 30px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const RatioWrapper = styled.div`
  display: flex;

  align-items: center;
`;

const decimals = 8;
const web3 = new Web3(window.ethereum);

const RiskHedge = ({
  openModal,
  stakeAmount,
  setStakeAmountGlobal,
  setGetAmountGlobal,
  setHedgeAmountGlobal,
}) => {
  const [stageLevel, setStageLevel] = useState(2);
  const [volume, setVolume] = useState(0);
  const [hedge, setHedge] = useState(0);
  const [updatedStakeAmount, setUpdatedStakeAmount] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [receive, setReceive] = useState(0);
  const [stake, setStake] = useState(0);
  const [isStakeMoved, setIsStakeMoved] = useState(false);
  const [isToggle, setIsToggle] = useState(true);
  const [toggleVal, setToggleVal] = useState(0, 60);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [swapRate, setSwapRate] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const stakeAmountRedux = useSelector(selectStakeAmount);
  const hedgeAmountRedux = useSelector(selectHedgeAmount);
  const networkNameRedux = useSelector(selectNetworkName);
  const tokenNameRedux = useSelector(selectTokenName);

  const stakeDispatch = useDispatch();
  const hedgeDispatch = useDispatch();
  const hedgeRatioDispatch = useDispatch();

  const tempStake = stakeAmountRedux;
  // const tempSwapRate = 0.9;

  const marks = [
    {
      value: (stake * 66) / 100,
      label: "Maximum Risk Hedging Ratio",
    },
  ];

  useEffect(() => {
    const tempFrom = (tempStake * volume) / 100;
    console.log("set values");
    setFrom(tempFrom.toFixed(decimals));
    const tempTo = (tempStake * volume * swapRate) / 100;
    setTo(tempTo.toFixed(decimals));
    console.log("TO : ", to);
    const tempReceive = (tempStake * volume * swapRate) / 100;
    setReceive(tempReceive.toFixed(decimals));
    const tempStakes = (stakeAmountRedux * (100 - volume)) / 100;
    setStake(tempStakes.toFixed(decimals));
    if (tokenPrice == 0) {
      fetchPrice();
    }
  }, [volume]);

  const fetchPrice = async () => {
    const tp = await GetTokenPrice(tokenNameRedux.toUpperCase());
    console.log(tp);
    setTokenPrice(tp);
    setSwapRate(tp);
  };

  const handleSliderChange = (e, newValue) => {
    if (e.target.value === 0) {
      setIsStakeMoved(false);
    } else {
      setIsStakeMoved(true);
    }
    setVolume(Math.floor((e.target.value / stake) * 100));
    setSliderValue(newValue);

    console.log(volume);
    console.log(sliderValue, newValue);
  };

  const handleToggle = (e) => {
    if (e.target.alt === "on") {
      setIsToggle(false);
      setIsStakeMoved(true);
    } else if (e.target.alt === "off") {
      setIsToggle(true);
    }
  };

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
          <LevelCircle>2</LevelCircle>
        </LevelBox>
        <TitleBox>
          <TextBox>
            <FirstText>Stable-hedging</FirstText>
            <SecondText>
              Set your stable hedging ratio. It’ll be swapped to USDT.
            </SecondText>
          </TextBox>
          {/* <EmptyBox></EmptyBox>
          <EmptyBox></EmptyBox> */}
          <Checker>
            {isToggle ? (
              <ToggleImg alt="on" onClick={handleToggle} src={toggleOn} />
            ) : (
              <ToggleImg alt="off" onClick={handleToggle} src={toggleOff} />
            )}
          </Checker>
        </TitleBox>
      </ContentBox>
      <ContentBox>
        <EmptyBox></EmptyBox>
        <FormBox>
          <FirstBox>
            <TextBox2>
              <ThirdText>You will stake</ThirdText>
              <ThirdText>
                {stake} {tokenNameRedux}
              </ThirdText>
            </TextBox2>
            <VolumeControl>
              <VolumeControlOver1>
                <Slider
                  size="big"
                  aria-label="Small steps"
                  value={100}
                  min={0}
                  max={(stake * 3) / 5}
                  valueLabelDisplay="off"
                  disabled={true}
                  sx={{
                    "& .MuiSlider-thumb": {
                      display: "none",
                      height: 0,
                      width: 0,
                    },
                    "& .MuiSlider-track": {
                      height: "0.6vh",
                      color: "#FAF1E4",
                    },
                  }}
                />
              </VolumeControlOver1>
              <VolumeControlOver2>
                <Slider
                  size="1000p"
                  aria-label="Small steps"
                  value={sliderValue}
                  step={0.00000001}
                  min={0}
                  max={(stake * 66) / 100}
                  // marks={marks}
                  onChange={handleSliderChange}
                  valueLabelDisplay="off"
                  disabled={isToggle ? false : true}
                  sx={{
                    // color: "#4759FF",
                    // "& .MuiSlider-colorPrimary": {
                    //   color: "#FAF1E4",
                    // },
                    "& .MuiSlider-mark": {
                      color: "#1F53FF",
                      height: "0.6vh",
                      width: "0.1px",
                    },
                    "& .MuiSlider-markLabel": {
                      color: "white",
                      fontSize: 0.1,
                    },
                    "& .MuiSlider-thumb": {
                      display: "none",
                      height: 0,
                      width: 0,
                    },
                    "& .MuiSlider-rail": {
                      height: "0.7vh",
                      color: "#FAF1E4",
                    },
                    "& .MuiSlider-track": {
                      height: "0.7vh",
                      color: "#4759FF",
                    },
                  }}
                />
              </VolumeControlOver2>
            </VolumeControl>
          </FirstBox>
          <SecondBox>
            <LeftSide>
              <FifthText>Stable hedging Ratio you've set</FifthText>
            </LeftSide>
            <RightSide>
              <FifthText>
                <RatioWrapper>
                  <InputBase
                    value={volume}
                    sx={{
                      ml: 1,
                      flex: 1,
                      fontSize: "1.2rem",
                      marginRight: 2,
                    }}
                    placeholder="Stable Hedging Ratio"
                    inputProps={{
                      "aria-label": "Stable Hedging Ratio",
                      style: { textAlign: "right" },
                    }}
                  />
                  <FiPercent />
                </RatioWrapper>
              </FifthText>
            </RightSide>
          </SecondBox>
          <ThirdFourBoxWrapper>
            <ThirdBox>
              <LeftSideFromTo>
                <FifthText>From</FifthText>
              </LeftSideFromTo>
              <RightSide>
                <FifthText>{from}</FifthText>
                <RightSideTokenName>{tokenNameRedux}</RightSideTokenName>
              </RightSide>
            </ThirdBox>
            <RiskHedgeArrowWrapper src={riskHedgeArrow} />
            <FourthBox>
              <LeftSideFromTo>
                <FifthText>To</FifthText>
              </LeftSideFromTo>
              <RightSide>
                <FifthText>{to}</FifthText>
                <RightsideMiniWrapper>
                  <FourthText top>
                    1{tokenNameRedux} = {tokenPrice} USDT
                  </FourthText>
                  <RightSideTokenName>USDT</RightSideTokenName>
                  <FourthText under>On Ethereum network</FourthText>
                </RightsideMiniWrapper>
              </RightSide>
            </FourthBox>
          </ThirdFourBoxWrapper>
          {/* <FifthBox>
            <TextBox2>
              <ThirdText>You will Receive</ThirdText>
              <ThirdText>{receive} USDT</ThirdText>
            </TextBox2>
          </FifthBox> */}
        </FormBox>
      </ContentBox>

      <ContentBox>
        <EmptyBox></EmptyBox>
        {isStakeMoved ? (
          <ConfirmButton
            onClick={() => {
              openModal();

              const hedge = parseInt(
                stakeAmountRedux * volume * swapRate * 10 ** 5
              );
              console.log("hedge: ", hedge);
              hedgeDispatch(setHedgeAmount(hedge));
              hedgeRatioDispatch(setHedgeRatio(volume));
            }}
          >
            Next
          </ConfirmButton>
        ) : (
          <SpecifyButton>Please specify ratio you'll hedge</SpecifyButton>
        )}
      </ContentBox>
    </AllWrapper>
  );
};

export default RiskHedge;
