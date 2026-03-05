import { Address } from 'viem';

export interface VerificationParams {
  contractAddress: Address;
  localBytecode: string;
  ignoreMetadata?: boolean;
}

export interface BytecodeComparison {
  match: boolean;
  deployedHash: string;
  localHash: string;
  deployedBytecode: string;
  localBytecode: string;
  differences?: Array<{
    index: number;
    deployedByte: string;
    localByte: string;
  }>;
}

export interface NetworkConfig {
  id: number;
  name: string;
  rpcUrl: string;
}