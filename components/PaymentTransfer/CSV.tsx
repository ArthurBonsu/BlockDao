import React,{ useCallback, useState, useEffect,ComponentType, FC, } from 'react' 
import { read, utils, writeFile } from 'xlsx';
import { Stack, Heading, Button, ButtonProps, Flex, useDisclosure, AlertDialog,Alert,  AlertDialogBody,  AlertDialogCloseButton,  AlertDialogContent,
    AlertDialogFooter,  chakra, AlertDialogHeader,  AlertDialogOverlay,   UseDisclosureReturn, Select,FormErrorMessage, FormControl, FormLabel,
    NumberInput,NumberInputField, NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper, Input,IconButton, AlertIcon, Grid,
      Box,  Text,  InputGroup,  InputRightAddon, FormHelperText,Wrap,  WrapItem, VisuallyHidden, VisuallyHiddenInput, Accordion,AccordionItem,AccordionButton,
      AccordionPanel, AccordionIcon } from '@chakra-ui/react'
  import { max } from "lodash";
import { mintmeEvent } from "typechain/contracts/FileToken";
import  usePortFolioContext   from 'context/usePortfolioContext'
import { dateAtTime,  timeAgo,   dateFormat, DateType } from '@utils/formatDate'
import { useFormContext, useFieldArray ,useForm, Controller } from 'react-hook-form'
import { ethers } from 'ethers'
const hre = require("hardhat")
import { yupResolver } from '@hookform/resolvers/yup';
    import { useRouter } from 'next/router'
import {RiArrowDownSLine} from 'react-icons/all'
import {  createSwapFormSchema, createSwapTransferFormSchema,  } from '../../validation'
  import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/outline'
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

import * as yup from "yup";
import { setValues } from 'framer-motion/types/render/utils/setters'
import Router from 'next/router'
import { useQuery } from 'react-query'
import queries from "@services/queries";
import { RowType,TokensSelected, CSVProps, CSVPropsType } from "types/index";
import {  createCSCFormSchema, TcreateCSCFormSchemaValues  } from '../../validation'


 const SelectedTokenList : TokensSelected[] = [
  {
  name: 'Bitcoin',
  symbol: 'BTC',
 },
 {
  name: 'Ethereum',
  symbol: 'ETH',
 },
 {
  name: 'XRP',
  symbol: 'XRP',
 },
]


let timestampstore: Array<String> ; let transaction_typestore: Array<string>; let tokenstore: Array<String>; 
let amountstore:Array<string> ;  let timestampgiven, _thetransactiontype, tokengained,amountpushed ;
let rows: Array<RowType>;
 

      const PVPerTokens = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
                   
        return (
      <Stack spacing={6}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Heading as='h1' size='4xl' noOfLines={1}> View Payment Transaction of User : {account} From Here     </Heading>
         <br>
        <Text as='b'> Username</Text>
        <Text as='b'>{username}</Text>
        </br>
      
        <br>
        <Text as='b'> Payment Hash</Text>
        <Text as='b'>{paymenthash}</Text>
        </br>
      
      
        {receipients.map((item ,index) =>{
          <>
          <Text as='b'> Receipient:  {index} </Text>
         <Text as='b'>First Token </Text>
       </>
        } )
      }
         <br>
        <Text as='b'> Owner Address  </Text>
        <Text as='b'>{contractowneraddress} </Text>
        </br>
       
        <>
        <Text as='b'>Amount of Tokens </Text>
        <Text as='b'>{amount} </Text>
        </>
        
        <>
        <Text as='b'>Price </Text>
        <Text as='b'>{usdPrice} </Text>
        </>
      </Box>
          </Stack>
        )
      }
      

      const PVForToken = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
       
       
       
        return (
      <Stack spacing={6}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Heading as='h1' size='4xl' noOfLines={1}> View Payment Transaction of User : {account} From Here     </Heading>
         <br>
        <Text as='b'> Username</Text>
        <Text as='b'>{username}</Text>
        </br>
      
        <br>
        <Text as='b'> Payment Hash</Text>
        <Text as='b'>{paymenthash}</Text>
        </br>
      
      
        {receipients.map((item ,index) =>{
          <>
          <Text as='b'> Receipient:  {index} </Text>
         <Text as='b'>First Token </Text>
       </>
        } )
      }
         <br>
        <Text as='b'> Owner Address  </Text>
        <Text as='b'>{contractowneraddress} </Text>
        </br>
       
        <>
        <Text as='b'>Amount of Tokens </Text>
        <Text as='b'>{amount} </Text>
        </>
        
        <>
        <Text as='b'>Price </Text>
        <Text as='b'>{usdPrice} </Text>
        </>
      </Box>
          </Stack>
        )
      }
      
      const DatePerTokens = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
       
       
       
        return (
      <Stack spacing={6}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Heading as='h1' size='4xl' noOfLines={1}> View Payment Transaction of User : {account} From Here     </Heading>
         <br>
        <Text as='b'> Username</Text>
        <Text as='b'>{username}</Text>
        </br>
      
        <br>
        <Text as='b'> Payment Hash</Text>
        <Text as='b'>{paymenthash}</Text>
        </br>
      
      
        {receipients.map((item ,index) =>{
          <>
          <Text as='b'> Receipient:  {index} </Text>
         <Text as='b'>First Token </Text>
       </>
        } )
      }
         <br>
        <Text as='b'> Owner Address  </Text>
        <Text as='b'>{contractowneraddress} </Text>
        </br>
       
        <>
        <Text as='b'>Amount of Tokens </Text>
        <Text as='b'>{amount} </Text>
        </>
        
        <>
        <Text as='b'>Price </Text>
        <Text as='b'>{usdPrice} </Text>
        </>
      </Box>
          </Stack>
        )
      }
      
      const DatePerToken = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
       
       
       
        return (
      <Stack spacing={6}>
          <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Heading as='h1' size='4xl' noOfLines={1}> View Payment Transaction of User : {account} From Here     </Heading>
         <br>
        <Text as='b'> Username</Text>
        <Text as='b'>{username}</Text>
        </br>
      
        <br>
        <Text as='b'> Payment Hash</Text>
        <Text as='b'>{paymenthash}</Text>
        </br>
      
      
        {receipients.map((item ,index) =>{
          <>
          <Text as='b'> Receipient:  {index} </Text>
         <Text as='b'>First Token </Text>
       </>
        } )
      }
         <br>
        <Text as='b'> Owner Address  </Text>
        <Text as='b'>{contractowneraddress} </Text>
        </br>
       
        <>
        <Text as='b'>Amount of Tokens </Text>
        <Text as='b'>{amount} </Text>
        </>
        
        <>
        <Text as='b'>Price </Text>
        <Text as='b'>{usdPrice} </Text>
        </>
      </Box>
          </Stack>
        )
      }
      

