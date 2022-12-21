import styled from "styled-components";
import Web3 from "web3";
import contractAddress from "../../../addresses/contractAddress.json"
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import { useState } from "react";
import { useEffect } from "react";


const NodesBox = styled.div` 

`;

const ListBox = styled.div` 

`;
const ListTable = styled.table` 

`;
const ListTableHeader = styled.tr` 

`;
const ListTableRow = styled.tr` 

`;
const ListTableElement = styled.td` 

`;

const goerliProvider = process.env.REACT_APP_GOERLI_RPC_URL;
const web3Provider = new Web3.providers.HttpProvider(goerliProvider);
const goerliWeb3 = new Web3(web3Provider);

const web3 = new Web3(window.ethereum);

const Dashboard = () => {
    const [balanceOf, setBalanceOf] = useState(0);
    const stableCoinPoolRead = async() => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        const stableTokenPoolContract = new goerliWeb3.eth.Contract(stableTokenPool.output.abi, contractAddress.stableCoinPool);
        const balanceOf = await stableTokenPoolContract.methods.balanceOf(account).call();
        setBalanceOf(balanceOf);
    }

    const liquidStakingContractRead = async() => {
        const getAccount = await web3.eth.getAccounts();
        const account = getAccount[0];
        console.log(account);
        const liquidStakingContract = new web3.eth.Contract(liquidStaking.output.abi, contractAddress.liquidStaking);
        const staked = await liquidStakingContract.methods.balanceOf(account).call();
        const retrieved = await liquidStakingContract.methods.unstaked(account).call();
        console.log("staked: ", staked-retrieved);
    }

    useEffect(() => {
        stableCoinPoolRead();
        liquidStakingContractRead();
    }, []);

    return(
        <>
            <NodesBox>

            </NodesBox>

            <ListBox>
                <ListTable>
                    <ListTableHeader>
                        <ListTableElement>
                            No.
                        </ListTableElement>
                        <ListTableElement>
                            Validator
                        </ListTableElement>
                        <ListTableElement>
                            Amount Staked
                        </ListTableElement>
                        <ListTableElement>
                            Commission
                        </ListTableElement>
                        <ListTableElement>
                            USDT Lended
                        </ListTableElement>
                        <ListTableElement>
                            Cumulative share(%)
                        </ListTableElement>
                    </ListTableHeader>
                    <ListTableRow>
                        <ListTableElement>
                            1
                        </ListTableElement>
                        <ListTableElement>
                            evmosvaloper...
                        </ListTableElement>
                        <ListTableElement>
                            111 
                        </ListTableElement>
                        <ListTableElement>
                            5%
                        </ListTableElement>
                        <ListTableElement>
                            {balanceOf}
                        </ListTableElement>
                        <ListTableElement>
                            100%
                        </ListTableElement>
                    </ListTableRow>
                </ListTable>
            </ListBox>
        </>
    )
}

export default Dashboard;