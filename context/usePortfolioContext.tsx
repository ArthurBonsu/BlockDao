
import { dateAtTime,  } from '@utils/formatDate'
import { RiEmotionNormalLine } from 'react-icons/ri'
  
      
      export type TokenSet ={
        ETH: string
        BTC: string 
        XRP : string 
      }
     
      export type TransactionDesc = {
        timestamp: string
        transaction_type: string       
        token: string 
        amount: string
      
    }
      
    type TokenTypeOptions = Record<string, string>

     export interface GroupedRows  {
        count: number 
        tokenlists: TransactionDesc[]
        date: string 
        tokensettaken : TokenSet

     }

     const tokentype: Record<string, 'ETH' | 'BTC' | 'XRP'> = {
      ETH: 'ETH',
      BTC: 'BTC',
      XRP: 'XRP',
    }
  
     
    export  type  GroupedSheetEntery  = Record<string, TransactionDesc[]>
     export type setRowItem = Record<string, TransactionDesc> 
      

     const filterdetails =  ( groupSheet: GroupedSheetEntery) => {
      const groupsheetkeys = Object.keys(groupSheet);
      groupsheetkeys.map ((key, index) => {
     
  // For Time 
   const getMaxtimestampToken = () => {
    let maxtimestamp; let timeoftimestamp: string;
   
    
       
        const listoftimestamp = groupSheet[key];
        const maximumtimestamp =   listoftimestamp.reduce((prevtransaction, curtransaction) => {
          timeoftimestamp = maximumtimestamp.timestamp;
          return  maxtimestamp=    prevtransaction['timestamp'] > curtransaction['timestamp'] ? prevtransaction :  curtransaction ;
        });

         
        
        return timeoftimestamp;
      }
       
      const getMaxtimestampPerToken = (tokentypeselected: string ) => {
        let maxtimestamp; let timeoftimestamp: string;
       
        
           
            const listoftimestamp = groupSheet[key];
          const selectedTokens =   listoftimestamp.filter(({ token }) => token === tokentypeselected);
            const maximumtimestamp =   selectedTokens.reduce((prevtransaction, curtransaction) => {
              timeoftimestamp = maximumtimestamp.timestamp;
              return  maxtimestamp=    prevtransaction['timestamp'] > curtransaction['timestamp'] ? prevtransaction :  curtransaction ;
            });
    
             
            
            return timeoftimestamp;
          }
       

        const selectTokenType =(tokenexpected:string) => {
          const tokenoptions: TokenSet = { ETH:"ETH", BTC: "BTC", XRP: "XRP" }
          const tokentypeselected = Object.keys(tokenoptions).filter((tokenexpected) => tokenoptions[tokenexpected])[0]
        return   tokentypeselected

        }
     
        const getAllTokenOfParticularType = (tokenchoice: string ) => {
   
        const chosentokentype = selectTokenType(tokenchoice); 
        const tokensofXType = groupSheet[key]
        .filter(({ token }) => token === tokentype[chosentokentype])
         return tokensofXType; 
         }


         const getLatestTokenOfAllThreeTypes = (tokenchoice: string) => {
          const newtime = getMaxtimestampPerToken(tokenchoice);
       
         const alltokensoftype =  getAllTokenOfParticularType(tokenchoice);
         alltokensoftype.filter(({ timestamp }) => timestamp === newtime)
        
         }

         const getLatestTokenOfType = (tokenchoice: string) => {
          const newtime = getMaxtimestampPerToken(tokenchoice);
       
         const alltokensoftype =  getAllTokenOfParticularType(tokenchoice);
         alltokensoftype.filter(({ timestamp }) => timestamp === newtime)
        
         }

        //getLatestTokenOfAllThreeTypes
        //getPortfolioPerToken
        

    })     
    
  
   }

