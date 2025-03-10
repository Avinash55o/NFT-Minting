import { getContract } from './contractUtils';

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
    console.log("Fetching NFTs...");
    const contract = await getContract();
    
    if (!contract) {
      throw new Error('Contract not found');
    }

    console.log("Contract found, getting total supply...");
    const totalSupply = await contract.totalSupply();
    console.log("Total Supply:", totalSupply.toString());

    if (totalSupply.toNumber() === 0) {
      console.log("No NFTs found");
      return [];
    }

    const nfts: NFTData[] = [];

    // Fetch each NFT's data
    for (let i = 0; i < totalSupply.toNumber(); i++) {
      console.log(`Fetching NFT ${i}...`);
      const tokenURI = await contract.tokenURI(i);
      const owner = await contract.ownerOf(i);
      
      // Fetch metadata from IPFS
      const response = await fetch(tokenURI);
      const metadata = await response.json();

      nfts.push({
        id: i,
        name: metadata.name,
        owner: owner,
        price: 0,
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