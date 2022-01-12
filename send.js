const ethers = require('ethers')
const bignumber = require('bignumber.js')
const keccak256 = require('keccak256')

async function createAndSend(amount,to) {
  const provider=  new ethers.providers.JsonRpcProvider('https://rinkeby.arbitrum.io/rpc')
  const wallet = new ethers.Wallet(PrivateKey, provider);
  const _amount = "0x" + new bignumber(amount).toString(16);
  const estimatedGas = await provider.estimateGas({ to, value: _amount });
  const gasPrice = await provider.getGasPrice();
  console.log(gasPrice.toString())
  console.log(estimatedGas.toString())
  const tx = await wallet.populateTransaction({
    to,
    value: _amount,
    gasPrice,
    gasLimit: estimatedGas,
  });
  const signedTx = await wallet.signTransaction(tx);
  console.log(signedTx)
  await provider.sendTransaction(signedTx);
  console.log('sent')
}

createAndSend(0, '0x0C0Dc6e9b0a43B1C297f71927737917B35e160AA')