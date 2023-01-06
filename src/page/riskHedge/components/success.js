import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import StakeInput from "../utils/stakeInput";

const SuccessWrapper = styled.div`
  width: 20vw;
`;
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
const CurrentStatus = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
`;
const ConfirmButton = styled(Button)`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
`;

const Success = ({ token, stakeAmount, getAmount }) => {
  let navigate = useNavigate();
  const routeStake = () => {
    let path = "/stake";
    navigate(path);
  };

  return (
    <SuccessWrapper>
      <FirstText>Successful Transfer</FirstText>
      <CurrentStatus>
        <StakeInput
          status={"success"}
          token={token}
          stakeAmount={stakeAmount}
          getAmount={getAmount}
        />
      </CurrentStatus>
      <ConfirmButton
        onClick={() => {
          routeStake();
        }}
      >
        OK
      </ConfirmButton>
    </SuccessWrapper>
  );
};

export default Success;
