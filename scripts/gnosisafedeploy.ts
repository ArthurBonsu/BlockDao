
import   { useState, useEffect }  from "react";
import ReactDom from "react-dom";
import Web3 from 'web3';

import     hre  from  "hardhat";
import  { HardhatRuntimeEnvironment } from "hardhat/types";
import  { DeployFunction }  from "hardhat-deploy/types";

import  { Signer, BigNumber, ContractFactory, Contract } from "ethers";
import  {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import  { expect } from "chai";
import  Chai  from "chai";
import  Chaiaspromised from "chai-as-promised";
import  {ethers,utils, Wallet } from  "ethers";

import  Assert from "assert";

import { networkConfig, getNetworkIdFromName }  from "../utils/gethardhatconfig.js";

import  { TransactionRequest } from "@ethersproject/abstract-provider";

const fs = require('node:fs/promises');
if (typeof window !== 'undefined') {

const BrowserFS = require('browserfs');
BrowserFS.install(window);

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
const  ROPSTEN_NETWORK = process.env.ROPSTEN_NETWORK;
const ROPSTEN_API = process.env.ROPSTEN_API;

const DEV_ADDRESS=process.env.DEV_ADDRESS;
const RINKEBY_NETWORKCODE  =process.env.RINKEBY_NETWORK;
const ROPSTEN_NETWORKCODE  =process.env.ROPSTEN_NETWORK;
const KOVAN_NETWORKCODE  =process.env.KOVAN_NETWORK;
const MAINNET_NETWORKCODE  =process.env.MAINNET_NETWORK;

const RINKEBY_API_KEYCODE =  process.env.RINKEBY_API_KEY;

const PRIVATE_KEYCODE = process.env.PRIVATE_KEY;
const APIKEY = process.env.APIKEY;

let error;
let result;
let gnosissafeaddress;


const func  = async (hre) => { 
  const { deployments,getNamedAccounts,getChainId} = hre; 
  const {deploy} = deployments; 

  const {deployer} = await getNamedAccounts(); 


 const connectToWallet = () => {

 const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);


    if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      
         const defaultAccount = provider.getSigner(0)
         setDefaultAccount(defaultAccount)
    }
  
  
      
 useEffect(() => {
    connectToWallet()
  }, [provider, defaultAccount])
 
  }

let GnosisSafeGetAddressesDeployed = await deploy('GnosisSafeGetAddresses', { 
from: deployer,
 log: true, 
      });
  
    let safecontractaddress =   GnosisSafeGetAddressesDeployed.address
      

};


export default func;
func.tags = ['GnosisSafeGetAddresses']; 

