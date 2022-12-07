import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import rewardToken from "../../../artifacts/rewardToken.json";
import { useNavigate } from "react-router-dom";
import Pagination from "./pagination";



const LeverageWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  text-align: left;
  max-width: 100%;
`;
const FirstText = styled(BoldText)`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 1px;
`;
const SecondText = styled(LightText)`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 22px;
`;
const StakeStatusWrapper = styled.div` 
    background-color: #292929;
    margin-bottom: 10px;
    border-radius: 10px;

`;
const StakeStatusText = styled.div` 
    margin-left: 2vw;
    padding-top: 2vh;
    display: flex;
    justify-content: space-between;
`;
const YouStaked = styled(BoldText)` 
padding-right: 5vw;
padding-bottom: 1vh;
`;
const Price = styled(LightText)` 
margin-right: 2vw;
padding-top: 0.5vh;
font-size: 1vh;
`;
const StakeAmountText = styled(LightText)` 
text-align:center;
padding-bottom: 2vh;
`; 

const UndelegateButton = styled(Button)` 
    width: 100%;
`;
const TransactionTable = styled.div` 

`;
const TableHeader = styled.th` 

`;


const web3 = new Web3(window.ethereum);
const liquidStakingAddress = address.liquidStaking;
const liquidStakingContract = new web3.eth.Contract(liquidStaking.output.abi, liquidStakingAddress);
const rewardTokenAddress = address.rewardToken;
const rewardTokenContract = new web3.eth.Contract(rewardToken.output.abi, rewardTokenAddress);

const Transaction = ({ token, getAmount }) => {
    const [rewardAmount, setRewardAmount] = useState(); 
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
            <LeverageWrapper>
                <FirstText>Transactions</FirstText>
                <SecondText>
                    Address: {account}
                </SecondText>
                <StakeStatusWrapper>
                    <StakeStatusText>
                        <YouStaked>TXhash</YouStaked>
                    </StakeStatusText>
                    <StakeAmountText>
                        txhash uploading ...
                        {/* <Pagination itemsPerPage={10}></Pagination> */}
                    </StakeAmountText>
                </StakeStatusWrapper>
            </LeverageWrapper>
        )
    }


    return (
        <LeverageWrapper>
            <FirstText>Transactions</FirstText>
            <SecondText>
                Address: {account}
            </SecondText>
            <StakeStatusWrapper>
                <YouStaked>TXhash</YouStaked>
                <TransactionTable>
                    {/* {transactions.items.map(item =>{
                        return <div>{item.tx_hash}</div>
                    })} */}
                    <Pagination itemsPerPage={10} items={transactions.items}></Pagination>
                </TransactionTable>
            </StakeStatusWrapper>
        </LeverageWrapper>
    );
};

export default Transaction;