import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import StakeInput from "../utils/stakeInput";

const SuccessWrapper = styled.div``;
const FirstText = styled(BoldText)`
  font-size: 30px;
  font-weight: 900;
  text-align: left;
  margin-bottom: 3px;
`;
const SecondText = styled(BoldText)`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
`;
const CurrentStatus = styled.div``;
const ConfirmButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
`;


const Success = ({ token, stakeAmount, getAmount }) => {
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <SuccessWrapper>
      <FirstText>Successful Transfer</FirstText>
      <SecondText>Current status</SecondText>
      <CurrentStatus></CurrentStatus>
      <StakeInput
        status={"success"}
        token={token}
        stakeAmount={stakeAmount}
        getAmount={getAmount}
      />
      <ConfirmButton onClick={() => { routeMain() }}>OK</ConfirmButton>
    </SuccessWrapper>
  );
};

export default Success;
