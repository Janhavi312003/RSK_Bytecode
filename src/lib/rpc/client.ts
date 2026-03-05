import { ethers } from 'ethers';
import { SUPPORTED_CHAINS } from '../constants';

export function getRpcProvider(chainId: number) {
  const chain = SUPPORTED_CHAINS.find(c => c.id === chainId);
  if (!chain) throw new Error(`Unsupported chain ID: ${chainId}`);
  return new ethers.JsonRpcProvider(chain.rpcUrl);
}