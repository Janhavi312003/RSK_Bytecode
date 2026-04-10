import { normalizeBytecode } from '../normalize';
import { compareBytecode } from '../compare';

/**
 * These tests use bytecode strings shaped like real Solidity artifacts:
 * - runtime bytecode + CBOR-ish metadata blob + 2-byte big-endian length suffix
 *
 * We don't depend on a specific compiler output, but we validate the stripping logic
 * against patterns seen in Foundry/Hardhat outputs (ipfs/solc keys, etc.).
 */
describe('artifact-shaped metadata handling', () => {
  it('Foundry-like metadata can be stripped to runtime bytecode', () => {
    const runtime = '0x6001600055';
    // CBOR-ish bytes (not necessarily valid CBOR, but representative)
    const meta = 'a2646970667358221220a264736f6c6343';
    const len = (meta.length / 2).toString(16).padStart(4, '0');
    const artifactRuntime = runtime + meta + len;

    expect(normalizeBytecode(artifactRuntime, { removeMetadata: true })).toBe(runtime);
  });

  it('Hardhat-like metadata (different length) can be stripped', () => {
    const runtime = '0x6080604052';
    const meta = 'a2646970667358221220a264736f6c6343a164646576';
    const len = (meta.length / 2).toString(16).padStart(4, '0');
    const artifactRuntime = runtime + meta + len;

    expect(normalizeBytecode(artifactRuntime, { removeMetadata: true })).toBe(runtime);
  });

  it('compareBytecode matches runtime vs artifact when ignoreMetadata is true', () => {
    const runtime = '0x6080604052';
    const meta = 'a2646970667358221220a264736f6c6343a164646576';
    const len = (meta.length / 2).toString(16).padStart(4, '0');
    const artifactRuntime = runtime + meta + len;

    const result = compareBytecode(artifactRuntime, runtime, { ignoreMetadata: true });
    expect(result.match).toBe(true);
  });

  it('compareBytecode does not match runtime vs artifact when ignoreMetadata is false', () => {
    const runtime = '0x6080604052';
    const meta = 'a2646970667358221220a264736f6c6343a164646576';
    const len = (meta.length / 2).toString(16).padStart(4, '0');
    const artifactRuntime = runtime + meta + len;

    const result = compareBytecode(artifactRuntime, runtime, { ignoreMetadata: false });
    expect(result.match).toBe(false);
  });
});

