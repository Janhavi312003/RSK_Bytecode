import { normalizeBytecode } from '../normalize';

describe('normalizeBytecode', () => {
  it('adds 0x prefix when missing', () => {
    expect(normalizeBytecode('dead')).toBe('0xdead');
  });

  it('keeps 0x when present', () => {
    expect(normalizeBytecode('0xdead')).toBe('0xdead');
  });

  it('returns lowercase hex', () => {
    expect(normalizeBytecode('0xDEADBEEF')).toBe('0xdeadbeef');
  });

  it('strips metadata by parsing length from last 2 bytes (big-endian)', () => {
    // Solidity format: [bytecode][CBOR of length L][2 bytes = L in big-endian]
    // Last 2 bytes = 0x0005 means 5 bytes of CBOR; we strip (2+5)*2 = 14 hex chars
    const withoutMeta = '0x6080604052348015600f57600080fd5b50';
    const cbor5Bytes = 'a164736f6c'; // 5 bytes = 10 hex chars
    const withMeta = withoutMeta + cbor5Bytes + '0005'; // length 5 in last 2 bytes
    const normalized = normalizeBytecode(withMeta, { removeMetadata: true });
    expect(normalized).toBe(withoutMeta);
  });

  it('does not strip when removeMetadata is false', () => {
    const code = '0xdeadbeef';
    expect(normalizeBytecode(code, { removeMetadata: false })).toBe('0xdeadbeef');
  });

  it('handles short bytecode (no metadata) without throwing', () => {
    const short = '0xab';
    expect(normalizeBytecode(short, { removeMetadata: true })).toBe('0xab');
  });
});
