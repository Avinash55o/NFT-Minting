//connect the frontend and the smart contract.

import nftMarketplace from '../constants/MyNFT.json';
import {ethers} from "ethers"
export const NFTMarketPlaceAdddress="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


export const getContract = async (): Promise<ethers.Contract | null> => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(NFTMarketPlaceAdddress, nftMarketplace.abi, signer);
    }
    return null;
  };