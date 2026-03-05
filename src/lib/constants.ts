export const SUPPORTED_CHAINS = [
  {
    id: 30,
    name: 'Rootstock Mainnet',
    network: 'rsk-mainnet',
    rpcUrl: process.env.NEXT_PUBLIC_RSK_MAINNET_RPC || 'https://public-node.rsk.co',
  },
  {
    id: 31,
    name: 'Rootstock Testnet',
    network: 'rsk-testnet',
    rpcUrl: process.env.NEXT_PUBLIC_RSK_TESTNET_RPC || 'https://public-node.testnet.rsk.co',
  },
];

export const BYTECODE_VERIFICATION_OPTIONS = {
  ignoreMetadataDefault: true,
  metadataLength: 53, // bytes
};