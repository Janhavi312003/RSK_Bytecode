/**
 * Normalize bytecode for comparison.
 * Options:
 * - removeMetadata: strips the Solidity metadata by parsing the CBOR length
 *   from the last 2 bytes (big-endian) per Solidity metadata spec.
 * - toLowerCase: ensure hex string is lowercase
 */
export function normalizeBytecode(
  bytecode: string,
  options: { removeMetadata?: boolean } = {}
): string {
  let normalized = bytecode.startsWith('0x') ? bytecode : `0x${bytecode}`;

  if (options.removeMetadata) {
    const raw = normalized.slice(2);
    // Solidity appends: [CBOR metadata][2-byte length in big-endian]
    if (raw.length >= 4) {
      const lengthHex = raw.slice(-4);
      const metadataLengthBytes = parseInt(lengthHex, 16);
      const totalToStrip = (2 + metadataLengthBytes) * 2;
      if (totalToStrip > 0 && totalToStrip < raw.length) {
        normalized = '0x' + raw.slice(0, raw.length - totalToStrip);
      }
    }
  }

  return normalized.toLowerCase();
}
