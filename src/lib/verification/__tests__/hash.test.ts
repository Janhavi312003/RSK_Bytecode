import { computeBytecodeHash } from '../hash';

describe('computeBytecodeHash', () => {
  it('returns keccak256 hash of bytecode', () => {
    const hash = computeBytecodeHash('0x6080604052348015600f57600080fd5b50');
    expect(hash).toMatch(/^0x[0-9a-f]{64}$/);
  });

  it('is deterministic', () => {
    const input = '0xdeadbeef';
    expect(computeBytecodeHash(input)).toBe(computeBytecodeHash(input));
  });

  it('adds 0x if missing', () => {
    const withPrefix = computeBytecodeHash('0xdead');
    const withoutPrefix = computeBytecodeHash('dead');
    expect(withPrefix).toBe(withoutPrefix);
  });

  it('produces different hashes for different input', () => {
    const h1 = computeBytecodeHash('0xaa');
    const h2 = computeBytecodeHash('0xbb');
    expect(h1).not.toBe(h2);
  });
});
