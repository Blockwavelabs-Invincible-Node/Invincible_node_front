import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BasicInput } from "../../../styles/styledComponents/basicInput";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Button } from "../../../styles/styledComponents/button";
import { LightText } from "../../../styles/styledComponents/lightText";
import Web3 from "web3";
import address from "../../../addresses/contractAddress.json";
import evmosLiquidStaking from "../../../artifacts/liquidStaking.json";
import evmosRewardToken from "../../../artifacts/rewardToken.json";
import { useNavigate } from "react-router-dom";
import Pagination from "./pagination";

import { useTable } from "react-table";

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
const StakeAmountText = styled(LightText)`
  text-align: center;
  padding-bottom: 2vh;
`;
const Line = styled.hr`
  width: 100%;
  color: white;
`;

const web3 = new Web3(window.ethereum);

const Transaction = ({ account, transactions }) => {
  let navigate = useNavigate();
  const routeMain = () => {
    let path = "/";
    navigate(path);
  };

  useEffect(() => {
    console.log("transaction list: ", web3);
  }, []);

  function parseItem() {
    let temp;
    for (let i = 0; i < transactions.items.length; i++) {
      const temp2 = {
        block_height: transactions.items[i].block_height,
        amount: "hello",
        from_address: "hello",
        to_address: "aa",
        fees: "",
        tx_hash: "",
        successful: "",
      };
      temp += temp2;
    }

    return temp;
  }

  const item = parseItem();

  const data = React.useMemo(() => [item], []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Block Height",
        accessor: "block_height", // accessor is the "key" in the data
      },
      {
        Header: "AMOUNT",
        accessor: "amount",
      },
      {
        Header: "From Address",
        accessor: "from_address", // accessor is the "key" in the data
      },
      {
        Header: "To Address",
        accessor: "to_address",
      },
      {
        Header: "FEES",
        accessor: "fees", // accessor is the "key" in the data
      },
      {
        Header: "TX Hash",
        accessor: "tx_hash",
      },
      {
        Header: "Successful",
        accessor: "successful",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (transactions == null) {
    return (
      <LeverageWrapper>
        <FirstText>Transaction History</FirstText>
        <Line></Line>
        <SecondText>Address: {account}</SecondText>
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
    );
  }

  return (
    <LeverageWrapper>
      <FirstText>Transaction History</FirstText>
      <Line></Line>
      <StakeStatusWrapper>
        <Pagination itemsPerPage={10} items={transactions.items}></Pagination>
      </StakeStatusWrapper>
    </LeverageWrapper>
  );
};

export default Transaction;
