import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { BoldText } from "../../styles/styledComponents/boldText";
import Contract from "./components/contract";
import Base from "../common/base";


const PageContainer = styled.div`
  position: relative;
`;
const Loading = styled(BoldText)` 

`;
const web3 = new Web3(window.ethereum);

const ContractPage = () => {
    const [account, setAccount] = useState();
    let navigate = useNavigate();
    const routeMain = () => {
        let path = "/";
        navigate(path);
    };

   
    useEffect(()=> {
    
    }, []);
    return (
      <PageContainer>
        <Header home={0} launchedApp={1}></Header>
        <Base
          component={
            <Contract></Contract>
          }
        ></Base>
      </PageContainer>
    );
};

export default ContractPage;
