import { React, useState, useEffect } from "react";
import styled from "styled-components";
import zeroImg from "../../../assets/images/zero.png";
import oneImg from "../../../assets/images/one.png";
import { useDispatch, useSelector } from "react-redux";
import { selectStakeAmount } from "../../../redux/reducers/stakeAmountReducer";
import { setStakeAmount } from "../../../redux/reducers/stakeAmountReducer";
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
import {
  selectNetworkId,
  selectNetworkName,
  selectTokenName,
} from "../../../redux/reducers/networkReducer";
import GetTokenPrice from "../../functions/fetchTokenPrice";
import CheckNetwork from "../../functions/checkNetwork";

const StakeForm = styled(Form)``;
const StakingWrapper = styled(Wrapper)`
  margin-top: 10vh;
`;
const SelectTokenText = styled(BoldText)`
  font-size: 20px;
`;
const StakeAmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StakeAmountText = styled(BoldText)`
  font-size: 20px;
`;
const BalanceText = styled(LightText)`
  font-size: 13px;
  font-weight: 400;
  text-align: right;
`;
const TokenToStake = styled(Select)`
  width: 100%;
  margin-right: 20px;
`;
const AmountToStake = styled(BasicInput)`
  width: 100%;
  height: 100%;
  border: hidden;
  text-align: right;
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 500;
  min-width: 30px;
  &:focus {
    outline: none;
  }
`;
const AmountBox = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-top: 14px;
`;

const MaxButton = styled(Button)`
  padding-left: 1vw;
  padding-right: 1vw;
  width: auto;
  height: 35px;
`;

const CurrencyBox = styled.div`
  font-family: Pretendard;
  font-size: 19px;
  font-weight: 500;
  color: #252525;
`;

const StakeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3%;
`;
const YouWillStake = styled(LightText)`
  font-size: min(20px, 4vw);
  font-weight: 400;
`;
const EvmosAmount = styled(LightText)`
  font-size: min(20px, 4vw);
  font-weight: 400;
`;
const GetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
  align-items: center;
`;
const YouWillGet = styled(LightText)`
  font-size: min(20px, 4vw);
  font-weight: 400;
`;
const InEvmosAmount = styled(LightText)`
  font-size: min(20px, 4vw);
  font-weight: 400;
  white-space: nowrap;
`;
const ZeroImage = styled(NumberImg)``;
const OneImage = styled(NumberImg)``;
const StakeButton = styled(Button)`
  width: 90%;
  height: 60px;
  margin: auto;
  font-size: 23px;
  font-weight: 700;
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
`;

const InputBox = styled.div`
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

const DropboxContainer = styled.div`
  width: 100%;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-between;
  padding: 11px 17px;
  height: 62px;
  margin-bottom: 34px;
  border-radius: 5px;
`;

const SelectButton = styled(Button)`
  padding-left: 2vw;
  padding-right: 2vw;
  width: auto;
  height: 40px;
  max-width: 95px;
`;

const ResultContainer = styled.div`
  width: 100%;
  padding: min(34px, 3vw);
`;

const EvmosInputWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  width: 50%;
  align-items: center;
`;
const EvmosInput = styled.input`
  width: 7vw;
  margin-right: 1vw;
  height: 30px;
  background-color: #292929;
  border-radius: 5px;
  border: hidden;
  color: #f1f1f1;
  text-align: right;
  padding-right: 10px;
  font-family: Pretendard;
  font-size: min(18px, 4vw);
  font-weight: 400;
  &:focus {
    outline: none;
  }
  word-wrap: break-word;
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

const options = [
  { value: "evmos", label: "Evmos", udenom: "Evmos" },
  { value: "ethereum", label: "Ethereum", udenom: "eth" },
  { value: "atom", label: "Atom", udenom: "atom" },
];

const stage = [{ status: "setAmount" }, { status: "stableHedging" }];

const colourStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    //   borderColor: state.isFocused ? "transparent" : "red",
    height: "40px",
    width: "100%",
    fontFamily: "Pretendard",
    fontSize: "20px",
    fontWeight: 500,
    textAlign: "center",
    backgroundColor: "#F1F1F1",
    border: "hidden",
    boxShadow: "none",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "red" : "#f1f1f1",
      color: "#252525",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

const web3 = new Web3(window.ethereum);

