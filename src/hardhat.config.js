require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const ethers = require('ethers');
const provider = new ethers.providers.getDefaultProvider('http://127.0.0.1:8545/');
// const wallet = new ethers.Wallet(process.env.WALLET_SECRET).connect(provider);
const gasPrice = ethers.utils.formatUnits(ethers.utils.parseUnits('1', 'gwei'), 'wei');
const evmosGasPrice = ethers.utils.formatUnits(ethers.utils.parseUnits('1', 'gwei'), 'wei');
/* @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'local',
  paths: {
    artifacts: './artifacts'
  },
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: process.env.MAINNET_RPC_URL,
      },
      gasPrice: parseInt(gasPrice),
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    local: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545/',
      gasPrice: parseInt(gasPrice),
      initialBaseFeePerGas: 0,
      loggingEnabled: true
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    testnetEvmos: {
      chainId: 9000,
      url: process.env.EVMOS_TESTNET_RPC_URL,
      accounts: [process.env.EVMOS_PRIVATE_KEY],
      gas: 5500000
    },
    evmos: {
      chainId: 9001,
      url: "",
      accounts: []
    }
  }
};