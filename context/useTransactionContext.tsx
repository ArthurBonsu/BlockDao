import React, { useEffect, useState } from "react";
import { ContractFactory, ethers, Signer, BigNumber,Contract } from "ethers";

import { contractABI, contractAddress,FileTokenUpgradeableABI,  FileTokenUpgradeableV2ABI, FileTokenUpgradeableAddress,
  FileTokenUpgradeableV2Address } from "../constants/constants";
import { PaymentTransactions  } from 'types/index'
import { SimpleTransferTranscations  } from 'types/index'
const chai  = require("chai");
const BN =require('bn.js')
chai.use(require('chai-bn')(BN));
const chaiaspromised = require("chai-as-promised");
const { Wallet } = require("ethers");
const { ethereum } = window;
require("@nomiclabs/hardhat-web3")
import {Provider} from "@ethersproject/providers"
import useTransactionContext from "./useTransferContext";
import   { TransactionRequest }  from "@ethersproject/abstract-provider";

interface transactionParams {
  username?: string 
  address: string 
  amount: number 
  comment?: string 
  timestamp: Date
  receipient:string 
  receipients?: Array<string>
  txhash: string 
  USDprice?:  number 
  paymenthash?: string 
  owneraddress?:string
  newcontract?: Contract
  }

  interface simpleTransferParams {
    username?: string 
    address: string 
    amount: number 
    comment?: string 
    timestamp: Date
    receipient:string 
    receipients?: Array<string>
    txhash: string 
    USDprice?:  number 
    paymenthash?: string 
    owneraddress?:string
    newcontract?: Contract

    }
  

interface sendTransactionProp {
 signer: Signer 
provider: Provider 
transactionObject?:PaymentTransactions
transactionRequest?:TransactionRequest
newcontract?: Contract
}

 let _theowneraddress= "0x06Da25591CdF58758C4b3aBbFf18B092e4380B65";
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



  const SimpleTransfer: Contract = new ethers.Contract(contractAddress, contractABI, signer);
  SimpleTransfer.connect(signer);
  return {SimpleTransfer, signer, provider, thisaccount} ;
};

  let accounts:Array<string> ;
