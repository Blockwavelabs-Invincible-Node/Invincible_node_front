import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { Button } from "../../styles/styledComponents/button";
import logo from "../../assets/images/Logo.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectConnectMetamask } from "../../redux/reducers/connectMetamaskReducer";
import { setStatus } from "../../redux/reducers/connectMetamaskReducer";
import Dropdown from "react-bootstrap/Dropdown";
import ConnectToMetamask from "../functions/connectMetamask";
import ValidatorApplication from "../functions/validatorApplication";
import "./header.css";
import SwitchNetwork from "../functions/switchNetwork";
import Menu from "./components/menu";
import HeaderModal from "./headerModal";
import { selectNetworkName } from "../../redux/reducers/networkReducer";
import { BoldText } from "../../styles/styledComponents/boldText";
//--------------------Styles--------------------------//

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 5vw;
  padding-right: 5vw;
`;
const LeftTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightTop = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

  /* white-space: nowrap; */
`;
const WalletConnect = styled.div`
  color: #146dd8;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
`;
const WalletAddress = styled.div`
  display: flex;
  height: 30px;
  background-color: #f1f1f1;
  margin-left: 10px;
  /* border: 1px solid #146dd8; */
  border-radius: 5px;
  padding-left: 3vw;
  padding-right: 3vw;
  /* justify-content: center; */
  align-items: center;
`;
const WalletAddressText = styled.div`
  color: #146dd8;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  /* text-align: center; */
`;
const Logo = styled.img`
  width: 25px;
  margin-right: 1vw;
`;
const UnstakeButton = styled.button`
  font-size: 15px;
  height: 55px;
  padding-left: 3vw;
  padding-right: 3vw;
  border-radius: 5px;
  font-family: Pretendard;
  font-weight: 700;
  border: hidden;
  background-color: transparent;
  color: #ffffff;
`;
const HomeButton = styled.button`
  font-size: 20px;
  width: 120px;
  border-radius: 5px;
  font-family: pretendard;
  font-weight: 700;
`;
const StyledDropdown = styled(Dropdown)`
  font-size: 15px;
  height: 55px;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-top: 20px;
  border-radius: 5px;
  font-family: Pretendard;
  font-weight: 700;
  border: hidden;
  background-color: transparent;
  color: #ffffff;
`;
const StyledDropdownButton = styled(Dropdown.Toggle)`
  color: white;
  border: hidden;
  background-color: transparent;
  font-size: 15px;
  padding-left: 3vw;
  padding-right: 3vw;
  border-radius: 5px;
  font-family: Pretendard;
  font-weight: 700;
`;
const StyledDropdownItem = styled(Dropdown.Item)`
  color: white;
  text-align: left;
`;
const StyledDropdownMenu = styled(Dropdown.Menu)`
  display: flex;
  flex-direction: column;
`;
const NetworkButton = styled(Button)`
  width: 160px;
  height: 30px;
  font-size: 13px;
`;
const MyPageButton = styled(Button)`
  width: 160px;
  height: 30px;
  margin-right: 10px;
  background-color: #333333;
`;
const InvincibleNodeText = styled(BoldText)`
  color: #fdf5e9;
  font-size: 25px;
  text-align: left;
`;
//--------------------------------------------------------------//

const web3 = new Web3(window.ethereum);

function Header({ launchedApp }) {
  const [account, setAccount] = useState();
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState();

  const networkNameRedux = useSelector(selectNetworkName);

  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };
  const routeValidatorApplication = () => {
    let path = "/validator-application";
    navigate(path);
  };
  const routeMyPage = () => {
    let path = "/my-page";
    navigate(path);
  };

  const getWeb3 = async () => {
    if (window.localStorage.getItem("connectMetamask")) {
      const web3 = new Web3(window.ethereum);
      try {
        const getaccount = await web3.eth.getAccounts();
        setAccount(getaccount[0].slice(0, 10));
        console.log("getaccount[0] :", getaccount[0]);
      } catch (error) {
        return error;
      }
    } else {
      console.log("not connected");
    }
  };

  const apply = async () => {};

  const checkNetwork = async () => {
    // goerli testnet network id
    const properNetworkId = "5";
    const netId = await web3.eth.net.getId().then((networkId) => {
      if (networkId != properNetworkId) {
        alert("Switch network to goerli testnet");
        SwitchNetwork(properNetworkId).then(() => {
          routeValidatorApplication();
        });
      } else {
        console.log(networkId, properNetworkId, networkId == properNetworkId);
        routeValidatorApplication();
      }
    });
    // console.log("netID: ", netId);
  };

  const [showModal, setShowModal] = useState(false);

  // Use Effect
  useEffect(() => {
    getWeb3();
    // window.localStorage.removeItem("connectMetamask");
  }, []);

  console.log("launched: ", launchedApp);

  return (
    <>
      {showModal && (
        <HeaderModal
          closeModal={() => {
            setShowModal(false);
          }}
          visible={showModal}
          modalType={modalType}
        />
      )}
      <Top>
        <LeftTop>
          <Logo
            src={logo}
            onClick={() => {
              routeMain();
            }}
          ></Logo>
          <InvincibleNodeText>Invincible Node</InvincibleNodeText>
        </LeftTop>

        <RightTop>
          <>
            {launchedApp ? (
              <>
                {/* <MyPageButton
                  onClick={() => {
                    routeMyPage();
                  }}
                >
                  My Page
                </MyPageButton> */}
                <NetworkButton
                  onClick={() => {
                    setModalType(0);
                    setShowModal(true);
                  }}
                >
                  {networkNameRedux}
                </NetworkButton>
              </>
            ) : (
              <></>
            )}
          </>
          {window.localStorage.getItem("connectMetamask") == "true" &&
          account ? (
            <WalletAddress>
              <WalletAddressText
                onClick={() => {
                  setModalType(1);
                  setShowModal(true);
                  console.log(window.localStorage.getItem("connectMetamask"));
                }}
              >
                {account} ...
              </WalletAddressText>
            </WalletAddress>
          ) : (
            <WalletAddress>
              <WalletConnect
                onClick={() => {
                  ConnectToMetamask();
                }}
              >
                Connect Wallet
              </WalletConnect>
            </WalletAddress>
          )}
        </RightTop>
      </Top>
    </>
  );
}
export default Header;
