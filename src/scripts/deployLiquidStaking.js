const hre = require("hardhat");
const contracts = require("../addresses/contractAddress.json");

async function main() {
  const reETH = contracts.evmosRewardToken;

  const evmosLiquidStaking = await hre.ethers.getContractFactory(
    "evmosLiquidStaking"
  );
  const evmosLiquidStaking = await evmosLiquidStaking.deploy(reETH);
  console.log("Liquidity Staking address: ", evmosLiquidStaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
