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
import { LightText } from "../../../styles/styledComponents/lightText";
import SwitchNetwork from "../../functions/switchNetwork";
import MetamaskLogo from "../../../assets/images/metamask_logo.svg";
import Web3 from "web3";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WalletInfoWrapper = styled.div``;
const FirstText = styled(BoldText)`
  text-align: left;
`;
const ListContainer = styled.div`
  display: flex;
`;
const Logo = styled.img``;
const WalletContainer = styled.div``;
const WalletText = styled(LightText)``;
const DisconnectButton = styled(Button)`
  width: 100%;
`;

const web3 = new Web3(window.ethereum);
const WalletInfoPopup = ({ routePage, closeModal }) => {
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };
  const [account, setAccount] = useState();

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <WalletInfoWrapper>
      <FirstText>Wallet</FirstText>
      <ListContainer>
        <Logo src={MetamaskLogo}></Logo>
        <WalletContainer>
          <WalletText>{account}</WalletText>
        </WalletContainer>
      </ListContainer>
      <DisconnectButton
        onClick={async () => {
          window.localStorage.setItem("connectMetamask", false);
          window.location.reload();
          console.log(window.localStorage.getItem("connectMetamask"));
          //routeMain();
        }}
      >
        Disconnect
      </DisconnectButton>
    </WalletInfoWrapper>
  );
};

export default WalletInfoPopup;
