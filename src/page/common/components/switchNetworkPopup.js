import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectNetworkId,
  selectNetworkName,
  setNetworkId,
  setNetworkName,
  setTokenName,
} from "../../../redux/reducers/networkReducer";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import SwitchNetwork from "../../functions/switchNetwork";
import polygonEnabled from "../../../assets/images/polygonEnabled.svg";
import polygonDisabled from "../../../assets/images/polygonDisabled.svg";
import klaytnEnabled from "../../../assets/images/klaytnEnabled.svg";
import klaytnDisabled from "../../../assets/images/klaytnDisabled.svg";
import evmosEnabled from "../../../assets/images/evmosEnabled.svg";
import evmosDisabled from "../../../assets/images/evmosDisabled.svg";
import dydxEnabled from "../../../assets/images/dydxEnabled.svg";
import dydxDisabled from "../../../assets/images/dydxDisabled.svg";

const SwitchNetworkWrapper = styled.div``;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2vh;
`;
const FirstText = styled(BoldText)`
  /* margin-bottom: 2vh; */
`;
const NetworkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ComponentWrapper = styled.div`
  width: 50vw;
  height: 25vh;
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
  padding: 2vh;
  background-color: #232323;
  border-radius: 5px;
`;
const LeftBoxWrapper = styled.div`
  width: 10vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5vh;
  background-color: #1a1a1a;
  border-radius: 5px;
`;
const TextBox = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 12px;
`;
const TextBoxSmall = styled.div`
  margin-top: 1vh;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
`;
const NetworkBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
const NetworkComponent = styled.div`
  display: flex;
  align-items: flex-end;
  width: 10vw;
  padding-left: 2vw;
  padding-right: 2vw;
  /* background-color: ${(props) => (props.selected ? "red" : "none")}; */
`;
const NetworkLogo = styled.img`
  width: 100%;
  height: 100%;
`;
const ConfirmButton = styled(Button)`
  width: 100%;
  margin-top: 2vh;
  border-radius: 5px;
`;

const SwitchNetworkPopup = ({ routePage, closeModal }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [firstNetwork, setFirstNetwork] = useState(false);
  const [secondNetwork, setSecondNetwork] = useState(false);
  const [thirdNetwork, setThirdNetwork] = useState(false);
  const dispatch = useDispatch();
  const networkIdRedux = useSelector(selectNetworkId);
  const networkNameRedux = useSelector(selectNetworkName);

  const selectNetwork = () => {
    if (selectedNetwork == 1) {
      //evmos testnet
      SwitchNetwork(9000)
        .then(() => {
          console.log("Connected to Evmos Testnet");
          dispatch(setNetworkId(9000));
          dispatch(setNetworkName("Evmos"));
          dispatch(setTokenName("Evmos"));
          routePage();
          closeModal();
        })
        .then(() => {
          window.location.reload();
        });
    } else if (selectedNetwork == 2) {
      //mumbai
      SwitchNetwork(80001)
        .then(() => {
          console.log("Connected to Mumbai");
          dispatch(setNetworkId(80001));
          dispatch(setNetworkName("Polygon"));
          dispatch(setTokenName("Matic"));
          routePage();
          closeModal();
        })
        .then(() => {
          window.location.reload();
        });
    } else if (selectedNetwork == 3) {
      // kava testnet
      SwitchNetwork(2221)
        .then(() => {
          console.log("Connected to Kava EVM Testnet");
          dispatch(setNetworkId(2221));
          dispatch(setNetworkName("Kava"));
          dispatch(setTokenName("Kava"));
          routePage();
          closeModal();
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <SwitchNetworkWrapper>
      <TitleWrapper>
        <FirstText>Wanna switch?</FirstText>
        <FirstText>Please select network to switch</FirstText>
      </TitleWrapper>
      <ComponentWrapper>
        <LeftBoxWrapper>
          <TextBox>From</TextBox>
          <TextBoxSmall>Current Network</TextBoxSmall>
        </LeftBoxWrapper>
        <NetworkBox>
          <NetworkComponent>{networkNameRedux}</NetworkComponent>
        </NetworkBox>
      </ComponentWrapper>
      <ComponentWrapper>
        <LeftBoxWrapper>
          <TextBox>To</TextBox>
          <TextBoxSmall>Network to change</TextBoxSmall>
        </LeftBoxWrapper>

        <NetworkBox>
          <NetworkComponent
            selected={firstNetwork}
            onClick={() => {
              setFirstNetwork(true);
              setSecondNetwork(false);
              setThirdNetwork(false);
              setSelectedNetwork(1);
            }}
          >
            <NetworkLogo src={firstNetwork ? evmosEnabled : evmosDisabled} />
          </NetworkComponent>

          <NetworkComponent
            selected={secondNetwork}
            onClick={() => {
              setSecondNetwork(true);
              setFirstNetwork(false);
              setThirdNetwork(false);
              setSelectedNetwork(2);
            }}
          >
            <NetworkLogo src={secondNetwork ? klaytnEnabled : klaytnDisabled} />
          </NetworkComponent>

          <NetworkComponent
            selected={thirdNetwork}
            onClick={() => {
              setSecondNetwork(false);
              setFirstNetwork(false);
              setThirdNetwork(true);
              setSelectedNetwork(3);
            }}
          >
            <NetworkLogo
              src={thirdNetwork ? polygonEnabled : polygonDisabled}
            />
          </NetworkComponent>
        </NetworkBox>
      </ComponentWrapper>
      <ConfirmButton
        onClick={() => {
          selectNetwork();
        }}
      >
        Confirm
      </ConfirmButton>
    </SwitchNetworkWrapper>
  );
};

export default SwitchNetworkPopup;
