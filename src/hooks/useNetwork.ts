import { useAccount, useSwitchChain } from 'wagmi';

export function useNetworkUtils() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const isSupported = chain?.id === 30 || chain?.id === 31; // Rootstock Mainnet/Testnet

  return {
    currentChain: chain,
    isSupported,
    switchChain,
  };
}