const CSVSubmit =( {rows, date,pvvalue,timestamp,transaction_type,token,amount}: CSVProps )=> {


    const [porfoliodetails, setPortfolioDetails    ] = useState([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [_tokenselect, setTokenSelected] = useState(false); 
    const [dateselect, setDatePicker] = useState(false); 

    const schema = yup.object().shape({

    
      rows: yup.array<RowType>().required(),
      date? : yup.string().required(), 
      pvvalue:yup.string().required(),
      timestamp: yup.string().required(),
      transaction_type:yup.string().required(),
      token:yup.string().required(),
      amount:yup.string().required(),
    }).required();

    const {
     
      
      watch,
      // Read the formState before render to subscribe the form state through the Proxy
      formState: {  isDirty, touchedFields, submitCount },
    } = useForm<CSVProps>(
{ 
  resolver: yupResolver(schema),
        defaultValues: 
        {
     
          rows: rows,
          date? : date, 
          pvvalue?: pvvalue,
          timestamp?: timestamp,
          transaction_type:'WITHDRAWAL',
          token: 'ETH',
          amount: '0',
          },  
        } );
       const amountWatch = watch("amount")
  
      const handleChange = (event) => { 
     
        setValue(event.target.value)
       
        // Logic of token conversion must be here
      
      }
    const {
  
      formState: { errors },      
     
    } = useFormContext<CSVProps>()
    
    
    const {
      control,
     
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<CSVProps>()
    const { fields, append, remove} = useFieldArray({
      control,
   
          name: 'rows',
     
          
        },
         
   )
  
 
 const {getMaxtimestampToken,  getMaxtimestampPerToken,  selectTokenType,
  getAllTokenOfParticularType,  getLatestTokenOfType,  getLatestTokenOfAllThreeTypes,
  getWithdrawnAmountOfTokenType,  getDepositedAmountOfTokenType,  getPortFolioValueOfSpecifiedToken,
  getPortFolioWithDate,  getDatedWithdrawnAmountOfTokenType,  getDatedDepositedAmountOfTokenType,
  getDatedPortFolioValueOfTokenType,getDatedPortFolioValueOfAllThreeTypes}   = usePortFolioContext();

  
  
  const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                const sheet1 = wb.SheetNames[0];
                      //read sheet 1 to json
                if (sheets.length) { 
                    // JSON LIST 
                    rows= utils.sheet_to_json(wb.Sheets[sheets[0]]);             
                    setPortfolioDetails(rows);
                    // Map is used to retrieve values of array of objects
                    // so we have all content in an array for an easy search
                   
                      // RETRIEVING JSON VALUES AND PUTTING INTO ARRAY
                    porfoliodetails.map((item, index) => {
                       
                        timestampgiven  = String(item.timestamp); 
                        _thetransactiontype  = String(item.transact_type); 
                        tokengained  = String(item.token); 
                        amountpushed  = String(item.amount); 
                        timestampstore.push(timestampgiven);
                        transaction_typestore.push(_thetransactiontype);
                        tokenstore.push(tokengained);   
                        amountstore.push(amountpushed);           
                    })
                    }
          
            reader.readAsArrayBuffer(file);
        }
    }
      
    const handleExport = () => {
        const headings = [[
            'timestamp',
            'transaction_type',
            'token',
            'amount'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, porfoliodetails, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Transaction CSV');
        writeFile(wb, 'Transaction CSV.xlsx');
    
      }
  
        // BUTTON REVEALS
      // onTokenSelected 
      // onDatePicked

      // function getters
      // onGetLPVs
      // onGetLPVPerToken
      // onGetLSpecifiedTokenPV
      // onGetLSpecifiedDateAndTokenPV



      const onGetLPVs =() => {



      }
 const onTokenSelected =() => {
  setIsLoading(true);
  setTokenSelected(true);

  return (
    <>
<div className="min-h-screen">
  <div className='gradient-bg-welcome'>  
<Text > You can  </Text>
            
 
<Button onClick={() => {
  
  onGetLPVPerToken} }    >SignIn </Button>

</div>                            
</div>
</>
  )
  setIsLoading(false);
 }

 
 const onDatePicked =() => {
  setIsLoading(true);
  setTokenSelected(true);

  return (
    <>
<div className="min-h-screen">
  <div className='gradient-bg-welcome'>  
<Text > You can  </Text>
            
 
<Button onClick={() => {
  
  onGetLPVPerToken} }    >SignIn </Button>

</div>                            
</div>
</>
  )
  setIsLoading(false);
 }


 }
     
    

return (
  <form onSubmit={handleSubmit(()=> {CSVSubmit( {rows, date,pvvalue,timestamp,transaction_type,token,amount})})}>
  <chakra.form py={2}>
    
  
   {fields.map((item, index) => {
           const rowsError = errors.rows
          const amountError = errors.amount
          const dateError = errors.date
          const pvvalueError = errors.pvvalue
          const timestampError = errors.timestamp
          const transaction_type = errors.transaction_type
          const token  = errors.token
          const isLastIndex = fields.length - 1 === index
         const isLastItem = fields.length - 1 === index

      return (
        <Flex flexDirection="row" py={4} key={item.id}>
         
       
          <FormControl id={`tokenlist.${index}.amount`} w="150px" isInvalid={!!amountError?.message} mx={2}>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <NumberInput
              {...register("amount" )}
              id={"amount"}
              step={0.01}
              precision={2}
              min={0}
              max={undefined}
              onChange={handleChange}
              isReadOnly={isLoading}
            >
              <NumberInputField name={"amount"} placeholder="0.00" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{amountError?.message}</FormErrorMessage>
          </FormControl>


          <FormControl w="150px" id={`SelectedTokenList.${index}.symbol`} isInvalid={!!tokennameError?.message} mx={2}>
            <FormLabel> TokenLists</FormLabel>
            <>     
            <Select {...register("token")} placeholder="Select option" isReadOnly={isLoading} onSelect={ manageSelection} 
             >
               
               
                  {SelectedTokenList.map((item, index) => (
                <option key={item.name} value={`SelectedTokenList.${index}.symbol`}>
                  {`SelectedTokenList.${index}.symbol`}
                </option>
                   
             
             ) )
                        
              }
      </Select>
                   
           <FormErrorMessage>{tokennameError?.message}</FormErrorMessage>
            </>
          </FormControl> 
      
          <FormControl w="150px" id={`SelectedTokenList.${index}.symbol`} isInvalid={!!tokennameError?.message} mx={2}>
            <FormLabel> TokenLists</FormLabel>
            <>     
            <Input  placeholder="Select Date and Time"  size="md"  type="datetime-local"  {...register("date")}/>
                       
             <FormErrorMessage>{tokennameError?.message}</FormErrorMessage>
            </>
          </FormControl> 
      
        </Flex>
      )
    })}
      <Stack direction='row' spacing={4}>
       
       <Button
       isLoading
       loadingText={isLoading? 'Reconnecting Metamask' : 'Connected'}  
       colorScheme='teal'
        variant='outline'
        onClick={()=> {              
       return(
         <>
        <AppAlertDialog
         isLoading={isLoading}
         handleSubmit={() =>{ onConnect()
         setIsLoading(false)}}
         header="Connect Metamask"
         body="Press Connect To Retry to Connect To Your Metamask Again"
         disclosure={localDisclosure}
         /// An Onclose Event or function 
         customOnClose={() => {
           localDisclosure.onClose()
           setIsLoading(false)
           
         }}
      
       />
       
       </>
       ) 
     
     }
   }
>         
Connect Metamask
</Button>
</Stack>   

<Stack direction='row' spacing={4}>

  <Button
    isLoading
    loadingText='Setting Up Metamask'
    colorScheme='teal'
    variant='outline'
    onSubmit={CreateMultisigAlert}
  >
    Submit
    
  </Button>

</Stack>
  </chakra.form>
  </form>
)

};

export default CSVImportAndExport