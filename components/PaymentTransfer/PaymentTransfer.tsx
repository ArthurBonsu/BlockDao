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
  receipient:string | Array<string> ,
  txhash?:string , 
  USDprice:number,
  paymenthash: string,
  owneraddress: string  
  onPayTransfer: ()=> void
}





const {sendPayment ,sendSimpleTransfer,transactionCount,connectWallet, currentAccount,isLoading,sendTransaction,
    handleChange,formData,transferformData,transactions,paymenttransaction,transfertransaction,isPaid,tokentxreceipt,transferredtokenamount,
    paidTokenamount,ourUSDPrice,accountsprovided,transactioninfocase } = useTransactionContext();
   
// This is for the execution
const PaymentTransfer: React.FC<PaymentTransferProps> = ({
    username,address, amount,comment,receipient,receipients,paymenthash,USDprice, txhash,owneraddress, onPayTransfer,
  ...rest
}) => {



    
  useEffect( onPayTransfer() => {
   
    setIsLoading(true);
         
    paymenthash = await sendPayment({ username, amount, address, USDprice, txhash, paymenthash, owneraddress});
   
      setIsLoading(false);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username,address, amount,comment,receipient,receipients])

  



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
      control,
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<PaymentTransferProps>()
    const { fields, append, remove,isDirty, isSubmitting, append, remove, touchedFields, submitCount, errors  } = useFieldArray({
    
      control,
      name: 'address',
    
      resolver: yupResolver(schema)
    
    })
    
      
    
  
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


  return (
    <Grid placeItems="center" w="full" h="100vh">
      <Box w="500px" shadow="md" p="10" borderRadius="md" bg="gray.50">
        <Flex
          direction="column"
          css={{
            gap: '20px',
          }
        
        }
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text>The Paymet Transfer Solution</Text>
            
            <Button bg="blue.200" _hover={{ bg: 'blue.300' }} textColor="white" onClick={() =>{
              onMultiReceipientOpen();


              append({})
            }>
              Add Owners
            </Button>
          </Flex>
          
          <form onSubmit={handleSubmit(()=> {onPayTransfer()})}>
            {Boolean(fields.length === 0) && <Text>Please add owners..</Text>}
            {fields.map((field, index) => (
              <InputGroup key={field.id} size="sm">
                <Input {...register(`receipient.${index}.value`, { required: true })} mb="5px" bg="white" />
                <InputRightAddon>
                  <Text onClick={() => remove(index)} _hover={{ cursor: 'pointer' }}>
                    Remove
                  </Text>
                </InputRightAddon>
              </InputGroup>
            ))}


            <Flex flexDirection="column" mt="20px">
              <FormControl>
                <FormLabel htmlFor="amount" fontWeight="normal">
                  Other Relevant Information
                </FormLabel>
                <NumberInput max={fields.length} min={1} w="90px">
                  <NumberInputField
                    id="treshold"
                    key="treshold"
                    {...register(`treshold`, { required: true })}
                    bg="white"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>

            <Button
              bg="blue.200"
              _hover={{ bg: 'blue.300' }}
              textColor="white"
              type="submit"
              w="full"
              mt="20px"
              isLoading={isSubmitting}
            >
              Create Safe
            </Button>
          </form>
        </Flex>
      </Box>
    </Grid>
  )

}

export default PaymentTransfer
