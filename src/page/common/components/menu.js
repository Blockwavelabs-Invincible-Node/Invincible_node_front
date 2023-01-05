import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Button } from "../../../styles/styledComponents/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Web3 from "web3";
import { selectNetworkName } from "../../../redux/reducers/networkReducer";
import SwitchNetwork from "../../functions/switchNetwork";
import StakingIcon from "../../../assets/images/stakingIcon.svg";
import TransactionIcon from "../../../assets/images/transactionIcon.svg";
import ValidatorIcon from "../../../assets/images/validatorIcon.svg";
import ContractIcon from "../../../assets/images/contractIcon.svg";

const StyledDropdown = styled(Dropdown)`
  font-size: 15px;
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
  font-size: 0.8vw;
  border-radius: 5px;
  font-family: Pretendard;
  font-weight: 700;
  display: flex;
  margin-top: 3vh;
  z-index: 2;
  align-items: center;
`;
const StyledDropdownItem = styled(Dropdown.Item)`
  color: white;
  font-size: 0.8vw;
  text-align: left;
  text-decoration: none;
  z-index: 1;
`;
const StyledDropdownMenu = styled(Dropdown.Menu)`
  /* display: flex;
  flex-direction: column; */
  margin-left: 2vw;
  /* margin-top: 0.5vh; */
  height: 50px;
  z-index: 2;
`;

// const ApplyButton = styled.button`
//   font-size: 15px;
//   height: 55px;
//   padding-left: 3vw;
//   padding-right: 3vw;
//   border-radius: 5px;
//   font-family: Pretendard;
//   font-weight: 700;
//   border: hidden;
//   background-color: transparent;
//   color: #ffffff;
// `;

const Logo = styled.img`
  margin-right: 5px;
`;

const NetworkButton = styled(Button)``;

const web3 = new Web3(window.ethereum);

const Menu = () => {
  const [eventMenuState, setEventMenuState] = useState(false);
  const [infoMenuState, setInfoMenuState] = useState(false);
  const [validatorMenuState, setValidatorMenuState] = useState(false);

  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };
  const routeUnstake = () => {
    let path = `/unstake`;
    navigate(path);
  };
  const routeClaimReward = () => {
    let path = "/claim";
    navigate(path);
  };
  const routeContract = () => {
    let path = "/contracts";
    navigate(path);
  };
  const routeTransaction = () => {
    let path = "/transactions";
    navigate(path);
  };
  const routeValidator = () => {
    let path = "/validators";
    navigate(path);
  };
  const routeValidatorApplication = () => {
    let path = "/validator-application";
    navigate(path);
  };

  const networkNameRedux = useSelector(selectNetworkName);

  const checkNetwork = async () => {
    // goerli testnet network id
    const properNetworkId = "9000";
    const netId = await web3.eth.net.getId().then((networkId) => {
      if (networkId != properNetworkId) {
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

  return (
    <>
      <StyledDropdown>
        <StyledDropdownButton variant="success" id="dropdown-basic">
          <Logo src={StakingIcon}></Logo>
          <div
            onClick={() => {
              if (eventMenuState) {
                setEventMenuState(false);
                console.log(eventMenuState);
              } else {
                setEventMenuState(true);
                // setValidatorMenuState(false);
                console.log(eventMenuState);
              }
            }}
          >
            Event
          </div>
        </StyledDropdownButton>
        <StyledDropdownMenu>
          <div
            style={{
              visibility: eventMenuState ? "visible" : "hidden",
              display: eventMenuState ? "" : "none",
              marginBottom: eventMenuState ? "100px" : "hidden",
            }}
          >
            <StyledDropdownItem>
              <div
                onClick={() => {
                  routeStake();
                }}
              >
                Stake
              </div>
            </StyledDropdownItem>
            <StyledDropdownItem>
              <div
                onClick={() => {
                  routeUnstake();
                }}
              >
                Unstake
              </div>
            </StyledDropdownItem>
            <StyledDropdownItem>
              <div
                onClick={() => {
                  routeClaimReward();
                }}
              >
                Claim Rewards
              </div>
            </StyledDropdownItem>
          </div>
        </StyledDropdownMenu>
      </StyledDropdown>

      <StyledDropdownButton
        variant="success"
        id="dropdown-basic"
        style={{
          marginTop: eventMenuState ? "80px" : "",
        }}
      >
        <Logo src={TransactionIcon}></Logo>
        <div
          onClick={() => {
            if (infoMenuState) {
              setInfoMenuState(false);
            } else {
              setInfoMenuState(true);
            }
            routeTransaction();
          }}
        >
          Transaction
        </div>
      </StyledDropdownButton>
      <StyledDropdownButton variant="success" id="dropdown-basic">
        <Logo src={ContractIcon}></Logo>
        <div
          onClick={() => {
            if (infoMenuState) {
              setInfoMenuState(false);
            } else {
              setInfoMenuState(true);
            }
            routeContract();
          }}
        >
          Contracts
        </div>
      </StyledDropdownButton>
      {/* <StyledDropdown>
        <StyledDropdownButton variant="success" id="dropdown-basic">
          <Logo src={TransactionIcon}></Logo>
          <div
            onClick={() => {
              if (infoMenuState) {
                setInfoMenuState(false);
              } else {
                setInfoMenuState(true);
              }
            }}
          >
            Info
          </div>
        </StyledDropdownButton>
        <StyledDropdownMenu>
          <div
            style={{
              visibility: infoMenuState ? "visible" : "hidden",
            }}
          >
            <StyledDropdownItem>
              <div
                onClick={() => {
                  routeContract();
                }}
              >
                Contracts
              </div>
            </StyledDropdownItem>
            <StyledDropdownItem>
              <div
                onClick={() => {
                  routeTransaction();
                }}
              >
                Transactions
              </div>
            </StyledDropdownItem>
          </div>
        </StyledDropdownMenu>
      </StyledDropdown> */}

      <StyledDropdown>
        <StyledDropdownButton variant="success" id="dropdown-basic">
          <Logo src={ValidatorIcon}></Logo>
          <div
            onClick={() => {
              if (validatorMenuState) {
                setValidatorMenuState(false);
              } else {
                setValidatorMenuState(true);
                // setEventMenuState(false);
              }
            }}
          >
            Validator
          </div>
        </StyledDropdownButton>
        <StyledDropdownMenu>
          <div
            style={{
              visibility: validatorMenuState ? "visible" : "hidden",
            }}
          >
            <StyledDropdownItem>
              <div
                onClick={() => {
                  routeValidator();
                }}
              >
                Validator Info
              </div>
            </StyledDropdownItem>
            <StyledDropdownItem>
              <div
                onClick={async () => {
                  const check = await checkNetwork();
                }}
              >
                Apply as Validator
              </div>
            </StyledDropdownItem>
          </div>
        </StyledDropdownMenu>
      </StyledDropdown>
    </>
  );
};

export default Menu;
