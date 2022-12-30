import { React, useState, useEffect } from "react";
import styled from "styled-components";
import contractAddress from "../../../addresses/contractAddress.json";
import threeImg from "../../../assets/images/threeGray.png";

import { NumberImg } from "../../../styles/styledComponents/numberImg";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { LightText } from "../../../styles/styledComponents/lightText";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import { Form } from "../../../styles/styledComponents/form";

const liquidStakingContractAddress = contractAddress.evmosLiquidStaking;
console.log("contract Addr: ", liquidStakingContractAddress);

//--------------------------style-----------------------------//
const SpecialFeatureWrapper = styled(Wrapper)``;
const SpecialFeatureForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: repeat(8, 1fr);
`;
const SpecialFeatureText = styled(BoldText)`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
`;
const HedgeAmountText = styled(LightText)`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 3;
`;
const ThreeImg = styled(NumberImg)`
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 4;
`;
const ExpectedAprBox = styled.div`
  background: #f1f1f1;
  border-radius: 5px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 8;
`;
const ExpectedAprText = styled.div`
  padding: 3% 3% 3% 3%;
`;

//--------------------------------------------------------------//

const SpecialFeature = () => {
  return (
    <div>
      <SpecialFeatureWrapper>
        <SpecialFeatureForm>
          <ThreeImg src={threeImg}></ThreeImg>
          <SpecialFeatureText>Special Feature</SpecialFeatureText>
          <HedgeAmountText>Hedge Amount</HedgeAmountText>
          <ExpectedAprBox>
            <ExpectedAprText>Established ratio for hedge</ExpectedAprText>
            <ExpectedAprText>Expected APR</ExpectedAprText>
          </ExpectedAprBox>
        </SpecialFeatureForm>
      </SpecialFeatureWrapper>
    </div>
  );
};

export default SpecialFeature;
