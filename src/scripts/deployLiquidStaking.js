const hre = require("hardhat");
const contracts = require('../addresses/contractAddress.json')

async function main() {
    const reETH = contracts.rewardToken;
   
    const liquidStaking = await hre.ethers.getContractFactory("LiquidStaking");
    const liquidstaking = await liquidStaking.deploy(reETH);
    console.log("Liquidity Staking address: ", liquidstaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
