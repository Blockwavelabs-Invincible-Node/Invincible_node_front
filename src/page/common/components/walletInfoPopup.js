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
import { ToastContainer, toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";

const WalletInfoWrapper = styled.div``;
const FirstText = styled(BoldText)`
  text-align: left;
  margin-bottom: 1vh;
`;
const ListContainer = styled.div`
  display: flex;
`;
const Logo = styled.img``;
const WalletContainer = styled.div`
  margin-left: 1vw;
`;
const WalletText = styled(LightText)`
  font-size: 1.5vh;
  margin-bottom: 0.5vh;
`;
const WalletFunctionWrapper = styled.div`
  display: flex;
`;
const CopyText = styled(LightText)`
  margin-right: 1vw;
  font-size: 1.3vh;
`;
const ViewOnExplorerText = styled(LightText)`
  font-size: 1.3vh;
`;
const DisconnectButton = styled(Button)`
  width: 100%;
  margin-top: 3vh;
`;

const web3 = new Web3(window.ethereum);
const WalletInfoPopup = ({ routePage, closeModal }) => {
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };
  const [account, setAccount] = useState();

  const notify = () => {
    toast.success("Copied to ClipBoard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("notify");
  };

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <WalletInfoWrapper>
      <ToastContainer />
      <FirstText>Wallet</FirstText>
      <ListContainer>
        <Logo src={MetamaskLogo}></Logo>
        <WalletContainer>
          <WalletText>{account}</WalletText>
          <WalletFunctionWrapper>
            <CopyText
              onClick={() => {
                navigator.clipboard.writeText(account);
                console.log("Copied");
                notify();
              }}
            >
              Copy
            </CopyText>
            <ViewOnExplorerText>View on Explorer</ViewOnExplorerText>
          </WalletFunctionWrapper>
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
