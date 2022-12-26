import styled from "styled-components";
import Web3 from "web3";
import contractAddress from "../../../addresses/contractAddress.json";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import { useState } from "react";
import { useEffect } from "react";

const NodesBox = styled.div``;

const ListBox = styled.div``;
const ListTable = styled.table``;
const ListTableHeader = styled.tr``;
const ListTableRow = styled.tr``;
const ListTableElement = styled.td``;

const goerliProvider = process.env.REACT_APP_GOERLI_RPC_URL;
const web3Provider = new Web3.providers.HttpProvider(goerliProvider);
const goerliWeb3 = new Web3(web3Provider);

const web3 = new Web3(window.ethereum);
const stableTokenPoolContract = new goerliWeb3.eth.Contract(
  stableTokenPool.output.abi,
  contractAddress.stableCoinPool
);
const liquidStakingContract = new web3.eth.Contract(
  liquidStaking.output.abi,
  contractAddress.liquidStaking
);

const Dashboard = () => {
  const [totalAddressNumber, setTotalAddressNumber] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [valiAddresses, setValiAddresses] = useState([]);
  const [lends, setLends] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // const stableCoinPoolRead = async() => {
  //     const getAccount = await web3.eth.getAccounts();
  //     const account = getAccount[0];
  //     const totalAddresses = await stableTokenPoolContract.methods.totalAddressNumber().call();
  //     setTotalAddressNumber(totalAddresses);
  // }
  // const liquidStakingContractRead = async() => {
  //     const getAccount = await web3.eth.getAccounts();
  //     const account = getAccount[0];
  //     console.log(account);
  //     const staked = await liquidStakingContract.methods.balanceOf(account).call();
  //     const retrieved = await liquidStakingContract.methods.unstaked(account).call();
  //     console.log("staked: ", staked-retrieved);
  // }

  const getData = async () => {
    const totalAddresses = await stableTokenPoolContract.methods
      .totalAddressNumber()
      .call();
    setTotalAddressNumber(totalAddresses);
    setTotalScore(0);
    let trackTotalScore = 0;
    if (addresses.length == 0) {
      for (let i = 0; i < totalAddresses; i++) {
        //setMyArray(oldArray => [...oldArray, newElement]);
        const commission = 5;
        const addr = await stableTokenPoolContract.methods
          .addressList(i)
          .call();
        setAddresses((addresses) => [...addresses, addr]);
        const valiAddr = await stableTokenPoolContract.methods
          .validatorAddress(addr)
          .call();
        setValiAddresses((valiAddresses) => [...valiAddresses, valiAddr]);
        const lend = await stableTokenPoolContract.methods
          .balanceOf(addr)
          .call();
        setLends((lends) => [...lends, lend]);
        const score = (lend / 10 ** 18) * ((100 - commission) / 100);
        setCommissions((commissions) => [...commissions, 5]);
        trackTotalScore += score;
        console.log("track addresses: ", addresses);
        console.log("addr: ", addr);
        console.log("ta: ", totalAddresses);
      }
    }
    setTotalScore(trackTotalScore);
    console.log("get data");
  };

  function TableRows() {
    let rows = [];
    for (let i = 0; i < totalAddressNumber; i++) {
      const score = (lends[i] / 10 ** 18) * ((100 - commissions[i]) / 100);
      console.log(addresses[i], i, score, totalScore);
      const share = (score * 100) / totalScore;
      const row = (
        <>
          <ListTableRow>
            <ListTableElement>{i + 1}</ListTableElement>
            <ListTableElement>{addresses[i]}</ListTableElement>
            <ListTableElement>{valiAddresses[i]}</ListTableElement>
            <ListTableElement>{commissions[i]}%</ListTableElement>
            <ListTableElement>{lends[i] / 10 ** 18}</ListTableElement>
            <ListTableElement>{score.toFixed(3)}</ListTableElement>
            <ListTableElement>{share.toFixed(3)}%</ListTableElement>
          </ListTableRow>
        </>
      );
      rows.push(row);
    }
    return rows;
  }

  const initData = async () => {
    await getData();
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return loading ? (
    <>
      <div>Loading</div>
    </>
  ) : (
    <>
      <NodesBox></NodesBox>

      <ListBox>
        <ListTable>
          <ListTableHeader>
            <ListTableElement>No.</ListTableElement>
            <ListTableElement>Owner</ListTableElement>
            <ListTableElement>Validator</ListTableElement>
            <ListTableElement>Commission</ListTableElement>
            <ListTableElement>USDT Lended</ListTableElement>
            <ListTableElement>Score</ListTableElement>
            <ListTableElement>Share(%)</ListTableElement>
          </ListTableHeader>
          {TableRows()}
        </ListTable>
      </ListBox>
    </>
  );
};

export default Dashboard;
