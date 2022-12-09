import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../common/header";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { BoldText } from "../../styles/styledComponents/boldText";

const PageContainer = styled.div`
  position: relative;
`;
const Loading = styled(BoldText)` 

`;

const web3 = new Web3(window.ethereum);

const ValidatorPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [account, setAccount] = useState();
  const [transactions, setTransactions] = useState();
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };

  const getTransactions = async() => {
    const getAccount = await web3.eth.getAccounts();
    const account = getAccount[0];
    setAccount(account);
    const APIKEY = process.env.REACT_APP_APIKEY;
    const baseURL = 'https://api.covalenthq.com/v1'
    const blockchainChainId = '9000'
    const demoAddress = account;
    
    async function getTransactions(chainId, address) {
            const url = new URL(`${baseURL}/${chainId}/address/${address}/transactions_v2/?key=${APIKEY}`);
            const response = await fetch(url);
            const result = await response.json();
            const data = result.data;
            console.log(data);
            return data;
        }
        
        const data = await getTransactions(blockchainChainId, demoAddress);
        console.log(data);
        setTransactions(data);
    }
    useEffect(()=> {
      getTransactions();
    }, []);

    if (transactions == null) {
      return (
        <PageContainer>
          <Header></Header>
          <Loading>Loading Transactions.. Please wait</Loading>
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <Header></Header>
       
      </PageContainer>
    );
};

export default ValidatorPage;