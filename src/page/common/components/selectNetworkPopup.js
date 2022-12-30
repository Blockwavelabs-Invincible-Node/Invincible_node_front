import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  height: 250px;
`;
const FirstText = styled(BoldText)`
  font-size: 20px;
  text-align: left;
`;
const NetworkWrapper = styled.div`
  height: 8vh;
  display: flex;
  justify-content: center;
`;
const NetworkComponent = styled.div`
  padding-left: 1vw;
  padding-right: 1vw;
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

const SelectNetworkPopup = ({ routePage }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [firstNetwork, setFirstNetwork] = useState(false);
  const [secondNetwork, setSecondNetwork] = useState(false);
  const [thirdNetwork, setThirdNetwork] = useState(false);
  const dispatch = useDispatch();

  const selectNetwork = () => {
    const temp = () => {
      if (selectedNetwork == 1) {
        //evmos testnet
        SwitchNetwork(9000).then(() => {
          console.log("Connected to Evmos Testnet");
          dispatch(setNetworkId(9000));
          dispatch(setNetworkName("Evmos"));
          dispatch(setTokenName("Evmos"));
          routePage();
        });
      } else if (selectedNetwork == 2) {
        //mumbai
        SwitchNetwork(80001).then(() => {
          console.log("Connected to Mumbai");
          dispatch(setNetworkId(80001));
          dispatch(setNetworkName("Polygon"));
          dispatch(setTokenName("Matic"));
          routePage();
        });
      } else if (selectedNetwork == 3) {
        //kava testnet
        SwitchNetwork(2221).then(() => {
          console.log("Connected to kava testnet");
          dispatch(setNetworkId(2221));
          dispatch(setNetworkName("Kava"));
          dispatch(setTokenName("Kava"));
          routePage();
        });
      }
    };
    temp().then(() => {
      window.location.reload();
    });
  };

  return (
    <SwitchNetworkWrapper>
      <FirstText>Please Select network you will use</FirstText>
      <NetworkWrapper>
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
          <NetworkLogo src={secondNetwork ? polygonEnabled : polygonDisabled} />
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
          <NetworkLogo src={thirdNetwork ? kavaEnabled : kavaDisabled} />
        </NetworkComponent>
      </NetworkWrapper>
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

export default SelectNetworkPopup;
