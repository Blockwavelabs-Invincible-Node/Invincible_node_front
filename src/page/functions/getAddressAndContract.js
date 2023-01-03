import address from "../../addresses/contractAddress.json";
import liquidStaking from "../../artifacts/liquidStaking.json";
import rewardToken from "../../artifacts/rewardToken.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);
const GetAddressAndContract = () => {
  const evmosLiquidStakingAddress = address.evmosLiquidStaking;
  const evmosLiquidStakingContract = new web3.eth.Contract(
    liquidStaking.output.abi,
    evmosLiquidStakingAddress
  );
  const evmosRewardTokenAddress = address.evmosRewardToken;
  const evmosRewardTokenContract = new web3.eth.Contract(
    rewardToken.output.abi,
    evmosRewardTokenAddress
  );
  return [
    evmosLiquidStakingAddress,
    evmosLiquidStakingContract,
    evmosRewardTokenAddress,
    evmosRewardTokenContract,
  ];
};

export default GetAddressAndContract;
