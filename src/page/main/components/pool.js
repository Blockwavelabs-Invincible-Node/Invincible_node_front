import React from "react";
import styled from "styled-components";
import { BoldText } from "../../../styles/styledComponents/boldText";
import { Wrapper } from "../../../styles/styledComponents/wrapper";
import poolImg1 from "../../../assets/images/poolImg.png";
import { Button } from "../../../styles/styledComponents/button";

const PoolWrapper = styled.div`
  text-align: center;
  margin-top: 100px;
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const HeadText = styled(BoldText)`
  text-align: left;
  margin-left: 25%;
  margin-top: 100px;
`;
const PoolBox = styled.div`
  background: #ffffff;
  border: 1px solid #bababa;
  border-radius: 5px;
  width: 40%;
  height: 250px;
  margin-bottom: 50px;
`;
const PoolImg = styled.img`
  width: 20%;
  margin-top: 5%;
`;
const TokenName = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;
const TokenAmount = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-left: 5%;
`;
const LiquidProvideButton = styled(Button)`
  margin-bottom: 100px;
`;
const LiquidProvideText = styled.div`
  color: #146dd8;
  font-size: 10px;
  text-align: center;
  margin-bottom: 5px;
`;

const Pool = () => {
  // const [ evmosLiquidStakingContract, setLiquidStakingContract ] = useState();
  // const [ evmosRewardTokenContract, setevmosRewardTokenContract ] = useState();
  // const [ account, setAccount ] = useState();
  // const [ currentRewardRate, setCurrentRewardRate ] = useState();
  // const [ stakedAmout, setStakedAmount ] = useState();
  // const [ totalSupply, setTotalSupply] = useState();
  // const [ contractOwner, setContractOwner ] = useState();

  // const stakeAmountRedux = useSelector(selectStakeAmount);

  // const web3 = new Web3(window.ethereum);

  // function load() {
  //     const evmosLiquidStakingContract = new web3.eth.Contract(evmosLiquidStaking.abi, liquidStakingContractAddress);
  //     const evmosRewardTokenContract = new web3.eth.Contract(evmosRewardToken.abi, evmosRewardTokenAddress);

  //     //?????? ??????
  //     if (evmosLiquidStakingContract == null || evmosRewardTokenContract == null) {
  //         console.log("contract Still null");
  //     }
  //     else {
  //         setLiquidStakingContract(evmosLiquidStakingContract);
  //         setevmosRewardTokenContract(evmosRewardTokenContract);
  //     }
  // }

  // const getAccount = async() => {
  //     try {
  //         const getaccount = await web3.eth.getAccounts();
  //         setAccount(getaccount[0]);
  //         console.log('getaccount[0] :', getaccount[0]);
  //     } catch(error) {
  //         return error;
  //     }
  // }

  // const doStake = async(amount) => {
  //     let realAmount = web3.utils.toBN(amount).mul(web3.utils.toBN(10 ** 18));
  //     getAccount();
  //     console.log("account: ", account);
  //     web3.eth.sendTransaction({
  //         from: account,
  //         to: liquidStakingContractAddress,
  //         value: realAmount
  //     })
  //     .then(function(receipt){
  //        console.log(receipt);
  //     });

  //     console.log("stake amount: " + realAmount.toString());
  //     console.log("evmosLiquidStakingContract: ", evmosLiquidStakingContract.methods);
  //     // const dstake = await evmosLiquidStakingContract.methods.stake(realAmount).send({from: account});
  //     // console.log("stake result: ", dstake);
  // }
  // const receiveReward = async() => {
  //     const rreward = await evmosLiquidStakingContract.methods.receiveReward().send({from: account});
  //     console.log(rreward);
  // }
  // const withdraw = async(amount) => {
  //     const wd = await evmosLiquidStakingContract.methods.withdraw(amount).send({from: account});
  //     console.log(wd);
  // }
  // const rewardRateSetUp = async(rewardRate) => {
  //     const rRate = await evmosLiquidStakingContract.methods.setRewardRate(rewardRate).send({from: account});
  //    // setCurrentRewardRate(rewardRate);
  // }

  // useEffect(()=> {
  //     load();
  // }, []);

  // if (evmosLiquidStakingContract == null || account == null) {
  //     console.log("liquidity staking contract uploading");
  //     getAccount();
  //     return null;
  // }

  return (
    <>
      <HeadText>Pool Catalyst</HeadText>
      <PoolWrapper>
        <PoolBox>
          <PoolImg src={poolImg1}></PoolImg>
          <TokenName>ETH</TokenName>
          <TokenAmount>Total Amount</TokenAmount>
          <TokenAmount>My Amount</TokenAmount>
        </PoolBox>
        <PoolBox>
          <PoolImg src={poolImg1}></PoolImg>
          <TokenName>inETH</TokenName>
          <TokenAmount>Total Amount</TokenAmount>
          <TokenAmount>My Amount</TokenAmount>
        </PoolBox>
      </PoolWrapper>
      <LiquidProvideText>Put your assets to work</LiquidProvideText>
      <LiquidProvideButton>Liquid Provide</LiquidProvideButton>
    </>
  );
};

export default Pool;
