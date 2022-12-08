import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { Button } from "../../styles/styledComponents/button";
import logo from "../../assets/images/Logo.svg";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectConnectMetamask } from "../../redux/reducers/connectMetamaskReducer";
import { setStatus } from "../../redux/reducers/connectMetamaskReducer";
import Dropdown from 'react-bootstrap/Dropdown';
import "./header.css"
//--------------------Styles--------------------------//
const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 5vw;
  padding-right: 5vw;
`;
const LeftTop = styled.div``;
const RightTop = styled.div`
  display: flex;
  margin-top: 50px;
  white-space: nowrap;
`;
const WalletConnect = styled(Button)`
  width: auto;
  padding-left: 3vw;
  padding-right: 3vw;
`;
const WalletAddress = styled.div`
  display: flex;
  background-color: #f1f1f1;
  margin-left: 10px;
  border: 1px solid #146dd8;
  border-radius: 10px;
  padding-left: 3vw;
  padding-right: 3vw;
  align-items: center;
  height: 55px;
`;
const WalletAddressText = styled.div`
  color: #146dd8;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: center;
`;
const Logo = styled.img`
  margin-top: 50%;
  width: 97px;
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
color:white;
text-align: left;
`;
const StyledDropdownMenu = styled(Dropdown.Menu)` 
display: flex;
flex-direction: column;
`;
//--------------------------------------------------------------//

const web3 = new Web3(window.ethereum);

function Header({ home }) {
  const [account, setAccount] = useState();
  const dispatch = useDispatch();


  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };
  const routeStake = () => {
    let path = '/stake';
    navigate(path);
  }
  const routeUnstake = () => {
    let path = `/unstake`;
    navigate(path);
  };
  const routeClaimReward = () => {
    let path = "/claim";
    navigate(path);
  }
  const routeContract = () => {
    let path = "/contracts";
    navigate(path);
  }
  const routeTransaction = () => {
    let path = "/transactions";
    navigate(path);
  }
  const routeValidator = () => {
    let path = "/validators";
    navigate(path);
  } 

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
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const yourNetworkId = '9000'
      const netId = await web3.eth.net.getId()
      .then((networkId) => {
        if (networkId != yourNetworkId) {
          // MetaMask network is wrong
          console.log('current net id: ', networkId);
          // set network
          SwitchNetwork();
        }
        else {
          console.log("proper network. id: ", networkId);
          
        }
      })
      .catch((err) => {
        // unable to retrieve network id
        console.log(err);
      });

      const account = web3.eth.accounts;
      //Get the current MetaMask selected/active wallet
      const walletAddress = account.givenProvider.selectedAddress;
      console.log(`Wallet Address: ${walletAddress}`);
      console.log(dispatch(setStatus(true)));
      window.localStorage.setItem("connectMetamask", true);
      window.location.reload();
      return true;
    } else {
      console.log("No wallet");
      return false;
    }
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
  // Use Effect
  useEffect(() => {
    getWeb3();
    // window.localStorage.removeItem("connectMetamask");
  }, []);

  if (account == null) {
    return (
      <>
        <Top>
          <LeftTop>
            <Logo
              src={logo}
              onClick={() => {
                routeMain();
              }}
            />
          </LeftTop>
          <RightTop>
            {home ? (
              <HomeButton
                onClick={() => {
                  routeMain();
                }}
              >
                Main
              </HomeButton>
            ) : (
              <></>
            )}
            <WalletConnect
              onClick={() => {
                ConnectToMetamask();
              }}
            >
              Connect Wallet
            </WalletConnect>
          </RightTop>
        </Top>
      </>
    );
  }

  return (
    <>
      <Top>
        <LeftTop>
          <Logo
            src={logo}
            onClick={() => {
              routeMain();
            }}
          ></Logo>
        </LeftTop>
        <RightTop>
          {home ? (
            <HomeButton
              onClick={() => {
                routeMain();
              }}
            >
              Main
            </HomeButton>
          ) : (
            <>
            {/* <UnstakeButton
              onClick={() => {
                routeClaimReward();
              }}
            >
              Claim Reward
            </UnstakeButton>
            <UnstakeButton
              onClick={() => {
                routeUnstake();
              }}
            >
              Unstake
            </UnstakeButton>
            <UnstakeButton
              onClick={() => {
                routeTransaction();
              }}
            >
              Transactions
            </UnstakeButton> */}
            <StyledDropdown>
              <StyledDropdownButton variant="success" id="dropdown-basic">
                Event
              </StyledDropdownButton>
              <StyledDropdownMenu>
                <StyledDropdownItem><div onClick={() => {
                  routeStake();
                  }}
                >Stake</div></StyledDropdownItem>
                <StyledDropdownItem><div onClick={() => {
                  routeUnstake();
                  }}
                >Unstake</div></StyledDropdownItem>
                <StyledDropdownItem><div onClick={() => {
                  routeClaimReward();
                  }}
                >Claim Rewards</div></StyledDropdownItem>
              </StyledDropdownMenu>
            </StyledDropdown>
            <StyledDropdown>
              <StyledDropdownButton variant="success" id="dropdown-basic">
                Info
              </StyledDropdownButton>
              <StyledDropdownMenu>
                <StyledDropdownItem><div onClick={() => {
                  routeContract();
                  }}
                >Contracts</div></StyledDropdownItem>
                <StyledDropdownItem><div onClick={() => {
                  routeTransaction();
                  }}
                >Transactions</div></StyledDropdownItem>
                <StyledDropdownItem><div onClick={() => {
                  routeValidator();
                  }}
                >Validators</div></StyledDropdownItem>
              </StyledDropdownMenu>
            </StyledDropdown>
            </>
          )}
          {window.localStorage.getItem("connectMetamask") ? (
            <WalletAddress>
              <WalletAddressText>{account} ...</WalletAddressText>
            </WalletAddress>
          ) : (
            <WalletConnect
              onClick={() => {
                ConnectToMetamask();
              }}
            >
              Connect Wallet
            </WalletConnect>
          )}
        </RightTop>
      </Top>
    </>
  );
}
export default Header;
