import { http, createConfig } from 'wagmi';
import { rootstock, rootstockTestnet } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = getDefaultConfig({
  appName: 'RSK Bytecode Verifier',
  projectId,
  chains: [rootstock, rootstockTestnet],
  transports: {
    [rootstock.id]: http(process.env.NEXT_PUBLIC_RSK_MAINNET_RPC),
    [rootstockTestnet.id]: http(process.env.NEXT_PUBLIC_RSK_TESTNET_RPC),
  },
});