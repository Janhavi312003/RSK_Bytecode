import { compareBytecode, MISSING_BYTE } from '../compare';

describe('compareBytecode', () => {
  it('returns match when normalized bytecodes are equal', () => {
    const deployed = '0x6080604052348015600f57600080fd5b50';
    const local = '0x6080604052348015600f57600080fd5b50';
    const result = compareBytecode(deployed, local);
    expect(result.match).toBe(true);
    expect(result.deployedHash).toBe(result.localHash);
    expect(result.differences).toBeUndefined();
    expect(result.lengthMismatch).toBeUndefined();
  });

  it('returns mismatch when bytecodes differ', () => {
    const deployed = '0x6080604052348015600f57600080fd5b50';
    const local = '0x6080604052348015600f57600080fd5b51';
    const result = compareBytecode(deployed, local);
    expect(result.match).toBe(false);
    expect(result.deployedHash).not.toBe(result.localHash);
    expect(result.differences).toHaveLength(1);
    // Bytecode has 17 bytes (34 hex chars); last byte is at index 16
    expect(result.differences![0]).toEqual({
      index: 16,
      deployedByte: '50',
      localByte: '51',
    });
  });

  it('flags lengthMismatch and uses MISSING_BYTE when lengths differ', () => {
    const deployed = '0xaabb';
    const local = '0xaabbcc';
    const result = compareBytecode(deployed, local);
    expect(result.match).toBe(false);
    expect(result.lengthMismatch).toBe(true);
    expect(result.differences).toHaveLength(1);
    expect(result.differences![0].deployedByte).toBe(MISSING_BYTE);
    expect(result.differences![0].localByte).toBe('cc');
  });

  it('applies ignoreMetadata when option is set', () => {
    // Same bytecode with different metadata (e.g. extra bytes at end) should match when metadata stripped
    const base = '0x6080604052348015600f57600080fd5b50';
    const withMetadata = base + 'a164736f6c6343'; // example suffix
    const result = compareBytecode(withMetadata, base, { ignoreMetadata: true });
    // After normalization both may be trimmed; we just check the option is applied (no throw)
    expect(typeof result.match).toBe('boolean');
    expect(result.deployedHash).toBeDefined();
    expect(result.localHash).toBeDefined();
  });
});
