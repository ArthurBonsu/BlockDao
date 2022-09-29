import {InputGroup,  Text,Input, InputRightAddon,  Heading , Image , Stack} from "@chakra-ui/react";

import { ComponentType, FC, useCallback, useState } from 'react'
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import  {shortenAddress}  from "../../constants/shortenAddress";
import  dummyData  from "../../constants/dummyData";
import  Loader from "../Loader";
import { setValues } from "framer-motion/types/render/utils/setters";
//STORES
import { useSwapStore  } from '@stores/ContextStores/useSwapStore'
import { useEthersStore  } from 'stores/ethersStore'
import { useSafeStore  } from 'stores/safeStore'
import { useHashTransactionStore  } from 'stores/transactionStore'
import { useUserStore  } from 'stores/userStore'

//HOOKS
import  useEthers   from 'hooks/useEthers'
import  useFetch   from 'hooks/useFetch'
import  useLoadSafe   from 'hooks/useLoadSafe'
import  useSafe   from 'hooks/useSafe'
import useSafeSdk   from 'hooks/useSafeSdk'
import useTransactions   from 'hooks/useTransactions'

import useSafeInfo from 'hooks/useSafe'
//Context 
import  useCrowdsourceContext   from 'context/useCrowdsourceContext'
import  useDaoContext   from 'context/useDaoContext'
import  useSwapContext   from 'context/useSwapContext'
import  useTransactionContext   from 'context/useTransactionContext'
import useTransferContext   from 'context/useTransferContext'

interface SimpleTransferProp {
  title?:string 

}


const TransferInput = () => (
  
  
<Stack spacing={4}>
  <InputGroup>
    <InputRightAddon> +233 </InputRightAddon>  
    <Input type='tel' placeholder='phone number' />
  </InputGroup>
  <Input focusBorderColor='lime' placeholder='Here is a sample placeholder' />
  <Input
    isInvalid
    errorBorderColor='red.300'
    placeholder='Here is a sample placeholder'
  />

<Input
    isInvalid
    errorBorderColor='crimson'
    placeholder='Here is a sample placeholder'
  />

  <InputGroup>
    <InputRightAddon> +233</InputRightAddon>
    <Input type='tel' placeholder='phone number' />
  </InputGroup>

  <InputGroup>
    <InputRightAddon> 1307</InputRightAddon>
    <Input type='tel' placeholder='phone number' />
  </InputGroup>



 </Stack> 
 );

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const SimpleTransfer: React.FC = ( ) => {
   
  const {  connectWallet,currentAccount,isLoading,sendTransaction,handleChange,formData, } = useTransactionContext();
 
 

    const handleSubmit = (e) => {
      const { addressTo, amount, keyword, message } = formData;
  
      e.preventDefault();
      //Implementation of transfer
  
      if (!addressTo || !amount || !keyword || !message) return;
  
      sendTransaction();
    }

    return (
      <Stack spacing={6}>

<div> 

  
</div>
<div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
    <div className="flex flex-col md:p-12 py-12 px-4">
      {currentAccount ? (
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>
      ) : (
        <h3 className="text-white text-3xl text-center my-2">
          Connect your account to see the latest transactions
        </h3>
      )}
        Transaction Details
      <div className="flex flex-wrap justify-center items-center mt-10">
        {[...dummyData, ...transactions].reverse().map((transaction, i) => (
          <TransactionsCard key={i} {...transaction} />
        ))}
      </div>
    </div>
  </div>
</Stack>
  ) 
    
  }

export default SimpleTransfer;