export const RPC_URLS = {
  mainnet: process.env.NEXT_PUBLIC_RSK_MAINNET_RPC || 'https://public-node.rsk.co',
  testnet: process.env.NEXT_PUBLIC_RSK_TESTNET_RPC || 'https://public-node.testnet.rsk.co',
};

export const getRpcUrl = (chainId: number): string => {
  switch (chainId) {
    case 30:
      return RPC_URLS.mainnet;
    case 31:
      return RPC_URLS.testnet;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};