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
const WelcomeInput = () => (
  
  
<Stack spacing={4}>
  <InputGroup>
    <InputRightAddon children='+234' />
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
    <InputRightAddon children='+234' />
    <Input type='tel' placeholder='phone number' />
  </InputGroup>

  <InputGroup>
    <InputRightAddon children='+234' />
    <Input type='tel' placeholder='phone number' />
  </InputGroup>



 </Stack> 
 );

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const SimpleTransfer: FC<SimpleTransferProp>  = ({title}) => {
   
  const {  connectWallet,currentAccount,isLoading,sendTransaction,handleChange,formData, } = useTransactionContext();
 
 

    const handleSubmit = (e) => {
      const { addressTo, amount, keyword, message } = formData;
  
      e.preventDefault();
      //Implementation of transfer
  
      if (!addressTo || !amount || !keyword || !message) return;
  
      sendTransaction();
    }

    return (
      <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
        <Stack direction='row'>

  <Image
    boxSize='500px'
    objectFit='cover'
    src='https://www.freepik.com/free-vector/flat-design-autumnal-background-with-kid-running_9452006.htm'
    alt='Dan Abramov'
  />
  
</Stack>

          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          <Stack spacing={3}>
 
         <Text fontSize='10xl'>Wecome To Block Dao where we give you services for free</Text>

           </Stack>  
         </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Enjoy your DAO
            </div>
            <div className={companyCommonStyles}>Premium</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              MUltisignature Swap
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Crowdsource
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Swap and Transfer 
            </div>
          </div>
        </div>
       
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                <Heading>Simply transfer to Friends and Family</Heading>
                </p>
              </div>
            </div>
          </div>
   
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism"> /</div>
            
          <Heading as='h3' size='lg'>  Your balance is: =   </Heading>
          <Text fontSize='6xl'> Fill in the form below </Text>
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <WelcomeInput />
            
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading
              ? (<Loader/> )
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
    )

 

  }

export default SimpleTransfer;