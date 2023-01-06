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
import kavaEnabled from "../../../assets/images/kavaEnabled.svg";
import kavaDisabled from "../../../assets/images/kavaDisabled.svg";

const SwitchNetworkWrapper = styled.div`
  width: 30vw;
  margin: auto;
  /* height: 33vh; */
  display: flex;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 21px;
`;
const FirstText = styled(BoldText)`
  font-size: 20px;
`;
const ComponentWrapper = styled.div`
  /* width: 420px;
  height: 100px; */
  display: flex;
  /* justify-content: center; */
  padding: 7px;
  background-color: #232323;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const LeftBoxWrapper = styled.div`
  width: 5vw;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5vh;
  background-color: #1a1a1a;
  border-radius: 5px;
`;
const TextBox = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-align: left;
`;
const TextBoxSmall = styled.div`
  font-size: 15px;
  zoom: 0.6;
  font-weight: 500;
  text-align: left;
`;
const NetworkBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 10vh;
  padding: 6px;
`;
const NetworkComponent = styled.div`
  display: flex;
  align-items: flex-end;
  width: 10vw;
  padding-left: 2vw;
  padding-right: 2vw;
`;
const NetworkLogo = styled.img`
  width: 100%;
  height: 100%;
`;
const ConfirmButton = styled(Button)`
  width: 100%;
  height: 40px;
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
        <FirstText>Please select network to switch</FirstText>
      </TitleWrapper>
      <ComponentWrapper>
        <LeftBoxWrapper>
          <TextBox>From</TextBox>
          <TextBoxSmall>Current Network</TextBoxSmall>
        </LeftBoxWrapper>
        <NetworkBox>
          {networkNameRedux === "Evmos" ? (
            <NetworkComponent>
              <NetworkLogo src={evmosDisabled} />
            </NetworkComponent>
          ) : (
            ""
          )}

          {networkNameRedux === "Polygon" ? (
            <NetworkComponent>
              <NetworkLogo src={polygonDisabled} />
            </NetworkComponent>
          ) : (
            ""
          )}

          {networkNameRedux === "Kava" ? (
            <NetworkComponent>
              <NetworkLogo src={kavaDisabled} />
            </NetworkComponent>
          ) : (
            ""
          )}
        </NetworkBox>
      </ComponentWrapper>
      <ComponentWrapper>
        <LeftBoxWrapper>
          <TextBox>To</TextBox>
          <TextBoxSmall>Network to change</TextBoxSmall>
        </LeftBoxWrapper>
        <NetworkBox>
          {networkNameRedux === "Evmos" ? (
            ""
          ) : (
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
          )}

          {networkNameRedux === "Polygon" ? (
            ""
          ) : (
            <NetworkComponent
              selected={secondNetwork}
              onClick={() => {
                setSecondNetwork(true);
                setFirstNetwork(false);
                setThirdNetwork(false);
                setSelectedNetwork(2);
              }}
            >
              <NetworkLogo
                src={secondNetwork ? polygonEnabled : polygonDisabled}
              />
            </NetworkComponent>
          )}

          {networkNameRedux === "Kava" ? (
            ""
          ) : (
            <NetworkComponent
              selected={thirdNetwork}
              onClick={() => {
                setSecondNetwork(false);
                setFirstNetwork(false);
                setThirdNetwork(true);
                setSelectedNetwork(3);
              }}
            >
              <NetworkLogo src={thirdNetwork ? kavaEnabled : kavaDisabled} />
            </NetworkComponent>
          )}
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
