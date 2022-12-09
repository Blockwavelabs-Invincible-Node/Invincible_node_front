import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { LightText } from "../../../styles/styledComponents/lightText";

const EvmosInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  align-items: center;
`;
const EvmosInput = styled(BasicInput)`
  width: 100%;
  margin-right: 13px;
  height: 20px;
  background-color: #292929;
  border-radius: 5px;
  border: hidden;
  color: #f1f1f1;
  text-align: right;
  padding-right: 10px;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 400;
  &: focus {
    outline: none;
  }
`;
const InEvmosAmount = styled(LightText)`
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
`;

const ResultContainer = styled.div`
  width: 100%;
  // max-width: 468px;
  margin: 0px auto;
  //   padding: 34px;
`;

const StakeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  // max-width: 400px;
  align-items: center;
`;
const YouWillStake = styled(LightText)`
  font-size: 13px;
  font-weight: 700;
`;
const GetWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
  // max-width: 400px;
  align-items: center;
`;
const StakeInputSimul = ({ token, stakeAmount, getAmount, availableRatio }) => {
  return (
    <>
      <ResultContainer>
        <StakeWrapper>
          <YouWillStake>You will get without risk hedge</YouWillStake>
          <EvmosInputWrapper>
            <EvmosInput value={getAmount} />
            <InEvmosAmount>in {token}</InEvmosAmount>
          </EvmosInputWrapper>
        </StakeWrapper>
        <StakeWrapper>
          <YouWillStake>If with risk hedge</YouWillStake>
          <EvmosInputWrapper>
            <EvmosInput value={getAmount} />
            <InEvmosAmount>in {token}</InEvmosAmount>
          </EvmosInputWrapper>
        </StakeWrapper>
        <StakeWrapper style={{ marginTop: "10px" }}>
          <YouWillStake>Available Ratio to Rish Hedge</YouWillStake>
          <InEvmosAmount>{availableRatio}%</InEvmosAmount>
        </StakeWrapper>
      </ResultContainer>
    </>
  );
};

export default StakeInputSimul;