// Provides transaction information here 
// Picking these values from the form 
  const [formData, setformData] = useState<transactionParams>({username: "", address:"", amount:0, comment:"", timestamp:new Date("2019-05-27"),  
  receipient:"", receipients: [],txhash:"" , USDprice:0, paymenthash: "", owneraddress:"" });

  const [transferformData, setTransferformData] = useState<transactionParams>({username: "", address:"", amount:0, comment:"", timestamp:new Date("2019-05-27"),  
  receipient:"", receipients: [],txhash:"" , USDprice:0, paymenthash: "", owneraddress:"" });

  const [currentAccount, setCurrentAccount] = useState("");

  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

  const [transactions, setTransactions] = useState({username: "", address:"", amount:0, comment:"", timestamp:new Date("2019-05-27"),  
  receipient:"", receipients: [],txhash:"", USDprice:0, paymenthash: ""});

  const [paymenttransaction,setPayment ] = useState({});
  const [transfertransaction,setTransfer ] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [tokentx,setTokentx ] = useState({});
  const [tokentxreceipt,setTokentxReceipt ] = useState({});
  const [token]  = useState({})
  
 //  const [amount, setTokenAmount] = useState(localStorage.getItem("TokenSwapAmount"));

 const [transferredtokenamount, setTransferredTokenAmount] = useState(0);  
 const [paidTokenamount, setPaidTokenAmount] = useState(0);  
 const [ourUSDPrice, setUSDprice] = useState(0)
 const [accountsprovided, setAccounts ] = useState([]);

  const [transactioninfocase, setTransactionInfo] = useState({});

 

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Connecting to the Smart Contract
  // Pull transaction
  // Using options 1
  // Using Option 2 for Etherscan
  
  
  const sendPayment = async ({ username, amount, address, USDprice, txhash, paymenthash, owneraddress, newcontract }: transactionParams) => {
   setIsPaid(false);
    const paymentcounter: number =0;
try {
  if (ethereum) {
    const {SimpleTransfer, signer, provider} = createEthereumContract();
    setIsPaid(true);
    
    // passing in value here
    const amountoftokens =  ethers.BigNumber.from(amount);
 
    console.log("This is the amount of tokens",amountoftokens );
    
   
    const paymentamount = await SimpleTransfer.attach(address).payfee(USDprice) ;
    
   const paymentreceipt =     paymentamount.wait();
   
      console.log ("Payment Fee", paymentreceipt);

      console.log ('Payment fee hash' +  await paymentreceipt.hash);
    setPayment(paymentreceipt);
    paymentcounter +1;
     
    const filter = SimpleTransfer.filters.payfeeevent( address, USDprice);
    const results = await SimpleTransfer.queryFilter(filter) ;

    
    console.log(results); 
   
     const paymentreceiptaddress:string = paymentreceipt.events[0].args.sender.toString();
     const paymentpriceevented:number = paymentreceipt.events[0].args.amount.toNumber();
     
     console.log('paymentaddress',paymentreceiptaddress); 
     console.log('paymentpriceevented',paymentpriceevented); 
     
     newcontract = SimpleTransfer;

    const  transactionObject: PaymentTransactions  = {
        username: username, 
        address:address, 
        amount:amount, 
        comment:"",
        timestamp:new Date("2019-05-27"), 
        receipient:"",
        receipients: [],
        txhash:txhash, 
        USDprice:USDprice,
        paymenthash: paymenthash,
        owneraddress: _theowneraddress 
     }

     const transactionRequest : TransactionRequest= {
      to: _theowneraddress,
      from: address,
      nonce: SimpleTransfer.getTransactionCount(),        
      data: paymentreceipt.data,
      value:amount
        
    }
     
     setformData(transactionObject); 
     
     
     
   
     setPaidTokenAmount(amount);
    
     setPayment(transactionObject);
     
    

    sendTransaction({signer,provider,transactionObject, transactionRequest, newcontract});
    setIsPaid(true);
  } else {
    console.log("Ethereum is not present");
  }
} catch (error) {
  console.log(error);
}
};


 const sendSimpleTransfer = async ({ username, address, amount, comment, timestamp,  
 receipient, receipients,txhash, USDprice, paymenthash, owneraddress, newcontract}: simpleTransferParams) => {
  const simpletransfercounter: number =0;
  try {
      if (ethereum) {
        const {SimpleTransfer, signer, provider, thisaccount} = createEthereumContract();
        const amountoftokens =  ethers.BigNumber.from(amount);
     
        console.log("This is the amount of tokens",amountoftokens );
      
        if (receipients != null ) {
        receipients
        .map((item, index) => {
          receipient = receipients[index];

        });
      }
 
        const submitokentx  = await SimpleTransfer.transferFrom(address,receipient, amountoftokens) ;
     
        const tokensubmittxreipt =        submitokentx.wait();
        setTokentxReceipt(tokensubmittxreipt);
        
        const filter = SimpleTransfer.filters.transfer(simpletransfercounter );
        const results = await SimpleTransfer.queryFilter(filter) ;

        
        console.log(results); 
       
        newcontract = SimpleTransfer;
         const addressretrieved:number = submitokentx.events[0].args.address.toString();
         const receipientretrieved:number = submitokentx.events[0].args.receipient.toString();
         const newtokenamount:number = submitokentx.events[0].args.amount.toNumber();
         console.log('addressretrieved',addressretrieved); 
         console.log('receipientretrieved',receipientretrieved); 
         console.log('newtokenamount',newtokenamount); 
         
     
        simpletransfercounter+1;
        
        owneraddress = _theowneraddress;
     
        const transactionObject = {
      
            username: username , 
            address:address, 
            amount:amount , 
            comment:comment ,
            timestamp:timestamp, 
            receipient:receipient ,
            receipients: receipients ,
            txhash:txhash , 
            USDprice:USDprice,
            paymenthash: paymenthash,
            owneraddress: _theowneraddress
           
           
       }
       const transactionRequest :TransactionRequest =  {
        from: address,
        to: receipient ,
        value:amountoftokens,
        nonce:  SimpleTransfer.getTransactionCount(),
      

       }
      setTransactionInfo(transactionObject);
      
      simpletransfercounter+1;
   
    
      setTransferformData({ username: username , 
        address:address, 
        amount:amount , 
        comment:comment ,
        timestamp:timestamp, 
        receipient:receipient ,
        receipients: receipients ,
        txhash:txhash , 
        USDprice:USDprice,
        paymenthash: paymenthash,
        owneraddress: _theowneraddress}); 

     sendTransaction({signer,provider,transactionObject, transactionRequest, newcontract});
     setTransferredTokenAmount(amount);
   
   
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

        useTransactionContext();
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
        const {SimpleTransfer, signer, provider, thisaccount} = createEthereumContract();
        const SimpleTransferCount = await SimpleTransfer.getTransactionCount();

        // transaction confirmation to know transaction signature

        window.localStorage.setItem("transactionCount", SimpleTransferCount);
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
     setAccounts(accounts)
      // the specific account
      setCurrentAccount(accounts[0]);
      window.location.reload();
      return accounts;

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  
};

  const sendTransaction = async ({signer,provider, transactionRequest,newcontract} :sendTransactionProp) => {
    try {
      if (ethereum) {     
      
      //  const parsedAmount = ethers.utils.parseEther(amount);
       // WE WILL NOT BE WORKING WITH PAYMENT PER SAY BUT JUST SIMPLE TOKEN SUBMISSION
          const accounts =   connectWallet();
            signer.connect(provider).sendTransaction(transactionRequest);

        const transactionsCount = await newcontract.getTransactionCount();
            
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
        sendPayment ,
        sendSimpleTransfer,
        transactionCount,
        connectWallet,   
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        transferformData,
        transactions,
        paymenttransaction,
        transfertransaction,        
        isPaid,
        tokentxreceipt,
        transferredtokenamount,
        paidTokenamount,
        ourUSDPrice,
       accountsprovided,
       transactioninfocase,
      }
}


    export default useTransactionContext;