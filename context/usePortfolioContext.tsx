
      import { dateAtTime,  } from '@utils/formatDate'
  
      
      export type TransactionType ={
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
      
     export interface GroupedRows  {
        count: number 
        tokenlists: TransactionDesc[]
        date: string 
        tokenpreferred : TransactionType

     }

    export   const transactiontypechosen: Record<string, 'ETH' | ' BTC' |'XRP'> ={
           ETH: 'ETH',
           BTC: 'BTC',
           XRP: 'XRP'
      } 
     
    export  type  GroupedSheetEntery  = Record<string, TransactionDesc[]>
     export type setRowItem = Record<string, TransactionDesc> 
      
