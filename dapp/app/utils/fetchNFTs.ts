import { ethers } from 'ethers';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../constants/contracts';

export interface NFTData {
  id: number;
  name: string;
  owner: string;
  price: number;
  image: string;
  tokenURI: string;
}

export async function fetchNFTs(): Promise<NFTData[]> {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask to use this feature');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );

    // Get the total number of NFTs
    const totalSupply = await contract.totalSupply();
    const nfts: NFTData[] = [];

    // Fetch each NFT's data
    for (let i = 0; i < totalSupply.toNumber(); i++) {
      const tokenURI = await contract.tokenURI(i);
      const owner = await contract.ownerOf(i);
      
      // Fetch metadata from IPFS
      const response = await fetch(tokenURI);
      const metadata = await response.json();

      nfts.push({
        id: i,
        name: metadata.name,
        owner: owner,
        price: 0, // You might want to fetch this from your marketplace contract
        image: metadata.image,
        tokenURI: tokenURI
      });
    }

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return [];
  }
} 