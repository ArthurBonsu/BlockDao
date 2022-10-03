import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import { Button, ButtonProps, Flex, useDisclosure, AlertDialog,Alert,  AlertDialogBody,  AlertDialogCloseButton,  AlertDialogContent,
    AlertDialogFooter,  AlertDialogHeader,  AlertDialogOverlay,   UseDisclosureReturn, Select,FormErrorMessage, FormControl, FormLabel,
    NumberInput,NumberInputField, NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper, Input,IconButton, AlertIcon, Grid,
      Box,  Text,  InputGroup,  InputRightAddon, FormHelperText,Wrap,  WrapItem, VisuallyHidden, VisuallyHiddenInput, Accordion,AccordionItem,AccordionButton,
      AccordionPanel, AccordionIcon } from '@chakra-ui/react'
  import { max } from "lodash";
import { mintmeEvent } from "typechain/contracts/FileToken";
import { dateAtTime } from '@utils/formatDate' 
import  usePortfolioContext   from 'context/usePortfolioContext'

let timestampstore: Array<String> ; let transaction_typestore: Array<string>; let tokenstore: Array<String>; 
let amountstore:Array<string> ; 


      const LatestPV = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
      
         
      
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
      

      const LatestPVPerToken = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
       
       
       
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
      
      const DatePerPV = ({ account, username, paymenthash, receipients , contractowneraddress,  amount, usdPrice  }) => {
       
       
       
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
      
        
const CSVImportAndExport = () => {
    const [porfoliodetails, setPortfolioDetails
    ] = useState([]);
  const   {TransactionType,TransactionDesc, GroupedRows, GroupedSheetEntery, setRowItem}  = usePortfolioContext();

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
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);             
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
    
    
     const getlatestTimestamp = ( ) => {
       
      
        timestampstore.map((index, item ) =>{
         
        const  highesttoken = max(timestampstore); 
     });

     const getLatestToken = ( ) => {
        const filter  = ( groupedrowentery: GroupedSheetEntery,     rowobject: setRowItem   )  => {

            const groupedtimestamp = groupedrowentery
            .filter(({ type }) => type === included[status] || 'executed')
            .map((item) => item[date[status]])
            .sort()
            .filter(Boolean)[0]
             
    
    
         

    }

    }

    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button onClick={handleExport} className="btn btn-primary float-right">
                                Export Transactions <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Timestamp</th>
                                <th scope="col">Transaction Type</th>
                                <th scope="col">Token</th>
                                <th scope="col">Amount</th>
                         
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    porfoliodetails.length
                                    ?
                                    porfoliodetails.map((item, index) => (
                                            <tr key={index}>                                            
                                            <th scope="row">{// shifting to the next line after collums
                                             index + 1 }</th>
                                            <td>{ item.timestamp }</td>
                                            <td>{ item.transaction_type }</td>
                                            <td>{ item.token }</td>
                                            <td><span className="badge bg-warning text-dark">{ item.amount }</span></td>
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <Text> No movies found  </Text>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                </div>
            </div>

            <Box m="5">
      <form onSubmit={handleSubmit(()=> {onSubmit(tokenAname, symbolA,tokenBname,symbolB, amount)})}>
       
        <FormControl>
       
          <FormLabel htmlFor="tokenAname">Token A</FormLabel>
       
          <Select icon={<RiArrowDownSLine />} placeholder='Select Tokenname' id="tokenAname"  {...register("tokenAname") } >
             
             
          {ListOfTokens.map((item, index) => (
                <option key={item.tokenname} value={`ListOfTokens.${index}.tokenname`}>
                  {`ListOfTokens.${index}.tokenname`}
                </option>
                               
             )             
             )
          }
             </Select> 

           
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
  
            <Button
              bg="blue.200"
              _hover={{ bg: 'blue.300' }}
              textColor="white"
              type="submit"
              w="full"
              mt="20px"
              isLoading={isSubmitting}
            >
             Load All Sheet 
            </Button>


            <Button
              bg="blue.200"
              _hover={{ bg: 'blue.300' }}
              textColor="white"
              type="submit"
              w="full"
              mt="20px"
              isLoading={isSubmitting}
            >
             Load All Sheet 
            </Button>

            <Button
              bg="blue.200"
              _hover={{ bg: 'blue.300' }}
              textColor="white"
              type="submit"
              w="full"
              mt="20px"
              isLoading={isSubmitting}
            >
             Load All Sheet 
            </Button>
        </>
                   
    );
};

export default CSVImportAndExport