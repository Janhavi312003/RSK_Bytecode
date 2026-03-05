import { useState } from 'react';
import { usePublicClient } from 'wagmi';
import { compareBytecode, ComparisonResult } from '@/lib/verification/compare';
import { normalizeBytecode } from '@/lib/verification/normalize';

export function useVerification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const publicClient = usePublicClient();

  const verify = async (
    address: `0x${string}`,
    localBytecode: string,
    options?: { ignoreMetadata?: boolean }
  ) => {
    setLoading(true);
    setError(null);
    try {
      if (!publicClient) {
        throw new Error('Public client is not initialized');
      }
      const deployedBytecode = await publicClient.getCode({ address });
      if (!deployedBytecode) {
        throw new Error('No bytecode found at this address');
      }

      const comparison = compareBytecode(deployedBytecode, localBytecode, options);
      setResult(comparison);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, result, error };
}