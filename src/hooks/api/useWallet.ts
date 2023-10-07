import { providers } from 'ethers';
import { CHAIN_ID, CHAIN_RPC } from 'config/common';

export const useWallet = () => {
  const provider = new providers.JsonRpcProvider(CHAIN_RPC, {
    chainId: CHAIN_ID,
    name: 'verichain',
  });

  const getSigner = (addr: string) => provider.getSigner(addr);

  return {
    getSigner,
  };
};
