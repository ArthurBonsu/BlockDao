import { ethers } from 'ethers'
const hre = require ("hardhat")
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import {ethAdaptername} from 'utils/ethadapters'


import Safe, { SafeFactory, SafeAccountConfig,EthSignSignature } from '@gnosis.pm/safe-core-sdk';

import SafeServiceClient, { SafeInfoResponse } from '@gnosis.pm/safe-service-client'
import { moduleAbi } from '@constants/abi'

const MODULE_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
const txServiceUrl = "https://safe-transaction.rinkeby.gnosis.io"
//const safeService = new SafeServiceClient('https://safe-transaction.rinkeby.gnosis.io',)



const iface = new ethers.utils.Interface(moduleAbi)
const data = iface.encodeFunctionData('enableModule', [MODULE_ADDRESS])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any

type ReturnType = {
  status: 'waiting' | 'success'
}


//Nuance problem, a transaction must be created on the blockchain for us to do a Gnosis safe to it .

// function for enablinng module, creates transactions and sends multiple transactions
// We could create several modules and create them with
export const enableModule = async (safeAddress: string): Promise<ReturnType> => {

  const web3Provider = window.ethereum
  const provider = new hre.ethers.providers.Web3Provider(web3Provider)
  const owner = provider.getSigner(0)

  const [signer] = await hre.ethers.getSigners();
  const ethAdapter = new EthersAdapter({ ethers, signer });
  const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });

  const safe = await Safe.create({
    ethAdapter: new EthersAdapter({
      ethers,
      signer: owner,
    }),
    safeAddress,
  })
  const signedUser = await owner.getAddress()
  const { threshold }: SafeInfoResponse = await safeService.getSafeInfo(safeAddress)
  // create transaction object
  const transaction = await safe.createTransaction({
    to: safeAddress,
    value: '0',
    data,
  })

  const { data: transactionData } = transaction
  const multisigTransactions = await safeService.getMultisigTransactions(safeAddress)
  const sameTransaction = multisigTransactions.results.find(
    ({ data: transactionItem }) => transactionItem === transactionData.data
  )
  const isCurrentUserAlreadySigned = sameTransaction?.confirmations?.some(
    ({ owner: ownerItem }) => ownerItem === signedUser
  )

  if (isCurrentUserAlreadySigned) {
    return { status: 'waiting' }
  }

  // sign, shows modal
  await safe.signTransaction(transaction).catch((err) => err)

  // gets txhas
  const safeTxHash = await safe.getTransactionHash(transaction)

  // sends transaction offchain
  await safeService.proposeTransaction({
    safeAddress,
    safeTransaction: transaction,
    safeTxHash,
    senderAddress: signedUser,
  })

  if (sameTransaction?.confirmations?.length) {
    if (threshold - sameTransaction.confirmations.length <= 1) {
      sameTransaction.confirmations.forEach((confirmation) => {
        const signature = new EthSignSignature(confirmation.owner, confirmation.signature)
        transaction.addSignature(signature)
      })
      const { transactionResponse } = await safe.executeTransaction(transaction)
      await transactionResponse?.wait()
      return { status: 'success' }
    }
  }
  return { status: 'waiting' }
}

export default enableModule
