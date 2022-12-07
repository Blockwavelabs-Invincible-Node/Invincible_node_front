import styled from "styled-components";
import { BoldText } from "../../styles/styledComponents/boldText";
import { LightText } from "../../styles/styledComponents/lightText";
import useWindowDimensions from "../../utils/functions/useWindowDimensions";

const BaseWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 50px;
  padding-bottom: 50px;
`;
const TitleWrapper = styled.div`
  width: 30vw;
  height: 80vh;
`;

const FunctionWrapper = styled.div`
  //   width: 70vw;
  width: 100%;
  min-height: 80vh;
  padding-bottom: 50px;
  background: rgba(38, 38, 38, 0.95);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`;
const InvincibleNodeText = styled(BoldText)`
  color: #fdf5e9;
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 4px;
  text-align: left;
`;
const MaximizeEarningText = styled(LightText)`
  color: #fdf5e9;
  text-align: left;
  font-size: 15px;
`;

const Base = ({ component }) => {
  const { height, width } = useWindowDimensions();

  return (
    <BaseWrapper>
      {width > 1100 ? (
        <TitleWrapper>
          <InvincibleNodeText>Invincible Evmos</InvincibleNodeText>
          <MaximizeEarningText>
            Maximize Profit, Saving Value
          </MaximizeEarningText>
        </TitleWrapper>
      ) : (
        <></>
      )}
      <FunctionWrapper>{component}</FunctionWrapper>
    </BaseWrapper>
  );
};

export default Base;
