// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const ethers = hre.ethers;
    const [deployer] = await ethers.getSigners();
    const balance = await deployer.getBalance();
    console.log('Deployer :', deployer.address);
    console.log('Balance :', balance);


    const reETH = await hre.ethers.getContractFactory("RewardToken");
    // initial supply 포함
    const reeth = await reETH.deploy(0);
    const result = await reeth.deployed();
    console.log("Token Contract address: ", reeth.address);
    // console.log("Result: ", result);

    const gasPriceData = await ethers.provider.getGasPrice();
    console.log(`${gasPriceData}`);
    console.log('Gas Price :', ethers.utils.formatUnits(gasPriceData, 'gwei'));
    const usedData = await deployer.getBalance();
    console.log('Balance :', usedData);
    console.log('Deploy Success');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
