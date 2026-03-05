import { keccak256 } from 'viem';

export function computeBytecodeHash(bytecode: string): string {
  const normalized = bytecode.startsWith('0x') ? bytecode : `0x${bytecode}`;
  return keccak256(normalized as `0x${string}`);
}