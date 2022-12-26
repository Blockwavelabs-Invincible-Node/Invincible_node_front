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

const SwitchNetworkWrapper = styled.div``;
const FirstText = styled(BoldText)`
  margin-bottom: 2vh;
`;
const NetworkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const NetworkComponent = styled.div`
  padding-left: 2vw;
  padding-right: 2vw;
  background-color: ${(props) => (props.selected ? "red" : "none")};
`;
const ConfirmButton = styled(Button)`
  margin-top: 2vh;
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
      <FirstText>Select Your Network</FirstText>
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
          Evmos
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
          Polygon
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
          Kava
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
