import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { BoldText } from "../../styles/styledComponents/boldText";
import Base from "../common/base";
import Dashboard from "./components/dashboard";


const PageContainer = styled.div`
  position: relative;
`;
const Loading = styled(BoldText)` 

`;

const web3 = new Web3(window.ethereum);

const ValidatorPage = () => {
 
    return (
      <PageContainer>
        <Header home={0} launchedApp={1}></Header>
        <Base
            component={
                <Dashboard></Dashboard>  
            }>
        </Base>
      </PageContainer>
    );
};

export default ValidatorPage;
