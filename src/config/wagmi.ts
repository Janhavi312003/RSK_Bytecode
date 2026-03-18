import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { rootstock, rootstockTestnet } from 'wagmi/chains';
import { getRpcUrl } from './rpc';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '';

if (typeof window === 'undefined' && !projectId) {
  console.warn(
    '[RSK Bytecode Verifier] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect may not work. Get one at https://cloud.walletconnect.com'
  );
}

export const config = getDefaultConfig({
  appName: 'RSK Bytecode Verifier',
  projectId: projectId || '000000000000000000000000000000000',
  chains: [rootstock, rootstockTestnet],
  transports: {
    [rootstock.id]: http(getRpcUrl(rootstock.id)),
    [rootstockTestnet.id]: http(getRpcUrl(rootstockTestnet.id)),
  },
});
