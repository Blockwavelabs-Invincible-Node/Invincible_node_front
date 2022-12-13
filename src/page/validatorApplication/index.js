import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { BoldText } from "../../styles/styledComponents/boldText";
import ApplyForm from "./components/applyForm";
import SwitchNetwork from "../functions/switchNetwork";

const PageContainer = styled.div`
  position: relative;
`;
const Loading = styled(BoldText)` 

`;

const web3 = new Web3(window.ethereum);

const ValidatorApplicationPage = () => {
    const [account, setAccount] = useState();
    const [transactions, setTransactions] = useState();
    let navigate = useNavigate();
    const routeMain = () => {
        let path = "/";
        navigate(path);
    };
    


    useEffect(()=> {
       
    }, []);

 
        return (
            <PageContainer>
                <Header></Header>
                <ApplyForm></ApplyForm>
            </PageContainer>
        );
    
    
    
    
};

export default ValidatorApplicationPage;
