import create, { State } from 'zustand'

import { Web3Provider } from '@ethersproject/providers/lib'
import { SwapNewTokenTransaction  } from 'types/ethers'
import supportedChains from '@constants/supportedChains'
import { Chain } from 'types/ethers'

interface EtherStore extends State {
  account: string
  accounts: Array<String> 
  provider: Web3Provider | null 
  swaphash: SwapNewTokenTransaction['swaphash']
  setAccount: (address: EtherStore['account']) => void
  setProvider: (provider: EtherStore['provider']) => void
  setAccounts: (accounts: EtherStore['accounts']) => void
  setSwapTransactionHash: (swaptransaction: EtherStore['swaphash']) => void
  setEtherStore: (values: Omit<EtherStore, 'setProvider' | 'setAccount' | 'setProvider' | 'setSwapTransactionHash' | 'setEtherStore' >) => void
}

export const INITIAL_STATE = {
  address: '',
  provider: null,
  chainId: supportedChains[0].chainId,
}

export const useEthersStore = create<EtherStore>((set) => ({
  ...INITIAL_STATE,
  setAddress: (address) => set({ address }),
  setProvider: (provider) => set({ provider }),
  setChainId: (chainId) => set({ chainId }),
  setEtherStore: (values) => set(values),
}))
