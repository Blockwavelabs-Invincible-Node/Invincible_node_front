import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { BoldText } from "../../styles/styledComponents/boldText";
import ApplyForm from "./components/applyForm";
import SwitchNetwork from "../functions/switchNetwork";
import Base from "../common/base";
import Modal from "./Modal";

const PageContainer = styled.div`
  position: relative;
`;
const Loading = styled(BoldText)` 

`;

const web3 = new Web3(window.ethereum);

const ValidatorApplicationPage = () => {
    const [account, setAccount] = useState();
    const [transactions, setTransactions] = useState();
    const [showModal, setShowModal] = useState(false);

    let navigate = useNavigate();
    const routeValidatorApplication = () => {
        let path = "/validator-application";
        navigate(path);
    };
    
    useEffect(()=> {
       
    }, []);

    return (
        <PageContainer>
            <Modal
            closeModal={() => {
                setShowModal(false);
                routeValidatorApplication();
            }}
            visible={showModal}
            />
            <Header launchedApp={true}></Header>
            <Base
            component={
                <ApplyForm
                    openModal={() => {
                        setShowModal(true);
                    }}
                 
                ></ApplyForm>  
            }
            ></Base>
        </PageContainer>
    );
    
    
    
    
};

export default ValidatorApplicationPage;
