import { chakra, Heading , Stack} from "@chakra-ui/react";

import { ethers } from 'ethers'
const hre = require("hardhat")
import { Button, ButtonProps, Flex, useDisclosure, AlertDialog,Alert,  AlertDialogBody,  AlertDialogCloseButton,  AlertDialogContent,
  AlertDialogFooter,  AlertDialogHeader,  AlertDialogOverlay,   UseDisclosureReturn, Select,FormErrorMessage, FormControl, FormLabel,
  NumberInput,NumberInputField, NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper, Input,IconButton, AlertIcon, Grid,
    Box,  Text,  InputGroup,  InputRightAddon, FormHelperText,Wrap,  WrapItem, VisuallyHidden, VisuallyHiddenInput, Accordion,AccordionItem,AccordionButton,
    AccordionPanel, AccordionIcon } from '@chakra-ui/react'
    
import {RiArrowDownSLine} from 'react-icons/all'
import {  createSwapFormSchema, createSwapTransferFormSchema,  } from '../../validation'
  import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline'
import { useFormContext, useFieldArray ,useForm} from 'react-hook-form'
import { CreateSwapTransferInput, CreateTransferInput, SimpleTokenList } from 'types'
import supportedNetworkOptions from '@constants/supportedNetworkOptions'
//STORES
import { useSwapStore  } from '@stores/ContextStores/useSwapStore'
import { useEthersStore  } from 'stores/ethersStore'
import { useSafeStore  } from 'stores/safeStore'
import { useHashTransactionStore  } from 'stores/transactionStore'
import { useUserStore  } from 'stores/userStore'
import { Receipients  } from 'types/index'



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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


import React,{ useCallback, useState, useEffect } from 'react' 
import { setValues } from 'framer-motion/types/render/utils/setters'
import Router from 'next/router'
import { useQuery } from 'react-query'
import queries from "@services/queries";

// For finally making execution on the blockchain 



interface PaymentTransferProps extends ButtonProps {
  username: string , 
  address:string, 
  amount:number , 
  comment:string ,
  timestamp?:Date, 
  receipient:string ,
  receipients?: Array<string> ,
  txhash?:string , 
  USDprice:number,
  paymenthash: string,
  owneraddress: string  
  onPayTransfer: ()=> void
}

const receipientlist: Receipients[];



const {sendPayment ,sendSimpleTransfer,transactionCount,connectWallet, currentAccount,isLoading,sendTransaction,
    handleChange,formData,transferformData,transactions,paymenttransaction,transfertransaction,isPaid,tokentxreceipt,transferredtokenamount,
    paidTokenamount,ourUSDPrice,accountsprovided,transactioninfocase } = useTransactionContext();
   
