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
    const runtime = '0x6001600055';
    const meta = 'a264697066735822a264736f6c6343';
    const len = (meta.length / 2).toString(16).padStart(4, '0');
    const deployed = runtime + meta + len;
    const local = runtime;

    const result = compareBytecode(deployed, local, { ignoreMetadata: true });
    expect(result.match).toBe(true);
    expect(result.deployedHash).toBe(result.localHash);
    expect(result.differences).toBeUndefined();
  });

  it('does not ignore metadata unless option is set', () => {
    const runtime = '0x6001600055';
    const meta = 'a264697066735822a264736f6c6343';
    const len = (meta.length / 2).toString(16).padStart(4, '0');
    const deployed = runtime + meta + len;
    const local = runtime;

    const result = compareBytecode(deployed, local, { ignoreMetadata: false });
    expect(result.match).toBe(false);
    expect(result.differences?.length).toBeGreaterThan(0);
  });

  it('computes multiple differences when several bytes differ', () => {
    const deployed = '0x00aabbcc';
    const local = '0x00aabbee';
    const result = compareBytecode(deployed, local);
    expect(result.match).toBe(false);
    expect(result.differences).toHaveLength(1);
    expect(result.differences![0]).toEqual({ index: 3, deployedByte: 'cc', localByte: 'ee' });
  });

  it('treats missing 0x prefix consistently via normalization', () => {
    const deployed = 'deadbeef';
    const local = '0xdeadbeef';
    const result = compareBytecode(deployed, local);
    expect(result.match).toBe(true);
  });

  it('marks lengthMismatch when local shorter than deployed', () => {
    const deployed = '0xaabbcc';
    const local = '0xaabb';
    const result = compareBytecode(deployed, local);
    expect(result.match).toBe(false);
    expect(result.lengthMismatch).toBe(true);
    expect(result.differences?.[0]).toEqual({
      index: 2,
      deployedByte: 'cc',
      localByte: MISSING_BYTE,
    });
  });
});
