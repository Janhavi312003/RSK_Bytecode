import { computeBytecodeHash } from './hash';
import { normalizeBytecode } from './normalize';

/** Placeholder for missing byte when bytecode lengths differ */
export const MISSING_BYTE = '--';

export interface ComparisonResult {
  match: boolean;
  deployedHash: string;
  localHash: string;
  deployedBytecode: string;
  localBytecode: string;
  /** True when normalized bytecodes had different lengths (missing bytes, not just different values) */
  lengthMismatch?: boolean;
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
  let lengthMismatch: boolean | undefined;
  if (!match) {
    const { diff, lengthDiff } = findByteDifferences(normDeployed, normLocal);
    differences = diff;
    lengthMismatch = lengthDiff;
  }

  return {
    match,
    deployedHash,
    localHash,
    deployedBytecode: normDeployed,
    localBytecode: normLocal,
    lengthMismatch,
    differences,
  };
}

function findByteDifferences(
  hex1: string,
  hex2: string
): { diff: ByteDifference[]; lengthDiff: boolean } {
  const raw1 = hex1.startsWith('0x') ? hex1.slice(2) : hex1;
  const raw2 = hex2.startsWith('0x') ? hex2.slice(2) : hex2;
  const lengthDiff = raw1.length !== raw2.length;

  const maxLength = Math.max(raw1.length, raw2.length);
  const diff: ByteDifference[] = [];

  for (let i = 0; i < maxLength; i += 2) {
    const byte1 = raw1.slice(i, i + 2);
    const byte2 = raw2.slice(i, i + 2);
    const b1 = byte1 || MISSING_BYTE;
    const b2 = byte2 || MISSING_BYTE;
    if (b1 !== b2) {
      diff.push({
        index: i / 2,
        deployedByte: b1,
        localByte: b2,
      });
    }
  }
  return { diff, lengthDiff };
}
