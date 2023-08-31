import axios from 'axios'
// The json api info is designed as types here
import { TransfersType, AssetType, SafeInfoType, SwapTransactionType,TokenInfoResponse } from 'types'
import { useHashTransactionStore } from '@stores/transactionStore'
/**
 * Should only register GET requests
 */
// getting safes owned by the wallet 

if (typeof window !== 'undefined') {

const BrowserFS = require('browserfs');
BrowserFS.install(window);
const fs = require('fs');
BrowserFS.FileSystem.InMemory.Create((err, inMemoryFS) => {
  if (err) throw err;
  fs.mkdirSync('/sandbox');
  fs.mount('/sandbox', inMemoryFS);
  fs.writeFileSync('/sandbox/test.txt', 'Hello, BrowserFS!');
  // Use fs methods to read/write files
});
fs.readFile('/sandbox/test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data); // Output: Hello, BrowserFS!
});
}
const logouri = useHashTransactionStore((state) => state.txlogoUri)
export default {
  getSafe: (walletAddress: string | null) => async () => {
    const result = await axios.get<{ safes: Array<string> }>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/owners/${walletAddress}/safes/`
    )
    // returning the results and data 
    return result.data
  },

  /// get safetransfers 
  getSafeTransfers: (safeAddress: string) => async () => {
    const result = await axios.get<TransfersType>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/${safeAddress}/multisig-transactions/`
    )
    return result.data
  },

  /// get assets 
  getAssets: (safeAddress: string) => async () => {
    const result = await axios.get<Array<AssetType>>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/${safeAddress}/balances/usd/`
    )
    return result.data
  },
  // This is an api call which takes the api parameters in 
  getSafeInfo: (safeAddress: string) => async () => {
    const result = await axios.get<SafeInfoType>(
      `https://safe-transaction.rinkeby.gnosis.io/api/v1/safes/${safeAddress}/`
    )
    return result.data
  },
 
  getSwapTransactionInfo: () => async () => {

    const result = await axios.get<SwapTransactionType>(
    
      // Logo Uri swa
      `https://safe-transaction.rinkeby.gnosis.io/api/v1//tokens​/${logouri}​/`
    )
    return result.data
  },

  getTokenTransactionInfo: (address: string ) => async () => {

    const result = await axios.get<TokenInfoResponse>(
    
      // Logo Uri swap
      `https://safe-transaction.rinkeby.gnosis.io/api/v1//tokens​/${address}​/`
    )
    return result.data
  },

  getCSVMultiPrice: (token: string ,secondtoken:string) => async () => {

    const result = await axios.get<SwapTransactionType>(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${token},${secondtoken}&tsyms=BTC,USD,EUR&api_key=${String(process.env.CRYPTOCOMPARE)}`
      
    )
    return result.data
  },
  
  getCSVPrice: (token: string) => async () => {

    const result = await axios.get<SwapTransactionType>(
      `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=BTC,USD,EUR&api_key=${String(process.env.CRYPTOCOMPARE)}`
      
      
    )
    return result.data
  },
}
