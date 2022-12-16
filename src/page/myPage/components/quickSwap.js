import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import quickSwap from "../../../assets/images/quickSwap.png";
import { LightText } from "../../../styles/styledComponents/lightText";
import { BorderWrapper } from "../../../styles/styledComponents/borderWrapper";
import { BoldText } from "../../../styles/styledComponents/boldText";
import downArrow from "../../../assets/images/downArrow.png"

const AllWrapper = styled(BorderWrapper)`
    height: 500px;
`;
const QuickSwapText = styled(BoldText)` 
margin-left: 5%;
margin-top: 30px;
margin-bottom: 30px;
`;
const SwapWrapper = styled.div` 
text-align: center;

`;
const SwapInput = styled(BasicInput)` 
width: 40%;
`;
const GetInput = styled(BasicInput)` 
width: 40%;
`;
const QuickSwapImg = styled.img` 
width: 40%;
`;
const Text = styled(LightText)` 
text-align: left;
margin-left: 30%;
margin-bottom: 5px;
`;
const DownArrow = styled.img` 

`;

const QuickSwap = () => {

    return (
        <>
            <AllWrapper>
                <QuickSwapText>Quick Swap Right Here</QuickSwapText>
                <SwapWrapper>
                    <Text>You'll swap</Text>
                    <SwapInput></SwapInput><br />
                    <DownArrow src={downArrow}></DownArrow>
                    <Text>You'll get</Text>
                    <GetInput></GetInput><br />
                    {/* <QuickSwapImg src={quickSwap}></QuickSwapImg> */}
                </SwapWrapper>
            </AllWrapper>
        </>
    );
}

export default QuickSwap;