import styled from "styled-components";
import { Button } from "../../../styles/styledComponents/button";
import { useState, useEffect } from "react";
import Web3 from "web3";
import contractAddress from "../../../addresses/contractAddress.json";
import evmosLiquidStaking from "../../../artifacts/contracts/evmosLiquidStaking.sol/liquidStaking.json";
import evmosRewardToken from "../../../artifacts/contracts/evmosRewardToken.sol/rewardToken.json";
import { useDispatch, useSelector } from "react-redux";
import stakeAmountReducer, {
  selectStakeAmount,
} from "../../../redux/reducers/stakeAmountReducer";

const StartButton = styled(Button)`
  margin: auto;
  display: block;
  text-align: center;
`;

const liquidStakingContractAddress = contractAddress.evmosLiquidStaking;
const evmosRewardTokenAddress = contractAddress.evmosRewardToken;

const Start = () => {
  const [evmosLiquidStakingContract, setLiquidStakingContract] = useState();
  const [evmosRewardTokenContract, setevmosRewardTokenContract] = useState();
  const [account, setAccount] = useState();
  const [currentRewardRate, setCurrentRewardRate] = useState();
  const [stakedAmout, setStakedAmount] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [contractOwner, setContractOwner] = useState();

  const stakeAmountRedux = useSelector(selectStakeAmount);

  const web3 = new Web3(window.ethereum);

  function load() {
    const evmosLiquidStakingContract = new web3.eth.Contract(
      evmosLiquidStaking.abi,
      liquidStakingContractAddress
    );
    const evmosRewardTokenContract = new web3.eth.Contract(
      evmosRewardToken.abi,
      evmosRewardTokenAddress
    );

    //콜백 함수
    if (
      evmosLiquidStakingContract == null ||
      evmosRewardTokenContract == null
    ) {
      console.log("contract Still null");
    } else {
      setLiquidStakingContract(evmosLiquidStakingContract);
      setevmosRewardTokenContract(evmosRewardTokenContract);
    }
  }

  const getAccount = async () => {
    try {
      const getaccount = await web3.eth.getAccounts();
      setAccount(getaccount[0]);
      console.log("getaccount[0] :", getaccount[0]);
    } catch (error) {
      return error;
    }
  };

  const doStake = async (amount) => {
    let realAmount = amount * web3.utils.toBN(10 ** 18);
    getAccount();
    console.log("account: ", account);
    web3.eth
      .sendTransaction({
        from: account,
        to: liquidStakingContractAddress,
        value: realAmount,
      })
      .then(function (receipt) {
        console.log(receipt);
      });

    console.log("stake amount: " + realAmount.toString());
    console.log(
      "evmosLiquidStakingContract: ",
      evmosLiquidStakingContract.methods
    );
    // const dstake = await evmosLiquidStakingContract.methods.stake(realAmount).send({from: account});
    // console.log("stake result: ", dstake);
  };
  const receiveReward = async () => {
    const rreward = await evmosLiquidStakingContract.methods
      .receiveReward()
      .send({ from: account });
    console.log(rreward);
  };
  const withdraw = async (amount) => {
    const wd = await evmosLiquidStakingContract.methods
      .withdraw(amount)
      .send({ from: account });
    console.log(wd);
  };
  const rewardRateSetUp = async (rewardRate) => {
    const rRate = await evmosLiquidStakingContract.methods
      .setRewardRate(rewardRate)
      .send({ from: account });
    // setCurrentRewardRate(rewardRate);
  };

  //---------------get methods-----------------------//
  //  const getRewardRate = async() => {
  //     const gRate = await evmosLiquidStakingContract.methods.rewardRate().call();
  //     setCurrentRewardRate(gRate);
  // }
  // const getStaked = async() => {
  //     const gStaked = await evmosLiquidStakingContract.methods.balanceOf(account).call();
  //     setStakedAmount(gStaked);
  //     console.log("staked amount: ", gStaked);
  // }
  // const getTotalSupply = async() => {
  //     const tsupply = await evmosLiquidStakingContract.methods.totalSupply().call();
  //     setTotalSupply(tsupply);
  //     console.log("total supply: ", tsupply);
  // }
  // const getContractOwner = async() => {
  //     const cOwner = await evmosLiquidStakingContract.methods.owner().call();
  //     setContractOwner(cOwner);
  // }

  // function getValues() {
  //     getTotalSupply();
  //     getContractOwner();
  //     getRewardRate();
  //     getStaked();
  // }

  useEffect(() => {
    load();
  }, []);

  if (evmosLiquidStakingContract == null || account == null) {
    console.log("liquidity staking contract uploading");
    getAccount();
    return null;
  }

  return (
    <>
      <StartButton
        onClick={() => {
          doStake(stakeAmountRedux);
        }}
      >
        Start Invincible Stake
      </StartButton>
    </>
  );
};

export default Start;
