import { getRpcUrl } from '@/config/rpc';

export const SUPPORTED_CHAINS = [
  {
    id: 30,
    name: 'Rootstock Mainnet',
    network: 'rsk-mainnet',
    get rpcUrl() {
      return getRpcUrl(30);
    },
  },
  {
    id: 31,
    name: 'Rootstock Testnet',
    network: 'rsk-testnet',
    get rpcUrl() {
      return getRpcUrl(31);
    },
  },
];

export const BYTECODE_VERIFICATION_OPTIONS = {
  ignoreMetadataDefault: true,
};
