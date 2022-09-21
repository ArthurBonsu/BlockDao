import { CreateTransferInput } from 'types'
import { InferType, number, object, SchemaOf, string, array } from 'yup'
import { TokenTypesDetails, CreateSwapTransferInput } from 'types'

// This sets the schema for validation we use yep for this 
export const createTransferFormSchema: SchemaOf<{ recipients: Array<Omit<CreateTransferInput, 'accessType'>> }> =
  object().shape({
    recipients: array().of(
      object().shape({
        asset: string().required('Asset is required.'),
        amount: number()
          .positive('Must be a positive number')
          .typeError('Must be a number.')
          .required('Amount is required.'),
        recipient: string().required('Recipient is required.'),
      })
    ),
  })

export type TCreateTransferFormSchemaValues = InferType<typeof createTransferFormSchema>


// This sets the schema for validation we use yep for this 
export const createSwapFormSchema: SchemaOf<{ tokendetails:TokenTypesDetails}> =
  object().shape({
    
        symbol: string().required('Number is required.'),
        tokenstring: string().required('Number is required here'),
        decimals: number().required('Decimals is required.'),
        logoUri: string().required('Logo is required.'),
          address: string().required('Recipient is required.'),
      // Required must be added
    
  }).required()



export type TCreateSwapTransferInput = InferType<typeof createSwapFormSchema>


// This sets the schema for validation we use yep for this 
export const createSwapTransferFormSchema: SchemaOf<{ swaptokendetails:CreateSwapTransferInput}> =
  object().shape({
    tokenAname:string().required('Token name is required.'),
    symbolA:string().required('Symbol is required.'),
    tokenBname: string().required('Token name  is required.'),
    symbolB:string().required('Symbol  is required.'),
    amount:number().required('Amount is required.'),
       
    
  }).required()


 
export type TcreateSwapTransferFormSchema = InferType<typeof createSwapTransferFormSchema>
