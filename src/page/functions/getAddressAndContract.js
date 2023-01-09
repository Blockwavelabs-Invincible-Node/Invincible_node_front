import address from "../../addresses/contractAddress.json";
import liquidStaking from "../../artifacts/liquidStaking.json";
import rewardToken from "../../artifacts/rewardToken.json";
import Web3 from "web3";
import liquidStakingPolygon from "../../artifacts/liquidStakingPolygon.json";

const web3 = new Web3(window.ethereum);
const GetAddressAndContract = () => {
  // evmos
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

  //kava
  const kavaLiquidStakingAddress = address.kavaLiquidStaking;
  const kavaLiquidStakingContract = new web3.eth.Contract(
    liquidStaking.output.abi,
    kavaLiquidStakingAddress
  );
  const kavaRewardTokenAddress = address.kavaRewardToken;
  const kavaRewardTokenContract = new web3.eth.Contract(
    rewardToken.output.abi,
    kavaRewardTokenAddress
  );

  // polygon
  const polygonLiquidStakingAddress = address.polygonLiquidStaking;
  const polygonLiquidStakingContract = new web3.eth.Contract(
    liquidStakingPolygon.output.abi,
    polygonLiquidStakingAddress
  );
  const polygonRewardTokenAddress = address.polygonRewardToken;
  const polygonRewardTokenContract = new web3.eth.Contract(
    rewardToken.output.abi,
    polygonRewardTokenAddress
  );

  return [
    evmosLiquidStakingAddress,
    evmosLiquidStakingContract,
    evmosRewardTokenAddress,
    evmosRewardTokenContract,
    kavaLiquidStakingAddress,
    kavaLiquidStakingContract,
    kavaRewardTokenAddress,
    kavaRewardTokenContract,
    polygonLiquidStakingAddress,
    polygonLiquidStakingContract,
    polygonRewardTokenAddress,
    polygonRewardTokenContract,
  ];
};

export default GetAddressAndContract;