const Stake = ({
  openModal,
  setToken,
  setStakeAmountGlobal,
  setGetAmountGlobal,
}) => {
  const [pressStake, setPressStake] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [stake, setStake] = useState();
  const [ethBalance, setEthBalance] = useState(null);
  const [udenom, setUdenom] = useState(options[0].udenom);
  const [label, setLabel] = useState(options[0].label);
  const [stageLevel, setStageLevel] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);

  const tokenNameRedux = useSelector(selectTokenName);
  const stakeAmountRedux = useSelector(selectStakeAmount);
  const networkIdRedux = useSelector(selectNetworkId);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const routeRiskHedge = () => {
    console.log("compare : ", stake, ethBalance);
    //stake가 ethBalance보다 큰 경우 에러 발생
    if (stake > ethBalance / 10 ** 18) {
      alert("Invalid Amount!");
      return;
    }

    let path = "/risk-hedge";
    navigate(path);
  };

  useEffect(() => {
    setStakeAmountGlobal(stake);
    // staking 후 받게 될 amount 계산 후...
    setGetAmountGlobal(stake); // 계산값 여기에 넣어주기
  }, [stake]);

  useEffect(() => {
    setStageLevel(0);
  }, [stake]);

  const web3 = new Web3(window.ethereum);
  console.log("stake reducer: ", stakeAmountRedux);
  const handleStakeAmountChange = (event) => {
    setStakeAmount(event.target.value);
    setStake(event.target.value);
    console.log(dispatch(setStakeAmount(event.target.value)));
  };

  const maxOnClick = () => {
    setStake(ethBalance ? ethBalance / 10 ** 18 : 0);
  };

  const getEthBalance = async (account) => {
    try {
      console.log("Account for balance: ", account);
      const getEthBalance = await web3.eth.getBalance(account);
      setEthBalance(getEthBalance);
      console.log("eth balance: ", getEthBalance);
    } catch (error) {
      return error;
    }
  };
  const getAccount = async () => {
    try {
      const getAccount = await web3.eth.getAccounts();
      getEthBalance(getAccount[0]);
      console.log("account :", getAccount[0]);
    } catch (error) {
      return error;
    }
  };

  const liquidStake = () => {
    // openModal();
  };

  useEffect(() => {
    getAccount();
    // if (tokenPrice == 0) {
    //   GetTokenPrice(tokenNameRedux.toUpperCase());
    // }
    console.log("Token type: ", selectedOption);
  }, []);

  const handleSelectedOption = (e) => {
    console.log(e);
    setUdenom(e.udenom);
    setLabel(e.label);
    setToken(e.label);
    setSelectedOption(e.label);
  };

  return (
    <>
      {/* <ZeroImage src={zeroImg}></ZeroImage>
                <OneImage src={oneImg}></OneImage> */}
      <StakingWrapper>
        <StakeForm>
          <StageBar>
            {stage.map((v, i) => (
              <StageCircle
                style={i <= stageLevel ? { backgroundColor: "#1F53FF" } : {}}
              />
            ))}
          </StageBar>

          <ContentBox>
            <LevelBox>
              <LevelCircle>1</LevelCircle>
            </LevelBox>
            <InputBox>
              <StakeAmountWrapper>
                <StakeAmountText>Stake Amount</StakeAmountText>
                <BalanceText>
                  Available: {ethBalance ? ethBalance / 10 ** 18 : "-"}{" "}
                  {tokenNameRedux}
                </BalanceText>
              </StakeAmountWrapper>
              <AmountBox>
                <MaxButton onClick={maxOnClick}>MAX</MaxButton>
                <AmountToStake
                  placeholder="0.0"
                  type="text"
                  value={stake}
                  onChange={handleStakeAmountChange}
                ></AmountToStake>
                <CurrencyBox>{tokenNameRedux}</CurrencyBox>
              </AmountBox>
              <ResultContainer>
                <StakeWrapper>
                  <YouWillStake>You will stake</YouWillStake>
                  <EvmosInputWrapper>
                    <EvmosInput value={stake}></EvmosInput>
                    <EvmosAmount>{tokenNameRedux}</EvmosAmount>
                  </EvmosInputWrapper>
                </StakeWrapper>
                <GetWrapper>
                  <YouWillGet>You will get</YouWillGet>
                  <EvmosInputWrapper>
                    <EvmosInput value={stake}></EvmosInput>
                    <InEvmosAmount>in{tokenNameRedux}</InEvmosAmount>
                  </EvmosInputWrapper>
                </GetWrapper>
              </ResultContainer>
              <StakeButton
                onClick={() => {
                  CheckNetwork(networkIdRedux).then((result) => {
                    if (result == 1) {
                      liquidStake();
                      setPressStake(true);
                      routeRiskHedge();
                    } else {
                      alert("Switch Network and reload Application");
                    }
                  });
                }}
              >
                Continue
              </StakeButton>
            </InputBox>
          </ContentBox>
        </StakeForm>
      </StakingWrapper>
    </>
  );
};

export default Stake;
