import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { rootstock, rootstockTestnet } from 'wagmi/chains';
import { getRpcUrl } from './rpc';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '';

if (!projectId) {
  const message =
    '[RSK Bytecode Verifier] Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID. Set it from https://cloud.walletconnect.com';
  if (process.env.NODE_ENV === 'production') {
    throw new Error(message);
  }
  console.warn(message);
}

export const config = getDefaultConfig({
  appName: 'RSK Bytecode Verifier',
  projectId,
  chains: [rootstock, rootstockTestnet],
  transports: {
    [rootstock.id]: http(getRpcUrl(rootstock.id)),
    [rootstockTestnet.id]: http(getRpcUrl(rootstockTestnet.id)),
  },
});
