import { useEffect } from "react";
import { First } from "react-bootstrap/esm/PageItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectModalPageNumber } from "../../../redux/reducers/modalPageNumberReducer";
import { selectNetworkName } from "../../../redux/reducers/networkReducer";
import {
  selectStableCoinAmount,
  selectValidatorAddress,
  setStableCoinAmount,
  setValidatorAddress,
} from "../../../redux/reducers/validatorApplicationReducer";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import { Wrapper } from "../../../styles/styledComponents/wrapper";

const SuccessWrapper = styled.div`
  text-align: left;
`;
const FirstText = styled(BoldText)``;
const SecondText = styled(LightText)`
  font-size: 1vh;
  margin-bottom: 2vh;
`;
const ConfirmButton = styled(Button)`
  width: 80%;
  margin: auto;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
`;
const InfoText = styled(LightText)`
  font-size: 1.2vh;
  margin-top: 1vh;
`;
const InfoBox = styled.div`
  background-color: #1b1b1b;
  border-radius: 5px;
  width: 18vw;
  height: 3vh;
  text-align: center;
  margin-left: 2vw;
`;
const ComponentText = styled(LightText)`
  font-size: 1.2vh;
  margin-top: 1vh;
`;
const ModalComponent = () => {
  const validatorAddressRedux = useSelector(selectValidatorAddress);
  const stableCoinAmountRedux = useSelector(selectStableCoinAmount);
  console.log(validatorAddressRedux, stableCoinAmountRedux);
  // const modalPageNumberRedux = useSelector(selectModalPageNumber);

  // function Component() {
  //     if (modalPageNumberRedux == 0) {
  //         return (
  //             <>
  //                 <h2>Verifying Validator Address...</h2>
  //             </>
  //         )
  //     }
  //     else if (modalPageNumberRedux == 1) {
  //         return (
  //             <>
  //                 <h2>Sending Stable Coin to the Contract..</h2>
  //             </>
  //         )
  //     }
  //     else if (modalPageNumberRedux == 2) {
  //         return (
  //             <>
  //                 <h2>Sending Stable Coin to the Contract..</h2>
  //                 <h2>Approving...</h2>
  //             </>
  //         )
  //     }
  //     else if (modalPageNumberRedux == 3) {
  //         return (
  //             <>
  //                 <h2>Sending Stable Coin to the Contract..</h2>
  //                 <h2>Approving... Complete</h2>
  //                 <h2>Sending...</h2>
  //             </>
  //         )
  //     }
  //     else if (modalPageNumberRedux == 4) {
  //         return (
  //             <>
  //                 <h2>Sending Stable Coin to the Contract..</h2>
  //                 <h2>Approving... Complete</h2>
  //                 <h2>Sending... Complete</h2>
  //             </>
  //         )
  //     }
  //     else if (modalPageNumberRedux == 5) {
  //         return (
  //             <>
  //                 <h2>Successfully Added Validator!</h2>
  //                 <ConfirmButton>Confirm</ConfirmButton>
  //             </>
  //         )
  //     }
  //}
  //   console.log("modal page: ", modalPageNumberRedux);
  const networkNameRedux = useSelector(selectNetworkName);

  let navigate = useNavigate();
  const routeValidators = () => {
    let path = "/validators";
    navigate(path);
  };
  return (
    <SuccessWrapper>
      <FirstText>Successfully Registered!</FirstText>
      <SecondText>
        All steps completed, Your validator is listed on the INVI’s validator
        list.
      </SecondText>
      <InfoWrapper>
        <InfoText>Validator Address</InfoText>
        <InfoBox>
          <ComponentText>{validatorAddressRedux}</ComponentText>
        </InfoBox>
      </InfoWrapper>
      <InfoWrapper>
        <InfoText>Registered Network</InfoText>
        <InfoBox>
          <ComponentText>{networkNameRedux}</ComponentText>
        </InfoBox>
      </InfoWrapper>
      <InfoWrapper>
        <InfoText>You Provided</InfoText>
        <InfoBox>
          <ComponentText>{stableCoinAmountRedux}</ComponentText>
        </InfoBox>
      </InfoWrapper>
      <ConfirmButton
        onClick={() => {
          routeValidators();
        }}
      >
        Jump into validator list
      </ConfirmButton>
    </SuccessWrapper>
  );
};

export default ModalComponent;
