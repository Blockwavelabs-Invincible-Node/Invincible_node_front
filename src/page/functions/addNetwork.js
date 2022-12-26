import Web3 from "web3"

const web3 = new Web3(window.ethereum);

const AddNetwork = async({networkId, chainName, currencyName, currencySymbol, decimals, rpcUrls, blockExplorerUrls}) => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ 
          chainId: web3.utils.toHex(networkId),
          chainName: chainName,
          nativeCurrency: {
              name: currencyName,
              symbol: currencySymbol,
              decimals: decimals
          },
          rpcUrls: [rpcUrls],
          blockExplorerUrls: [blockExplorerUrls]
      }],
  })
.then(() => console.log('network added'))
.catch(() => console.log('could not add network'))
}

export default AddNetwork;