import { useNetwork, useSwitchNetwork } from 'wagmi';

export function useNetworkUtils() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isSupported = chain?.id === 30 || chain?.id === 31; // Rootstock Mainnet/Testnet

  return {
    currentChain: chain,
    isSupported,
    switchNetwork,
  };
}