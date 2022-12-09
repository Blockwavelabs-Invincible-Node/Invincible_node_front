import Web3 from "web3"

const web3 = Web3(window.ethereum);

const AddNetwork = async({networkId}) => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ 
          chainId: web3.utils.toHex(networkId),
          chainName: 'Evmos',
          nativeCurrency: {
              name: 'tEVMOS',
              symbol: 'tEVMOS',
              decimals: 18
          },
          rpcUrls: ['https://eth.bd.evmos.dev:8545'],
          blockExplorerUrls: ['https://evm.evmos.dev']
      }],
  })
.then(() => console.log('network added'))
.catch(() => console.log('could not add network'))
}

export default AddNetwork;