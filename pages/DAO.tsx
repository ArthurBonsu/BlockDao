import {MenuLabels} from 'types';

import { useRouter } from 'next/router'
import NavBar from '@components/NavBar';
import SimpleTransfer from '@components/SimpleTransfer';
import Footer from '@components/Footer';
import Services from '@components/Services';
import Transactions from '@components/Transaction';
import { ComponentType, FC, useCallback, useState } from 'react'
import { Box, Flex, Icon, Menu, MenuButton, Text, Tooltip , Button,HStack, Center, Breadcrumb,
    BreadcrumbItem,    BreadcrumbLink,    BreadcrumbSeparator, Link, Avatar, Stack, chakra, Heading, ButtonGroup, Grid, grid} from '@chakra-ui/react'
import { ChevronUpIcon, DuplicateIcon, LockClosedIcon, LoginIcon, UserAddIcon, PlusIcon, BookOpenIcon,CubeTransparentIcon } from '@heroicons/react/outline'
import { PresentationChartBarIcon } from '@heroicons/react/solid'
import { useSession, signIn, signOut } from 'next-auth/react';
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import logo from '../images/blockdaologo.png'

// Parameter Libraries 
// Stores Library  
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

//Context 
import  useCrowdsourceContext   from 'context/useCrowdsourceContext'
import  useDaoContext   from 'context/useDaoContext'
import  useSwapContext   from 'context/useSwapContext'
import  useTransactionContext   from 'context/useTransactionContext'
import useTransferContext   from 'context/useTransferContext'


   // Hard Coded but we could set up a page where it can be put into it to be hardcoded


   //homepage: 0,
   //   protectedpage: 'TokenBTC',
   //   Registerpage: 'TOKBTC',
   //   Protectedpage: 100,
   //   logoUri: '0xef719f31e4F71392cDAda87E94e3a9C25Fce88B6'


   // set up the objects 
   // set the arrays into the text for the labels  
   // Set up a link router for each one 
   // Set a route for the onclick 
   // FOr each one route to the main page 

//GETTING THE BLOCKCHAIN ADDRESS HERE 
 


    const DAO: FC = () => {
     const {data: session} = useSession()
    
    const [isCurrentPage, setisCurrentPage] = useState(false)
    const [isRegisteration, setIsRegistration] = useState(false)
    const [isTransaction, setIsTransaction] = useState(false)
    const [isSwapping, setIsSwapping] =  useState(false)
    const address = useEthersStore((state) => state.address)
   
  const {push} = useRouter()

const handleSignOut =async () => {
  const data = await signOut({redirect:false, callbackUrl:'/some'})
  push(data.url)
}
  return (

 <Flex color='white'>
<Center w='100px' bg='green.500'>
<HStack spacing='24px'>


{session ? (
<>
<div className="min-h-screen">
  <div className='gradient-bg-welcome'>  
<Heading > You are signed in as {session.user.email} </Heading>
             <NavBar
               title={'Dao Page For Blockchain'}
               address={'blockchain address'}
                   />
             <SimpleTransfer /> 
<Button > Sign Out</Button> 
 
<Button onClick={async() => {handleSignOut} }    >SignIn </Button>

</div> 
    <DAO  />
    
    <Footer
    message={'Please join us as we make this world a better place'} 
    community={'Community'}
    copyright={'Trademark Policy'} 
    blog={'Blog'}
    FAQ={'FAQ'}
    Contact={'blockdao@gmail.com'}
    Githuburl={'https://github.com/ArthurBonsu'}  
    Twitterurl={'https://twitter.com/home'} 
    Discordurl={'https://uniswap.org/blog/uniswap-v3'}
    />                                  
</div>
</>
) : (
<>
 <Heading > You are not signed in </Heading>
 <Button onClick={async() => {signIn}}> Sign In  </Button>
 </> )
 }
  
  </HStack>
  </Center>
  
</Flex>
  )
  

}
  
  export default DAO; 

