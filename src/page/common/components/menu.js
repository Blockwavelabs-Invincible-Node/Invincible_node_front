import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Web3 from "web3";
import SwitchNetwork from "../../functions/switchNetwork";

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
const ApplyButton = styled.button`
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

const web3 = new Web3(window.ethereum);

const Menu = () => {
    const [eventMenuState, setEventMenuState] = useState(false);
    const [infoMenuState, setInfoMenuState] = useState(false);
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
    const routeValidatorApplication = () => {
        let path = "/validator-application";
        navigate(path);
    }

    const checkNetwork = async() => {
        // goerli testnet network id
        const properNetworkId = '5'
        const netId = await web3.eth.net.getId()
        .then((networkId) => {
            if (networkId != properNetworkId) {
                alert("Switch network to goerli testnet");
                SwitchNetwork(properNetworkId)
                .then(() => {
                  routeValidatorApplication();
                })
            }
            else {
              console.log(networkId, properNetworkId, networkId == properNetworkId);
              routeValidatorApplication();
            }
        })
        // console.log("netID: ", netId);
    }

    return (
        <>  
            <ApplyButton
              onClick={async() => {
                const check = await checkNetwork()
              }}
            >
              Apply as Validator
            </ApplyButton>
      
            <StyledDropdown>
              <StyledDropdownButton variant="success" id="dropdown-basic">
                <div onClick={() => {
                    if (eventMenuState) {
                        setEventMenuState(false);
                        console.log(eventMenuState);
                    } else {
                        setEventMenuState(true);
                        console.log(eventMenuState);
                    }
                }}>Event</div>
              </StyledDropdownButton>
              <StyledDropdownMenu>
                <div style={{
                    visibility: eventMenuState ? "visible" : "hidden",
                }}>
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
                </div>
              </StyledDropdownMenu>
              
            </StyledDropdown>

            <StyledDropdown>
              <StyledDropdownButton variant="success" id="dropdown-basic">
                <div onClick={() => {
                    if (infoMenuState) {
                        setInfoMenuState(false);
                    } else {
                        setInfoMenuState(true);
                    }
                }}>Info</div>
              </StyledDropdownButton>
              <StyledDropdownMenu>
                <div style={{
                    visibility: infoMenuState ? "visible" : "hidden",
                }}>
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
                </div>
              </StyledDropdownMenu>
            </StyledDropdown>

        </>
    )
}

export default Menu;