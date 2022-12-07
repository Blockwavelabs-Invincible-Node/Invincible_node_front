import { React } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlueButton } from "../../../styles/styledComponents/blueButton";

import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import { WhiteButton } from "../../../styles/styledComponents/whiteButton";

import Web3 from "web3";

//--------------------Styles--------------------------//

const HeaderWrapper = styled.div`
  text-align: left;
  padding: 100px 8vw;
//   margin-top: 100px;
//   margin-bottom: 100px;
//   margin-left: 5vw;
`;
const InvincibleNodeText = styled(BoldText)`
  color: #fdf5e9;
  font-size: 60px;
  //   margin-top: 30px;
  margin-bottom: 12px;
`;

const MainTitle = styled.div`
  color: #fdf5e9;
  font-family: Pretendard;
  font-size: 54px;
  font-weight: 900;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 12px;
`;
const MaximizeEarningText = styled(LightText)`
  color: #fdf5e9;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 64px;
  //   margin-top: 3vh;
`;

const Contact = styled(WhiteButton)`
  // width: 10vw;
  width: auto;
  padding-left: 3vw;
  padding-right: 3vw;
`;
const LaunchApp = styled(BlueButton)`
  // width: 10vw;
  width: auto;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-left: 3vw;
`;
//--------------------------------------------------------------//

const web3 = new Web3(window.ethereum);

function Title() {
  let navigate = useNavigate();
  const routeApp = () => {
    let path = `stake`;
    navigate(path);
  };

  const AddNetwork = async() => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ 
          chainId: web3.utils.toHex('9000'),
          chainName: 'Evmos',
          nativeCurrency: {
              name: 'tEVMOS',
              symbol: 'tEVMOS',
              decimals: 18
          },
          rpcUrls: ['https://eth.bd.evmos.dev:8545'],
          blockExplorerUrls: ['https://evm.evmos.dev']
      }],
  })
  .then(() => console.log('network added'))
  .catch(() => console.log('could not add network'))
  }

  const SwitchNetwork = async () => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex('9000') }],
    })
    .then(() => console.log('network has been set'))
    .catch((e) => {
        if (e.code === 4902) {
          console.log('network is not available, add it');
          AddNetwork();

        } else {
          console.log('could not set network')
        }
    })
  }

  const ConnectToMetamask = async () => {
    let returnValue =false;
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const yourNetworkId = '9000'
      const netId = await web3.eth.net.getId()
      .then((networkId) => {
        if (networkId != yourNetworkId) {
          // MetaMask network is wrong
          console.log('current net id: ', networkId);
          // set network
          returnValue = false;
          SwitchNetwork();
        }
        else {
          console.log("proper network. id: ", networkId);
          const account = web3.eth.accounts;
          //Get the current MetaMask selected/active wallet
          const walletAddress = account.givenProvider.selectedAddress;
          console.log(`Wallet Address: ${walletAddress}`);
          window.localStorage.setItem("connectMetamask", true);
          // window.location.reload();
          returnValue = true;
        }
      })
      .catch((err) => {
        // unable to retrieve network id
        console.log(err);
        returnValue = false;
      });
      console.log(returnValue);
      return returnValue;
    } 

    else {
      console.log("No wallet");
      return false;
    }
  };

  return (
    <>
      <HeaderWrapper>
        <MainTitle>Invincible Node</MainTitle>
        <MaximizeEarningText>Maximize Profit, Saving Value</MaximizeEarningText>
        <ButtonWrapper>
          <Contact>Contact us</Contact>
          <LaunchApp
            onClick={async() => {
              const connection = await ConnectToMetamask();
              if (connection) {
                routeApp();
              }
              else {
                alert("Change Network to begin");
              }
            }}
          >
            Launch App
          </LaunchApp>
        </ButtonWrapper>
      </HeaderWrapper>
    </>
  );
}
export default Title;
