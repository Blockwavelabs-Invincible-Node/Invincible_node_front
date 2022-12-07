import React, { useState } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import StakeInput from "../utils/stakeInput";
import StakeInputSimul from "../utils/stakeInputSimul";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";

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
const ThirdText = styled(BoldText)`
  font-size: 20px;
  font-weight: 700;
`;
const CurrentStatusWrapper = styled.div``;
const FourthText = styled(BoldText)``;
const MaximizeWrapper = styled.div``;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ComingButton = styled(Button)`
  max-width: 240px;
  height: 50px;
  margin-right: 17px;
  font-size: 15px;
  font-weight: 700;
`;
const StakeButton = styled(Button)`
  max-width: 240px;
  height: 50px;
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

const web3 = new Web3(window.ethereum);

const Leverage = ({ pressStake, token, stakeAmount, getAmount }) => {
  const [leveraged, setLeveraged] = useState(true);
  const [leverage, setLeverage] = useState(2);
  const stake = () => {
      const doStake = async(amount) => {
        let realAmount = amount * (web3.utils.toBN(10 ** 18));
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        console.log("account: ", account); 
        web3.eth.sendTransaction({
            from: account,
            to: address.liquidStaking,
            value: realAmount
        })
        .then(function(receipt){
          console.log(receipt);
          pressStake();
        });
    }
    doStake(stakeAmount);
    
  };
  const switchOnClick = () => {
    setLeveraged(!leveraged);
  };

  const leverageOnChange = (e) => {
    setLeveraged(e.target.valueAsNumber);
  };
  return (
    <LeverageWrapper>
      <FirstText>Real Enough?</FirstText>
      <SecondText>
        Go to the next step, boost your profit & save your value up
      </SecondText>
      <ThirdText>Current Status</ThirdText>
      <CurrentStatusWrapper>
        <StakeInput
          token={token}
          stakeAmount={stakeAmount}
          getAmount={getAmount}
        />
      </CurrentStatusWrapper>
      <FourthText>Simulate your maximized profits</FourthText>
      <SimulateBox>
        <LeverageTextBox>
          <LeverageValue>If you {leverage}X</LeverageValue>
          <LeverageText>Leverage</LeverageText>
        </LeverageTextBox>
        <SwitchContainer>
          <LeverageVolumeControl
            type="range"
            min={1}
            max={4}
            step={0.02}
            value={leverage}
            onChange={(event) => {
              setLeverage(event.target.valueAsNumber);
            }}
            // onChange={(e)=>leverageOnChange(e)}
          />
          {/* <SwitchLeftButton
            style={leveraged ? {} : { backgroundColor: "#333333" }}
            onClick={switchOnClick}
          >
            <SwitchLeftDiv1>2X</SwitchLeftDiv1>
            <SwitchLeftDiv2>Leverage</SwitchLeftDiv2>
          </SwitchLeftButton>
          <CenterCircle />
          <SwitchRightButton
            style={leveraged ? {} : { backgroundColor: "#1F53FF" }}
            onClick={switchOnClick}
          >
            <SwitchLeftDiv2>Risk hedge</SwitchLeftDiv2>
          </SwitchRightButton> */}
        </SwitchContainer>
        <StakeInputSimul
          token={token}
          stakeAmount={stakeAmount}
          getAmount={getAmount}
          availableRatio={Number((1 / leverage) * 100).toFixed(0)}
        />
      </SimulateBox>
      <ButtonWrapper>
        <ComingButton>Coming Soon</ComingButton>
        <StakeButton
          onClick={() => {
            stake();
          }}
        >
          Stake
        </StakeButton>
      </ButtonWrapper>
    </LeverageWrapper>
  );
};

export default Leverage;
