import { renderHook, act } from '@testing-library/react';
import { useVerification } from '../useVerification';
import { usePublicClient } from 'wagmi';

jest.mock('wagmi', () => ({
  usePublicClient: jest.fn(),
}));

describe('useVerification', () => {
  const mockGetCode = jest.fn();

  beforeEach(() => {
    (usePublicClient as jest.Mock).mockReturnValue({
      getCode: mockGetCode,
    });
  });

  it('should return comparison result on successful verification', async () => {
    const deployedBytecode = '0x1234';
    const localBytecode = '0x1234';
    mockGetCode.mockResolvedValue(deployedBytecode);

    const { result } = renderHook(() => useVerification());

    await act(async () => {
      await result.current.verify('0xAddress', localBytecode);
    });

    expect(result.current.result?.match).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle error when no bytecode found', async () => {
    mockGetCode.mockResolvedValue(null);

    const { result } = renderHook(() => useVerification());

    await act(async () => {
      await result.current.verify('0xAddress', '0x1234');
    });

    expect(result.current.error).toBe('empty bytecode');
    expect(result.current.loading).toBe(false);
  });

  it('should handle error when deployed bytecode is 0x', async () => {
    mockGetCode.mockResolvedValue('0x');

    const { result } = renderHook(() => useVerification());

    await act(async () => {
      await result.current.verify('0xAddress', '0x1234');
    });

    expect(result.current.error).toBe('empty bytecode');
    expect(result.current.loading).toBe(false);
  });

  it('should handle error when local bytecode is 0x', async () => {
    mockGetCode.mockResolvedValue('0x1234');

    const { result } = renderHook(() => useVerification());

    await act(async () => {
      await result.current.verify('0xAddress', '0x');
    });

    expect(result.current.error).toBe('empty bytecode');
    expect(result.current.loading).toBe(false);
  });
});