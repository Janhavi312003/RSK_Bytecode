import { computeBytecodeHash } from './hash';
import { normalizeBytecode } from './normalize';

export interface ComparisonResult {
  match: boolean;
  deployedHash: string;
  localHash: string;
  deployedBytecode: string;
  localBytecode: string;
  differences?: ByteDifference[];
}

export interface ByteDifference {
  index: number;
  deployedByte: string;
  localByte: string;
}

export function compareBytecode(
  deployed: string,
  local: string,
  options?: { ignoreMetadata?: boolean }
): ComparisonResult {
  const normDeployed = normalizeBytecode(deployed, { removeMetadata: options?.ignoreMetadata });
  const normLocal = normalizeBytecode(local, { removeMetadata: options?.ignoreMetadata });

  const deployedHash = computeBytecodeHash(normDeployed);
  const localHash = computeBytecodeHash(normLocal);

  const match = deployedHash === localHash;

  let differences: ByteDifference[] | undefined;
  if (!match) {
    differences = findByteDifferences(normDeployed, normLocal);
  }

  return {
    match,
    deployedHash,
    localHash,
    deployedBytecode: normDeployed,
    localBytecode: normLocal,
    differences,
  };
}

function findByteDifferences(hex1: string, hex2: string): ByteDifference[] {
  // Remove 0x prefix and compare byte by byte (2 chars per byte)
  const raw1 = hex1.startsWith('0x') ? hex1.slice(2) : hex1;
  const raw2 = hex2.startsWith('0x') ? hex2.slice(2) : hex2;
  
  const maxLength = Math.max(raw1.length, raw2.length);
  const diff: ByteDifference[] = [];

  for (let i = 0; i < maxLength; i += 2) {
    const byte1 = raw1.slice(i, i + 2) || '00';
    const byte2 = raw2.slice(i, i + 2) || '00';
    if (byte1 !== byte2) {
      diff.push({
        index: i / 2,
        deployedByte: byte1,
        localByte: byte2,
      });
    }
  }
  return diff;
}