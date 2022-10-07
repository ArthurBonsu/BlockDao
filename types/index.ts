import { useRouter } from 'next/router'
import { ComponentType, FC } from 'react'
import { dateAtTime,  timeAgo,   dateFormat, DateType } from '@utils/formatDate'

export interface TransfersType {
  count: Number
  countUniqueNonce: Number
  next: any
  previous: any
  results: Array<{
    executionDate: string
    submissionDate: string
    isExecuted: boolean
    isSuccessful: boolean
    confirmations: Array<{
      owner: string
    }>
    safeTxHash: string
  }>
}

export interface ErrorType {
  arguments: Array<string>
  code: Number
  message: string
}

export interface AssetType {
  tokenAddress: string | null
  token: TokenType | null
  balance: number
  ethValue: number
  timestamp: string
  fiatBalance: number
  fiatConversion: number
  fiatCode: string
}

export type TokenType = {
  amount: number
  tokenname: string
  symbol: string
  decimals: number
  logoUri: string
}

export interface CreateTransferInput {
  asset: string
  amount: number
  recipient: string
}


export interface CreateSwapTransferInput {
  tokenAname:string
  symbolA:string
  tokenBname: string
  symbolB: string
  amount: number
}

export interface SafeInfoType {
  address: string
  nonce: number
  threshold: number
  owners: string[]
  masterCopy: string
  modules: string[]
  fallbackHandler: string
  guard: string
  version: string
}
export interface MySafeTransactionData {

  to: string ,
  value:string,
  data: number | string  
  operation: string
  safeTxGas: string 
  baseGas:  string 
  gasPrice: number 
  gasToken: string 
  refundReceiver: string 
  nonce: string 


}

export interface TokenTypesDetails {

    symbol: string
    tokenstring: string
    decimals: number
    logoUri: string
    address:string
    date: string


}


export interface TokenDepositvalue {
  amount: number
  tokenname:string,
  symbol:string 
}


export type SwapTransactionType = {
  tokentxhash: string
  nonce:number 
  amount:number
  tokenname:string
  symbol:string
  logoUri:string 
  txdata?: string
 }


 export type PaymentTransactions = {
  username: string , 
  address:string, 
  amount:number , 
  comment:string ,
  timestamp:Date, 
  receipient:string ,
  receipients: Array<string> ,
  txhash:string , 
  USDprice:number,
  paymenthash: string,
  owneraddress: string  
 }


 export type SimpleTransferTranscations = {
  username: string , 
  address:string, 
  amount:number , 
  comment:string ,
  timestamp:Date, 
  receipient:string ,
  receipients: Array<string> ,
  txhash:string , 
  USDprice:number,
  paymenthash: string,
  owneraddress: string  
 }
 
 export interface TokenInfoResponse{
 type : string 
 address: string
 name: string 
 symbol: string 
 decimals:string
 logoUri: string 
 } 




  export interface MenuLabels{
    icon?: ComponentType
    label: string
    pathname?: string
  isCollapsed?: boolean
  shortCutKeys?: string[]
  onClick?: () => void
  }

  export interface SimpleTokenList{
    tokenname:string 
    symbol: string 


  }

  export interface ImportMeta {
    env: {
   APIKEY: string }
  }

 export interface Receipients {
  address: string 
 }

/*
 export type Tokens = {
  symbol: string
  tokenstring: string
  decimals: number
  logoUri: string
  address:string
  date: string
 }
*/
export type myreceipients = {
  value:  string 
}


export type RowType = {
  timestamp: string
  transaction_type: string 
  token: string 
  amount: string 

 }

 export type TokensSelected =  {
  name: string 
  symbol: string 
 } 
 export interface CSVProps {
  rows: RowType[],
  date? : string, 
  pvvalue?: string,
  timestamp?: string,
  transaction_type:string,
  token: string,
  amount: string
}


export type CSVPropsType=  {
  rows: RowType[],
  date? : string, 
  pvvalue?: string,
  timestamp?: string,
  transaction_type:string,
  token: string,
  amount: string
}
