import React, { useEffect, useState } from "react";
import { ContractFactory, ethers, Signer, BigNumber,Contract } from "ethers";

import { contractABI, contractAddress } from "../constants/constants";
import { SwapNewTokenTransaction  } from 'types/ethers'
const chai  = require("chai");
const BN =require('bn.js')
chai.use(require('chai-bn')(BN));
const chaiaspromised = require("chai-as-promised");
const { Wallet } = require("ethers");
const { ethereum } = window;
require("@nomiclabs/hardhat-web3")


interface SwapProp{

  tokenAname: string,
  symbolA:string, 
  tokenBname:string,
  symbolB:string,
  amount:number,
  newamount: string  
}


interface sendTransactionProp {
 signer: Signer 
 accounts: string[]
 transactionObject:SwapNewTokenTransaction

}

const useSwapContext = () => {


    
 const createEthereumContract = () => {
  // Also like passing API key to infura this is normally done for wallet cases and things that work like Infura
  const provider = new ethers.providers.Web3Provider(ethereum);
   
  // is it calling this thhing Wallet now (since API is passed)
  //FOR SIGNERS
  const signer = provider.getSigner();
    
  // And making the signer the active we can retrieve the address inside
  let thisaccount = signer.connect(provider);
  thisaccount.getAddress();

  // WE USE THE REQUEST PROCESS



  const swapContract: Contract = new ethers.Contract(contractAddress, contractABI, signer);
  swapContract.connect().
  return swapContract;
};

  let accounts:Array<string> 
// Provides transaction information here 
// Picking these values from the form 
  const [formData, setformData] = useState({ tokenAname: "", symbolA: "",  tokenBname: "", symbolB: "", amount: 0, newamount: 0  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountsretrieved, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setTokenAmount] = useState(localStorage.getItem("TokenSwapAmount"));
  const [swaptransactions, setSwapTransactions] = useState([]);
  const [transactioninfocase, setTransactionInfo] = useState({})
 

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Connecting to the Smart Contract
  // Pull transaction
  // Using options 1
  // Using Option 2 for Etherscan
  
 const swapTKA = async ({ tokenAname, symbolA, tokenBname, symbolB, amount, newamount }: SwapProp) => {
    try {
      if (ethereum) {
        const newSwapContract = createEthereumContract();
        const amountoftokens =  ethers.BigNumber.from(amount);
     
        console.log("This is the amount of tokens",amountoftokens );
 
        const newswaptransaction  = await newSwapContract.swapTKA(amountoftokens) ;
        const newtransaction =        newswaptransaction.wait()
        setSwapTransactions(newswaptransaction);
        

       const transactioninfo : SwapNewTokenTransaction = {
        tokenAname:tokenAname,
        symbolA:symbolA,
        tokenBname: tokenBname,
        symbolB: symbolB,
        amount: amount, 
        newamount: newamount ,
         swaphash: newtransaction.hash ,
        from: accounts[0] ,
        to: newtransaction.to 
       }

      setTransactionInfo(transactioninfo);
      
     sendTransaction(transactioninfo)
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const swapTKX = async ({ tokenAname, symbolA, tokenBname, symbolB, amount, newamount }: SwapProp) => {
   
    try {
      if (ethereum) {
        const newSwapContract = createEthereumContract();
      
       
        // passing in value here
        const amountoftokens =  ethers.BigNumber.from(amount);
     
        console.log("This is the amount of tokens",amountoftokens );
        const newswapTKAtransaction = await newSwapContract.swapTKA(amountoftokens) ;
          newswapTKAtransaction.wait()
          console.log ("Swap Transaction", newswapTKAtransaction);


          console.log ('new TKA Transaction hash' +  await newswapTKAtransaction.hash);
        setSwapTransactions(newswapTKAtransaction);
        const transactioninfo : SwapNewTokenTransaction = {
          tokenAname:tokenAname,
          symbolA:symbolA,
          tokenBname: tokenBname,
          symbolB: symbolB,
          amount: amount, 
          newamount: newamount ,
          swaphash: newswapTKAtransaction.hash ,
          from: accounts[0] ,
          to: newswapTKAtransaction.to 
         }
  
        setTransactionInfo(transactioninfo);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      accounts = await ethereum.request({ method: "eth_accounts" });
     
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        useSwapContext();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

   const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const swapTokenContracts = createEthereumContract();
        const swapContractCount = await swapTokenContracts.getTransactionCount();

        // transaction confirmation to know transaction signature

        window.localStorage.setItem("transactionCount", swapContractCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

 const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

        // the blockchain accounts here
     let  accounts = await ethereum.request({ method: "eth_requestAccounts", });
        accounts[0].sendTransaction()
      // the specific account
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async ({signer, transactionObject } :sendTransactionProp) => {
    try {
      if (ethereum) {     
      
      //  const parsedAmount = ethers.utils.parseEther(amount);
       // WE WILL NOT BE WORKING WITH PAYMENT PER SAY BUT JUST SIMPLE TOKEN SUBMISSION
    
     

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };


  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return {

        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }
}


    export default useSwapContext;
