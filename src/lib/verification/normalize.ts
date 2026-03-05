/**
 * Normalize bytecode for comparison.
 * Options:
 * - removeMetadata: strips the Solidity metadata hash (last 53 bytes)
 * - toLowerCase: ensure hex string is lowercase
 */
export function normalizeBytecode(
  bytecode: string,
  options: { removeMetadata?: boolean } = {}
): string {
  let normalized = bytecode.startsWith('0x') ? bytecode : `0x${bytecode}`;
  
  if (options.removeMetadata) {
    // Solidity metadata is typically the last 53 bytes (106 hex chars + 0x)
    // but length can vary. We'll remove the last 53 bytes if bytecode is longer.
    // This is a simplification; production might use a more robust method.
    if (normalized.length > 106) {
      normalized = normalized.slice(0, normalized.length - 106);
    }
  }
  
  return normalized.toLowerCase();
}