// This is for the execution
const PaymentTransfer: React.FC<PaymentTransferProps> = ({
    username,address, amount,comment,receipient,receipients,paymenthash,USDprice, txhash,owneraddress, onPayTransfer,
  ...rest
}) => {
    const localDisclosure = useDisclosure()
    const [paymentapproved, setPaymentApproved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSwapping, setIsSwapping] = useState(true)
    const [isTyping, setIsTyping] = useState(true)  
    const [transaction,setTransaction] = useState('')
    const [token, setToken] = useState({})
    const [value, setValue] = useState('')
    const [_currentAccount, setCurrentAccount] = useState('')
    const [tokenchosen, setTokenChosen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [openMultiRecipient, setMultiReceipient] = useState(false); 
 

    
    
    const schema = yup.object({

        username: yup.string().required(),
        address: yup.string().required(), 
        amount:yup.number().required(),
        comment: yup.string().required(),
        timestamp:yup.date().required(),
        receipient:yup.number().required(),
        receipients:yup.array().of(yup.string()).required(),
        txhash:yup.string().required(),
        USDprice:yup.number().required(),
        paymenthash:yup.string().required(),
      
    }).required();
    
    
    const {
      register,
      handleSubmit,
      watch,
      // Read the formState before render to subscribe the form state through the Proxy
      formState: {  isDirty, isSubmitting, touchedFields, submitCount, errors },
    } = useForm<PaymentTransferProps>(
    
      {  defaultValues: 
        {
            username:"", 
            address:"", 
            amount:0 , 
            comment:"" ,
            timestamp:(27-09-2022),       
            
            receipients: [""] ,
            txhash:"" , 
            USDprice:0,
            paymenthash:"",
            owneraddress: "",
   },
        resolver: yupResolver(schema)
       
       }  );
    
       const amountWatch = watch("amount")


  const handleChange = (event) => { 
    isTyping
    setValue(event.target.value)
    !isTyping
    // Logic of token conversion must be here
  
  } 
  
  const onMultiReceipientOpen= () => {
    if(!openMultiRecipient) {
        setMultiReceipient(false);
    }
    else {

        setMultiReceipient(true);
    }

  } 
  
  // the attribute should be here 
  useEffect(() => {
    onPayTransfer = async () => {
        setIsLoading(true);
         
        paymenthash = await sendPayment({ username, amount, address, USDprice, txhash, paymenthash, owneraddress});
       
          setIsLoading(false);
        }
      
     onPayTransfer()
  }, [username,address, amount,comment,receipient,receipients,])

  return (
    <Box m="5">
      <form onSubmit={handleSubmit(()=> {     
        
        onPayTransfer();
        })}>
       
        <FormControl>
       
          <FormLabel htmlFor="tokenAname">Token A</FormLabel>
       
          <Heading as="h2" fontSize="xl" mb={0}>
               Make Payment Before Transferring Tokens 
               The price is now at : {currentUSD price} for 5 tokens
              </Heading> 
    <InputGroup>
   
    <Input  placeholder='username' {...register("username")} />
    <InputRightAddon> </InputRightAddon>


             
    <Input   placeholder='address'size='sm'   {...register("address")} />
    <InputRightAddon> +233</InputRightAddon>



    <Heading as="h2" fontSize="xl" mb={0}>
               Make Payment Before Transferring Tokens 
               The price is now at : {currentUSD price} for 5 tokens
              </Heading> 


    <Input  placeholder='token amount'   {...register("amount")}/>
    <InputRightAddon> +233</InputRightAddon>



          <Input  placeholder='comment'  {...register("comment")} />
    <InputRightAddon> +233</InputRightAddon> 


 
    
    <Input  type="datetime-local" placeholder='Select Date and Time'  {...register("timestamp")} />

    <InputRightAddon> +233</InputRightAddon>


    
    
    <Heading as="h2" fontSize="xl" mb={0}>
              You can choose multiple Receipients Here
              </Heading> 


    <InputRightAddon> +233</InputRightAddon>
   
    <Button colorScheme='blue' mr={3} onClick={onMultiReceipientOpen}>
                Click To Add Receipients
              </Button>
                  


 {openMultiRecipient} ?
 {receipientlist.map((item, index) => (

<Stack>
      (<Input  placeholder='receipients' {...register("receipients")} />) : 
     (<Text> No MultiReceipients selected </Text>)
     </Stack>

 <option key={item.tokenname} value={`ListOfTokens.${index}.tokenname`}>
 {`receipientlist.${index}.tokenname`}
 </option>
                               
             )             
             )
          }

     
  
    <Input  placeholder='txhash' {...register("txhash")} />
    
    <InputRightAddon> +233</InputRightAddon>

    <Input  placeholder='USDprice' {...register("USDprice")} />
    
    <InputRightAddon> +233</InputRightAddon>

    <Input  placeholder='paymenthash' {...register("paymenthash")} />
    
    <InputRightAddon> +233</InputRightAddon>
    <Input  placeholder='owneraddress' {...register("owneraddress")} />
    
    <InputRightAddon> +233</InputRightAddon>
  </InputGroup> 



         {ListOfTokens.map((item, index) => (
                <option key={item.tokenname} value={`ListOfTokens.${index}.tokenname`}>
                  {`ListOfTokens.${index}.tokenname`}
                </option>
                               
             )             
             )
          }
             </Input> 

           
           {errors && errors.tokenAname && (
            <FormHelperText color="red">
              {errors.tokenAname.message && errors.tokenAname.message}
            </FormHelperText>
          )}
        </FormControl>


        <FormControl>
          <FormLabel htmlFor="symbolA">Symbol A</FormLabel>
       
          <Select icon={<RiArrowDownSLine />} placeholder='Select Token Symbol' id="symbolA"  {...register("symbolA") } >
             
             
             {ListOfTokens.map((item, index) => (
                   <option key={item.symbol} value={`ListOfTokens.${index}.symbol`}>
                     {`ListOfTokens.${index}.symbol`}
                   </option>
                                  
                )             
                )
             }
                </Select> 
         
         
          {errors && errors.symbolA && (
            <FormHelperText color="red">
              {errors.symbolA.message && errors.symbolA.message}
            </FormHelperText>
          )}
        </FormControl>

    
        <FormControl>
          <FormLabel htmlFor="tokenBname">TokenB</FormLabel>
          <Select icon={<RiArrowDownSLine />} placeholder='Select Token Symbol' id="tokenBname"  {...register("tokenBname") } >
             
             
             {ListOfTokens.map((item, index) => (
                   <option key={item.tokenname} value={`ListOfTokens.${index}.tokenname`}>
                     {`ListOfTokens.${index}.tokenname`}
                   </option>
                                  
                )             
                )
             }
                </Select> 
          {errors && errors.tokenBname && (
            <FormHelperText color="red">
              {errors.tokenBname.message && errors.tokenBname.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="symbolB">SymbolB</FormLabel>
          <Select icon={<RiArrowDownSLine />} placeholder='Select Token Symbol' id="symbolB"  {...register("symbolB") } >
             
             
             {ListOfTokens.map((item, index) => (
                   <option key={item.symbol} value={`ListOfTokens.${index}.symbol`}>
                     {`ListOfTokens.${index}.symbol`}
                   </option>
                                  
                )             
                )
             }
                </Select> 
          {errors && errors.symbolB && (
            <FormHelperText color="red">
              {errors.symbolB.message && errors.symbolB.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="amount">Amount</FormLabel>

      <NumberInput  step={5} defaultValue={0} min={0} max={100}   >
  <NumberInputField />
  <NumberInputStepper {...register("tokenBname")}>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>

      {errors && errors.amount && (
            <FormHelperText color="red">
              {errors.amount.message && errors.amount.message}
            </FormHelperText>
          )}
        </FormControl>

        <Stack direction='column'> 
       <Wrap spacing={4}>
       <WrapItem>
      <Button colorScheme='pink'  onClick={()=> { 
      
          if(!tokenchosen){
            setTokenChosen(true); 
          }
          else {
            setTokenChosen(false);
          }
      }}>{!tokenchosen?  'ABC' : 'TKA'}</Button>
      </WrapItem>
   
       </Wrap>
       </Stack>

        
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
      {!isSubmitting}? 
      <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
    <h2>
      <AccordionButton>
      (<AccordionIcon />
      </AccordionButton>
      
    </h2>
    <AccordionPanel pb={4}>
    <TransactionDisplay 
    account ={accountsretrieved}
    tokenAname={transactions.tokenAname}
    symbolA={transactions.tokenBname}
    tokenBname={transactions.tokenBname}
    symbolB={transactions.symbolB}
    amount={transactions.amount}
    newamount={transactions.newamount}
    swaphash={transactions.swaphash}
    from={accountsretrieved}
    to={''}
    
    />

    </AccordionPanel>
  </AccordionItem>): (<Text> Transaction not complete</Text>)

  
</Accordion>
  
    </Box>
  
  
  
  );

}

export default PaymentTransfer
