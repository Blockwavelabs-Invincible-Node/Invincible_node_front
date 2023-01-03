import styled from "styled-components";
import Web3 from "web3";
import contractAddress from "../../../addresses/contractAddress.json";
import stableTokenPool from "../../../artifacts/stableCoinPool.json";
import liquidStaking from "../../../artifacts/liquidStaking.json";
import { useState } from "react";
import { useEffect } from "react";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { LightText } from "../../../styles/styledComponents/lightText";
import { PacmanLoader } from "react-spinners";

import blockHeights from "../../../assets/images/blockHeightsIcon.svg";
import nodes from "../../../assets/images/nodesIcon.svg";
import bondedTokens from "../../../assets/images/bondedTokensIcon.svg";
import blockTime from "../../../assets/images/blockTimeIcon.svg";
const NodesBox = styled.div`
  margin-top: 3vh;
`;

const ListBox = styled.div`
  margin-top: 7vh;
`;
const ListTable = styled.table`
  width: 90%;
  margin: auto;
  padding-top: 3vh;
  padding-bottom: 3vh;
  text-overflow: hidden;
  font-size: 1vh;
  border-collapse: collapse;

  /* table-layout: fixed; */
`;
const ListTableBox = styled.div`
  background-color: #1b1b1b;
  width: 90%;
  margin: auto;
  padding-top: 3vh;
  padding-bottom: 5vh;
  border-radius: 10px;
`;
const ListTableHeader = styled.tr`
  height: 7vh;
  border-bottom: 1px solid #4e4e4e; ;
`;
const ListTableRow = styled.tr`
  height: 7vh;
  border-bottom: 1px solid #4e4e4e; ;
`;
const ListTableElement = styled.td`
  text-overflow: hidden;
`;
const Owner = styled(ListTableElement)`
  max-width: 12vw;
  text-overflow: hidden;
  word-wrap: break-word;
`;
const Validator = styled(ListTableElement)`
  max-width: 12vw;
  text-overflow: hidden;
  word-wrap: break-word;
`;
const FirstText = styled(BoldText)`
  font-size: 1.2vw;
  text-align: left;
  margin-left: 5%;
  margin-bottom: 3vh;
`;
const NodeBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
`;
const NodeBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1b1b1b;
  width: 24%;
  height: 10vh;
  border-radius: 10px;
`;
const NodeBoxTitle = styled(LightText)`
  text-align: left;
  font-size: 1.2vw;
  margin-top: 1.5vh;
  /* margin-left: 1.5vw; */
  margin-bottom: 1.5vh;
`;
const NodeBoxText = styled(BoldText)``;
const SpinnerBox = styled.div`
  margin-top: 30vh;
  display: flex;
  justify-content: center;
`;
const WhiteLine = styled.hr`
  width: 100px;
`;
const TitleWrapper = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  margin-top: 1vh;
`;
const SvgWrapper = styled.img`
  height: 100%;
  margin-left: 1vw;
  margin-right: 0.5vw;
`;

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
  contractAddress.evmosLiquidStaking
);

const Dashboard = () => {
  const [totalAddressNumber, setTotalAddressNumber] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [valiAddresses, setValiAddresses] = useState([]);
  const [lends, setLends] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [blockHeight, setBlockHeight] = useState(0);

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
  function getShortenedAddress(addr) {
    console.log("length of addr: ", addr.length);
    if (addr.length == 42)
      return addr.substring(0, 5) + "..." + addr.substring(28);
    else if (addr.length == 51)
      return addr.substring(0, 5) + "..." + addr.substring(46);
  }

  const getChainData = async () => {
    const bh = await web3.eth.getBlockNumber();
    setBlockHeight(bh);
  };

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
            {/* <Owner>{getShortenedAddress(addresses[i])}</Owner> */}
            <Validator>
              {getShortenedAddress(valiAddresses[i], "evmos")}
            </Validator>
            <ListTableElement>{commissions[i]}%</ListTableElement>
            <ListTableElement>{lends[i] / 10 ** 18} USDT</ListTableElement>
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
    getChainData();
  }, []);

  return loading ? (
    <>
      <SpinnerBox>
        <PacmanLoader size={40} color="#f6f7fc" />
      </SpinnerBox>
    </>
  ) : (
    <>
      {/* <NodesBox>
        <FirstText>Chain Status</FirstText>
        <NodeBoxWrapper>
          <NodeBox>
            <TitleWrapper>
              <SvgWrapper src={blockHeights} />
              <NodeBoxTitle>Block Heights</NodeBoxTitle>
            </TitleWrapper>
            <NodeBoxText>{blockHeight}</NodeBoxText>
          </NodeBox>
          <NodeBox>
            <TitleWrapper>
              <SvgWrapper src={nodes} />
              <NodeBoxTitle>Nodes</NodeBoxTitle>
            </TitleWrapper>

            <NodeBoxText>111111</NodeBoxText>
          </NodeBox>
          <NodeBox>
            <TitleWrapper>
              <SvgWrapper src={bondedTokens} />
              <NodeBoxTitle>Bonded Tokens</NodeBoxTitle>
            </TitleWrapper>
            <NodeBoxText>111111</NodeBoxText>
          </NodeBox>
          <NodeBox>
            <TitleWrapper>
              <SvgWrapper src={blockTime} />
              <NodeBoxTitle>Block Time</NodeBoxTitle>
            </TitleWrapper>
            <NodeBoxText>111111</NodeBoxText>
          </NodeBox>
        </NodeBoxWrapper>
      </NodesBox> */}

      <ListBox>
        <FirstText>List</FirstText>
        <ListTableBox>
          <ListTable>
            <ListTableHeader>
              <ListTableElement>No.</ListTableElement>
              {/* <ListTableElement>Owner</ListTableElement> */}
              <ListTableElement>Validator</ListTableElement>
              <ListTableElement>Commission</ListTableElement>
              <ListTableElement>USDT Lended</ListTableElement>
              <ListTableElement>Score</ListTableElement>
              <ListTableElement>Share(%)</ListTableElement>
            </ListTableHeader>
            {TableRows()}
          </ListTable>
        </ListTableBox>
      </ListBox>
    </>
  );
};

export default Dashboard;
