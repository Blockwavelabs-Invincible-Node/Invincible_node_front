import { useState } from "react";
import Web3 from "web3";
// import ValidatorApplication from "../../functions/validatorApplication";
import address from "../../../addresses/contractAddress.json";
import evmosLiquidStaking from "../../../artifacts/liquidStaking.json";
import SwitchNetwork from "../../functions/switchNetwork";
import { useDispatch, useSelector } from "react-redux";
import {
  increasePageNumber,
  resetPageNumber,
  selectModalPageNumber,
} from "../../../redux/reducers/modalPageNumberReducer";
import testUSDTJSON from "../../../artifacts/testUSDT.json";
import liquidStakingJSON from "../../../artifacts/liquidStaking.json";
import stableCoinPoolJSON from "../../../artifacts/stableCoinPool.json";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import styled from "styled-components";
import { LightText } from "../../../styles/styledComponents/lightText";
import CheckFalse from "../../../assets/images/checkFalse.svg";
import CheckTrue from "../../../assets/images/checkTrue.svg";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { Button } from "../../../styles/styledComponents/button";
import {
  selectNetworkId,
  selectNetworkName,
} from "../../../redux/reducers/networkReducer";
import { ToastContainer, toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";

import { RotatingLines } from "react-loader-spinner";
import GetAddressAndContract from "../../functions/getAddressAndContract";
import networkId from "../../../network/networkId.json";

const Title = styled(BoldText)`
  text-align: left;
  margin-top: 3vh;
  margin-left: 5%;
  margin-bottom: 1vh;
`;
const SubTitle = styled(LightText)`
  text-align: left;
  font-size: 1vh;
  margin-left: 5%;
`;
const Line = styled.hr`
  width: 90%;
  margin-bottom: 2vh;
`;
const VerifyBox = styled.div`
  display: flex;
`;
const VerifyingText = styled.div``;

const ValidatorApplicationWrapper = styled.div``;
const Step1Wrapper = styled.div`
  width: 90%;
  background-color: #1b1b1b;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 2vh;
`;
const Step2Wrapper = styled(Step1Wrapper)`
  display: flex;
  justify-content: space-between;
`;
const Step3Wrapper = styled(Step1Wrapper)``;
const CheckWrapper = styled.div`
  display: flex;
  padding-top: 1vh;
  margin-bottom: 1vh;
`;
const InputWrapper = styled.div`
  display: flex;
  /* height: 2vh; */
  justify-content: flex-end;
  margin-top: 1vh;
  padding-bottom: 2vh;
`;
const ValidatorInput = styled.input`
  height: 2vh;
  width: 20vw;
  border-radius: 5px;
  background-color: black;
  font-family: Pretendard;
  text-align: right;
  border: none;
  color: white;
`;
const AmountInput = styled(ValidatorInput)`
  width: 10vw;
`;
const NetworkWrapper = styled.div`
  height: 2vh;
  margin-left: 2vw;
  margin-right: 2vw;
`;
const NetworkName = styled(LightText)``;
const VerifyButton = styled(Button)`
  height: 2vh;
  width: 4vw;
  margin-right: 2vw;
`;

const CheckImg = styled.img`
  margin-left: 3vw;
  margin-right: 1vw;
`;
const CheckText = styled(LightText)`
  font-size: 1.5vh;
  text-align: left;
`;
const USDTText = styled(LightText)`
  margin-left: 2vw;
  margin-right: 2vw;
`;

const web3 = new Web3(window.ethereum);

const stableCoinPoolContractAddress = address.stableCoinPool;
const stableCoinPoolContractABI = stableCoinPoolJSON.output.abi;
const testUSDTABI = testUSDTJSON.output.abi;
const testUSDTAddress = address.testUSDT;
const stableCoinPoolContract = new web3.eth.Contract(
  stableCoinPoolContractABI,
  stableCoinPoolContractAddress
);
const testUSDTContract = new web3.eth.Contract(testUSDTABI, testUSDTAddress);

const goerliProvider = process.env.REACT_APP_GOERLI_RPC_URL;
const web3Provider = new Web3.providers.HttpProvider(goerliProvider);
const goerliWeb3 = new Web3(web3Provider);

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

const ApplyForm = ({ openModal }) => {
  const [stableCoinAmount, setStableCoinAmount] = useState(0);
  const [validatorAddress, setValidatorAddress] = useState(null);

  const [secondMessage, setSecondMessage] = useState(false);
  const [thirdMessage, setThirdMessage] = useState(false);
  const [verifying, setVerifying] = useState(0);

  const networkNameRedux = useSelector(selectNetworkName);
  const networkIdRedux = useSelector(selectNetworkId);

  const dispatch = useDispatch();
  //console.log(dispatch(setStakeAmount(event.target.value)));
  dispatch(resetPageNumber());

  const handleStableCoinAmountChange = (event) => {
    setStableCoinAmount(event.target.value);
  };
  const handleValidatorAddressChange = (event) => {
    setValidatorAddress(event.target.value);
  };
  // const retryCheck = async () => {
  //   setTimeout(async () => {
  //     const checkValidatorAddress = await evmosLiquidStakingContract.methods
  //       .validatorAddresses(validatorAddress)
  //       .call()
  //       .catch((err) => {
  //         console.log(err.message);
  //       })
  //       .then(async function (receipt) {
  //         console.log("check result: ", receipt);
  //         if (receipt == 0) {
  //           // invalid validator address

  //         } else if (receipt == 1) {
  //           //send stable coin
  //           const value = stableCoinAmount;
  //           const number = await web3.utils.toBN(value * 10 ** 18);
  //           console.log("value: ", number);
  //           ValidatorApplication(validatorAddress, number);
  //         }
  //       });
  //   }, 10000);
  // };
  const ValidatorApplication = async (validatorAddress, amount) => {
    SwitchNetwork(5).then(async () => {
      const getAccount = await web3.eth.getAccounts();
      console.log(validatorAddress, amount);
      console.log(await testUSDTContract.methods);

      const approve = await testUSDTContract.methods
        .approve(stableCoinPoolContractAddress, amount)
        .send({ from: getAccount[0] })
        .then((result) => {
          console.log(result);
        });

      const receive = await stableCoinPoolContract.methods
        .receiveStableToken(amount, validatorAddress)
        .send({ from: getAccount[0] })
        .then((result) => {
          console.log(result);
          dispatch(setValidatorAddress(validatorAddress));
          dispatch(setStableCoinAmount(stableCoinAmount));
          openModal();
        });
    });
  };

  const verifyValidatorAddress = async (liquidStakingContract) => {
    const getAccount = await web3.eth.getAccounts();
    const account = getAccount[0];
    const id = toast.loading("Verifying Validator Address..");
    console.log(account);
    const addValidatorAddress = await liquidStakingContract.methods
      .addValidatorAddress(validatorAddress)
      .send({ from: account })
      .catch((err) => {
        console.log(err.message);
        return;
      })
      .then(function (receipt) {
        console.log("receipt: ", receipt);
      })
      // check if it is right address
      .then(async () => {
        // 10초 간격으로 세 번 반복
        for (let i = 0; i < 3; i++) {
          setTimeout(async () => {
            const checkValidatorAddress = await liquidStakingContract.methods
              .validatorAddresses(validatorAddress)
              .call()
              .catch((err) => {
                console.log(err.message);
              })
              .then(async function (receipt) {
                console.log("check result: ", receipt);
                if (receipt == 0) {
                  //retry
                  console.log("Retry");
                  if (i == 2) {
                    toast.update(id, {
                      render: "Invalid Address. Please Try again",
                      type: "error",
                      isLoading: false,
                      autoClose: 1000,
                    });
                    setVerifying(0);
                  }
                } else if (receipt == 1) {
                  //send stable coin
                  setVerifying(2);
                  toast.update(id, {
                    render: "Address Verified!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                  });
                  const value = stableCoinAmount;
                  const number = await web3.utils.toBN(value * 10 ** 18);
                  console.log("value: ", number);

                  setSecondMessage(true);
                  dispatch(increasePageNumber());
                  SwitchNetwork(5).then(() => {
                    setThirdMessage(true);
                  });
                }
              });
          }, 10000 * (i + 1));
        }
      });
  };

  const Verifying = () => {
    if (verifying == 0) {
      return <>Verify</>;
    } else if (verifying == 1) {
      return <>Verifying</>;
    } else if (verifying == 2) {
      return <>Verified</>;
    }
  };

  //evmosvaloper142uggw2c6vp80t50c5wwg38qkrl9f5lqdvc92w
  return (
    <ValidatorApplicationWrapper>
      <ToastContainer />
      <Title>Apply as Validator</Title>
      <SubTitle>Application process</SubTitle>
      <Line></Line>
      <Step1Wrapper>
        <CheckWrapper>
          <CheckImg src={!secondMessage ? CheckFalse : CheckTrue}></CheckImg>
          <CheckText>
            Input validator’s address to enroll and verify <br />
            after checking network & your wallet address currently you’ve
            connected.
          </CheckText>
        </CheckWrapper>
        <InputWrapper>
          <ValidatorInput
            placeholder="Place Validator Address Here     (ex)evmosvaloper..."
            type="text"
            onChange={handleValidatorAddressChange}
          ></ValidatorInput>
          <NetworkWrapper>
            <NetworkName>{networkNameRedux}</NetworkName>
          </NetworkWrapper>
          <VerifyButton
            onClick={async () => {
              setVerifying(1);
              SwitchNetwork(9000).then(async () => {
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
                verifyValidatorAddress(liquidStakingContract);
              });
            }}
          >
            {Verifying()}
          </VerifyButton>
        </InputWrapper>
      </Step1Wrapper>
      {secondMessage ? (
        <Step2Wrapper>
          <CheckWrapper>
            <CheckImg src={!thirdMessage ? CheckFalse : CheckTrue}></CheckImg>
            <CheckText>Switching Network</CheckText>
          </CheckWrapper>
          {/* <SwitchNetworkButton>Switch Network to Ethereum</SwitchNetworkButton> */}
        </Step2Wrapper>
      ) : (
        <></>
      )}
      {thirdMessage ? (
        <Step3Wrapper>
          <CheckWrapper>
            <CheckImg src={CheckFalse}></CheckImg>
            <CheckText>Provide Stable Coin into the pool </CheckText>
          </CheckWrapper>
          <InputWrapper>
            <AmountInput onChange={handleStableCoinAmountChange}></AmountInput>
            <USDTText>USDT</USDTText>
            <VerifyButton
              onClick={async () => {
                const value = stableCoinAmount;
                const number = await web3.utils.toBN(value * 10 ** 18);
                console.log("value: ", number);
                dispatch(increasePageNumber());
                ValidatorApplication(validatorAddress, number);
              }}
            >
              Send
            </VerifyButton>
          </InputWrapper>
        </Step3Wrapper>
      ) : (
        <></>
      )}
    </ValidatorApplicationWrapper>
  );
};

export default ApplyForm;
