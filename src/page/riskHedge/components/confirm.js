import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import StakeInput from "../utils/stakeInput";
import StakeInputSimul from "../utils/stakeInputSimul";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";
import HedgeInput from "../utils/hedgeInput";
import SwitchNetwork from "../../functions/switchNetwork";
import testUSDT from "../../../artifacts/testUSDT.json";
import contractAddress from "../../../addresses/contractAddress.json";
import { useDispatch, useSelector } from "react-redux";
import { selectHedgeAmount } from "../../../redux/reducers/hedgeAmountReducer";
import { selectStakeAmount } from "../../../redux/reducers/stakeAmountReducer";
import { setStakeAmount } from "../../../redux/reducers/stakeAmountReducer";
import { RotatingLines } from "react-loader-spinner";
import { selectHedgeRatio } from "../../../redux/reducers/hedgeRatioReducer";
import { selectNetworkId } from "../../../redux/reducers/networkReducer";
import networkId from "../../../network/networkId.json";
import GetAddressAndContract from "../../functions/getAddressAndContract";
import testV4Abi from "../../../artifacts/testV4.json";
import { css, Slider } from "@mui/material";
import { Balloon } from "../../../styles/styledComponents/balloon";
import {
  selectNetworkName,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";

const LeverageWrapper = styled.div`
  /* margin-top: 5vh; */
  margin-bottom: 5vh;
  width: 30vw;
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
`;
const ThirdText = styled(BoldText)`
  font-size: 20px;
  font-weight: 700;
`;
const FourthText = styled(BoldText)``;
const MaximizeWrapper = styled.div``;
const ButtonWrapper = styled.div`
  width: 100%;
`;
const ComingButton = styled(Button)`
  max-width: 240px;
  height: 50px;
  margin-right: 17px;
  font-size: 15px;
  font-weight: 700;
`;
const StakeButton = styled(Button)`
  width: 100%;
  height: 4vh;
  margin-top: 4vh;
  font-size: 15px;
  font-weight: 700;
  background-color: #f1f1f1;
  color: #1f53ff;
`;

const SimulateBox = styled.div`
  width: 100%;
  min-height: 135px;
  padding: min(24px, 5vw) min(45px, 5vw) min(24px, 5vw) min(45px, 5vw);
  background-color: #292929;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 16px;
`;

const SwitchContainer = styled.div`
  width: 100%;
  display: flex;
  height: 29px;
  position: relative;
  margin-bottom: 14px;
`;

const LeverageVolumeControl = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  //   padding-left: 20px;
  //   padding-right: 20px;
  border: hidden;
  // background-color: #1f53ff;

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

const SwitchLeftButton = styled.button`
  width: 50%;
  height: 100%;
  border-radius: 20px 0px 0px 20px;
  background-color: #1f53ff;
  display: flex;
  align-items: center;
  padding-left: 20px;
  justify-content: left;
  border: hidden;
`;

const SwitchRightButton = styled.button`
  width: 50%;
  height: 100%;
  border-radius: 0px 20px 20px 0px;
  background-color: #333333;
  display: flex;
  align-items: center;
  padding-right: 20px;
  justify-content: right;
  border: hidden;
`;

const SwitchLeftDiv1 = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 900;
  color: #f1f1f1;
  margin-right: 3px;
`;

const SwitchLeftDiv2 = styled.div`
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  color: #f1f1f1;
`;

const CenterCircle = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 15px;
  box-shadow: 0px 0px 0px 5px #146dd8 inset;
  background-color: #333333;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const LeverageTextBox = styled.div`
  display: flex;
  align-items: bottom;
  text-align: left;
`;

const LeverageValue = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 900;
  margin-right: 3px;
`;

const LeverageText = styled.div`
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  margin-top: 4px;
`;

const InProgress = styled.div``;
const PendingBox = styled.div`
  display: flex;
  justify-content: center;
`;

//styled component for progress bar
const CurrentStatusWrapper = styled.div`
  margin-top: 3vh;
  margin-bottom: 3vh;
`;
const CurrentStatusProgressWrapper = styled.div`
  position: relative;
  height: 15vh;
  margin-top: 2vh;
  padding-left: 2vw;
  padding-right: 2vw;
  background-color: #292929;
  border-radius: 5px;
`;

const BackgroundProgress = styled.div`
  position: absolute;
  width: ${(props) => 80 - (props.volume / 100) * 80 + 1}%;
  top: 50%;
  right: 10%;
  transform: translate(0, -50%);
`;
const ForegroundProgress = styled.div`
  position: absolute;
  /* ${(props) =>
    props.volume == 0
      ? css`
          width: 0%;
        `
      : css`
          width: ${(props.volume / 100) * 80}%;
        `}; */
  width: ${(props) =>
    props.volume == 0 ? "5%" : "((props.volume} / 100) * 80)%"};
  top: 50%;
  left: 9.5%;
  transform: translate(0, -50%);
`;

// balloons
const StableBalloon = styled(Balloon)`
  position: absolute;
  width: 15%;
  top: 28%;
  color: white;
  font-weight: 600;
  font-size: 0.5vw;
  background-color: #4759ff;
  left: ${(props) => props.volume / 2}%;
  &:after {
    border-top: 0px solid #4759ff;
    border-left: 0px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 10px solid #4759ff;
    content: "";
    position: absolute;
    top: -30%;
    right: 50%;
    transform: translate(50%, 0%);
  }
`;
const StakeBalloon = styled(Balloon)`
  position: absolute;
  width: 15%;
  top: 28%;
  color: #1b1b1b;
  font-weight: 600;
  font-size: 0.5vw;
  right: ${(props) => (80 - (props.volume / 100) * 80) / 2 + 4}%;
  &:after {
    border-top: 0px solid #4759ff;
    border-left: 0px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid #4759ff;
    content: "";
    position: absolute;
    top: -30%;
    right: 50%;
    transform: translate(50%, 0%);
  }
`;
const SuggestBalloon = styled(Balloon)`
  width: 2vw;
  top: 57%;
  color: white;
  font-weight: 600;
  font-size: 0.5vw;
  background-color: #4759ff;
  left: ${(props) => (props.volume * 80) / 100 + 6.5}%;
  /* left: 7%; */
  &:after {
    border-top: 0px solid #4759ff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #4759ff;
    content: "";
    position: absolute;
    top: -30%;
    right: 50%;
    transform: translate(50%, 0%);
    z-index: 5;
  }
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

const Confirm = ({ pressStake, token }) => {
  const [leveraged, setLeveraged] = useState(true);
  const [leverage, setLeverage] = useState(2);
  const [inProgress, setInProgress] = useState(false);
  const [volume, setVolume] = useState(30);
  const hedgeAmountRedux = useSelector(selectHedgeAmount);
  const stakeAmountRedux = useSelector(selectStakeAmount);
  const hedgeRatioRedux = useSelector(selectHedgeRatio);
  const stakeDispatch = useDispatch();
  const networkIdRedux = useSelector(selectNetworkId);
  const tokenNameRedux = useSelector(selectTokenName);

  useEffect(() => {
    setVolume(hedgeRatioRedux);
    console.log(hedgeRatioRedux);
  }, []);

  console.log("pol con: ", polygonLiquidStakingContract);

  const stake = () => {
    //stake redux 값 변경
    // stakeDispatch(
    //   setStakeAmount((stakeAmountRedux * (100 - hedgeRatioRedux)) / 100)
    // );
    const amount = (stakeAmountRedux * (100 - hedgeRatioRedux)) / 100;
    const doStake = async (amount) => {
      let realAmount = web3.utils.toBN(amount * 10 ** 18);
      const getAccount = await web3.eth.getAccounts();
      const account = getAccount[0];
      console.log("account: ", account);
      // data = hex encoded
      console.log("hedge amount: ", hedgeAmountRedux);
      let liquidStaking;
      console.log("net id ", networkIdRedux);
      // get network Id and stake
      if (networkIdRedux == networkId.polygon) {
        console.log("matic");
        liquidStaking = polygonLiquidStakingAddress;
        const testV4Address = "0x499d11e0b6eac7c0593d8fb292dcbbf815fb29ae";
        const testV4Contract = new web3.eth.Contract(testV4Abi, testV4Address);
        console.log("testv4: ", testV4Contract);
        const approve = await testV4Contract.methods
          .approve(polygonLiquidStakingAddress, realAmount)
          .send({ from: account })
          .then((result) => {
            console.log(result);
          });
        const receiveToken = await polygonLiquidStakingContract.methods
          .receiveToken(realAmount, hedgeAmountRedux)
          .send({ from: account })
          .then((result) => {
            console.log(result);
            pressStake();
          });
      } else {
        if (networkIdRedux == networkId.evmos) {
          liquidStaking = address.evmosLiquidStaking;
        } else if (networkIdRedux == networkId.kava) {
          liquidStaking = address.kavaLiquidStaking;
        }
        web3.eth
          .sendTransaction({
            from: account,
            to: liquidStaking,
            value: realAmount,
            data:
              hedgeAmountRedux != 0
                ? web3.utils.numberToHex(web3.utils.toBN(hedgeAmountRedux))
                : 0,
          })
          .then(function (receipt) {
            console.log(receipt);
            if (receipt && hedgeAmountRedux != 0) {
              // sendStableCoin(hedgeAmountRedux);
            }
            pressStake();
          });
      }
    };
    doStake(amount);
  };

  // const sendStableCoin = async (amount) => {
  //   console.log("amount: ", amount);
  //   const getAccount = await web3.eth.getAccounts();
  //   const account = getAccount[0];
  //   const testUSDTContract = new web3.eth.Contract(
  //     testUSDT.output.abi,
  //     contractAddress.testUSDT
  //   );
  //   const owner = web3.eth.accounts.privateKeyToAccount(
  //     process.env.REACT_APP_OWNER_PRIVATE_KEY
  //   );
  //   console.log(owner.address, account);
  //   console.log(await testUSDTContract.methods);
  //   const send = await testUSDTContract.methods
  //     .transfer(account, amount)
  //     .send({ from: owner.address })
  //     .then(function (receipt) {
  //       console.log(receipt);
  //     });
  // };

  return (
    <LeverageWrapper>
      <FirstText>Bill</FirstText>
      <SecondText>
        Check this bill again and confirm your final position.
      </SecondText>
      <CurrentStatusWrapper>
        <ThirdText>Current Status</ThirdText>
        <CurrentStatusProgressWrapper>
          <StableBalloon volume={volume}>
            {Number((hedgeAmountRedux / 10 ** 18) * 10 ** 11).toFixed(5)} USDC
          </StableBalloon>
          <BackgroundProgress volume={volume}>
            <Slider
              size="big"
              aria-label="Small steps"
              value={100}
              min={0}
              max={100}
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
          </BackgroundProgress>
          <StakeBalloon volume={volume}>
            {Number((stakeAmountRedux * (100 - hedgeRatioRedux)) / 100).toFixed(
              5
            )}
            {tokenNameRedux}
          </StakeBalloon>
          <ForegroundProgress volume={volume}>
            <Slider
              size="1000p"
              aria-label="Small steps"
              value={100}
              // step={0.00000001}
              min={0}
              max={100}
              // marks={marks}
              valueLabelDisplay="off"
              sx={{
                // color: "#4759FF",
                // "& .MuiSlider-colorPrimary": {
                //   color: "#FAF1E4",
                // },

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
                  // border: 0,
                },
                "& .MuiSlider-mark": {
                  color: "#4759FF",
                  height: "1.0vh",
                  width: "0.1vw",
                },
                "& .MuiSlider-markLabel": {
                  color: "white",
                  fontSize: 0.1,
                },
              }}
            />
          </ForegroundProgress>
          <SuggestBalloon volume={volume}>{volume} %</SuggestBalloon>
        </CurrentStatusProgressWrapper>
      </CurrentStatusWrapper>
      <StakeInput token={token} />
      <HedgeInput token={token} />
      <ButtonWrapper>
        {!inProgress ? (
          <StakeButton
            onClick={() => {
              stake();
              setInProgress(true);
            }}
          >
            Stake
          </StakeButton>
        ) : (
          <InProgress>
            Transaction in Progress..
            <br />
            <PendingBox>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </PendingBox>
          </InProgress>
        )}
      </ButtonWrapper>
    </LeverageWrapper>
  );
};

export default Confirm;
