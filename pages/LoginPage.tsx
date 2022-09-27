import { Avatar, Button, Flex, Heading, Menu,ButtonProps, useDisclosure, MenuButton, MenuList, Text, useClipboard, Input, Stack, InputGroup, InputLeftElement, InputRightElement ,
  Box,  Grid, VStack, FormControl, FormLabel, FormErrorMessage, FormHelperText,  chakra  
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ComponentType, FC,useState, useEffect } from 'react'
import { ChevronUpIcon, DuplicateIcon, LockClosedIcon, SwitchVerticalIcon, LoginIcon, InboxIcon} from '@heroicons/react/outline'
import { LogoutIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Blockies from 'react-blockies'
import {MenuLabels} from 'types'
import { useAppToast } from '@hooks/index'
import getHiddenVersion from '@utils/getHiddenName'
import {useSession, signIn, signOut} from 'next-auth/react'
import {BsGithub, BsTwitter, BsGoogle} from 'react-icons/bs'

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

const providers = [
 {name: 'github',
  Icon: BsGithub,
},
{name: 'twitter',
 Icon: BsTwitter,
},
{
  name:'google',
  Icon:BsGoogle
}

]

/// THINGS WE NEED  (COLLAPSE AND ADDRESS)
interface LoginProps {
  isCollapsed?: boolean
  username: string  
  email: string  | null
  password: string | null 
}


const Login: FC<LoginProps> = ({ isCollapsed = false, username, email, password }) => {
  const {push} = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const localDisclosure = useDisclosure()

  const { onDisconnect } = useEthers()
  const { hasCopied, onCopy } = useClipboard(username || '')
  const toast = useAppToast()
  const stackSpacing = isCollapsed ? 4 : 1

  const {data:session, status} = useSession()
 4

  useEffect(() => {
    if (hasCopied) {
      toast.showToast('Login details Copied', 'info')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCopied])



  if(status === 'loading') return <Heading> Checking Authentication ... </Heading>
  if(session) {

    setTimeout(() => {
      push('/')
    }, 5000)
    return <Heading> You are already signed in  </Heading>
  }

 const handleOAuthSignIn = (provider) => () => signIn()
 
const handleSubmit = (e) => {
  e.preventDefault()
  if (!email) return false
  signIn('email', {email, redirect: false})
}
const setEmail =(email  ) => {

  return  email
}

  return( 
   <chakra.form onSubmit={handleSubmit}>
    <FormLabel> Email Address</FormLabel> 
    

    <Input type='email' onChange={(e) => setEmail(e.target.value)} />
   {providers.map((item, index) => {
    return (
         <Box key =''>
      <VStack key =''> 
     
      <Button  
      type = 'submit'
     key={item.name} 
     leftIcon={< item.Icon />}
     onClick={handleOAuthSignIn(item.name)}
     textTransform='uppercase'
     w='100%'
   
   >
    Sign in with {item.name}
  </Button>
  </VStack>
  </Box>
 ) }) 
}
  </chakra.form>
    )


// send to me email for password
// send email to server 
// verification code approved 
// refresh page 
// reload the page   

// send to open section function(submit) (name, email, password)
// if true 
// open session 
// route new page 


      

}

export default Login