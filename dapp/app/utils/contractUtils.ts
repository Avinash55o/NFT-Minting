//connect the frontend and the smart contract.

import { ethers } from "ethers";

// Import the ABI directly from the artifacts
const NFT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      }
    ],
    "name": "createToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Update this with your latest deployed contract address
export const NFTMarketPlaceAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const getContract = async (): Promise<ethers.Contract | null> => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
            // Request account access
            await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            
            // Create provider
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            
            // Get network info
            const network = await provider.getNetwork();
            console.log("Connected to network:", network);

            // Check if we're on the correct network
            if (Number(network.chainId) !== 31337) { // 31337 is the chainId for local Hardhat network
                console.error("Please connect to local Hardhat network");
                return null;
            }
            
            // Create contract instance with provider (not signer)
            const contract = new ethers.Contract(
                NFTMarketPlaceAddress,
                NFT_ABI,
                provider
            );

            // Test contract connection
            try {
                // Try to get the contract code first
                const code = await provider.getCode(NFTMarketPlaceAddress);
                console.log("Contract code:", code);
                
                if (code === "0x") {
                    throw new Error("Contract not deployed at this address. Please deploy the contract first.");
                }

                // Then try to get the name
                const name = await contract.name();
                console.log("Contract Name:", name);
                
                // Get total supply
                const totalSupply = await contract.totalSupply();
                console.log("Total Supply:", totalSupply.toString());
                
            } catch (error) {
                console.error("Error testing contract:", error);
                throw error;
            }
            
            return contract;
        } catch (error) {
            console.error("Error initializing contract:", error);
            return null;
        }
    }
    return null;
};