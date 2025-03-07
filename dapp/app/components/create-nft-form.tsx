"use client";
import { useState,useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FaEthereum, FaWallet, FaSpinner } from "react-icons/fa";
import { uploadToPinata } from "../api/uploadToPinata";
import { getContract } from "../utils/contractUtils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global{
    interface Window {
        ethereum?: MetaMaskInpageProvider;
      }
}





export default function mintNFT(){
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [wallet, setWallet] = useState("");
    const [isMinting, setIsMinting] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = (e.target as HTMLInputElement).files?.[0];
        if (selectedFile) {
          setFile(selectedFile);
        }
      };
      
      useEffect(() => {
        async function getWalletAddress() {
          if (window.ethereum) {
            try {
              const accounts = (await window.ethereum.request({ method: "eth_accounts" })) as string[]; //"as string[]"=>If you're sure accounts will always be an array (which it typically is), you can use type assertion:
              if (accounts.length > 0) {
                setWallet(accounts[0]); // Set the first account
              }
            } catch (error) {
              console.error("Error fetching wallet:", error);
            }
          } else {
            console.log("MetaMask not installed");
          }
        }
        getWalletAddress();
      }, []);
      
  
      const handleMint = async () => {
        if (!file || !name || !description || !price) {
          alert("Please fill in all fields!");
          return;
        }
      
        setIsMinting(true); // ✅ Set loading state
      
        try {
          // Upload metadata to Pinata
          const metadataURI = await uploadToPinata(file, name, description);
          if (!metadataURI) throw new Error("Error uploading to IPFS");
      
          const contract = await getContract();
          if (!contract) throw new Error("Smart contract not found");
          console.log("Contract methods:", contract.functions);
      
          // Call minting function with correct metadataURI and price
          const tx = await contract.createToken(metadataURI, {
            value: ethers.parseEther("0.00001"), // Only pass the listing fee
          });
          
      
          await tx.wait();
      
          alert("✅ NFT Minted & Listed Successfully!");
          setSuccess(true);
        } catch (error) {
          console.error("Minting error:", error);
          alert("Minting failed!");
        } finally {
          setIsMinting(false); // ✅ Reset loading state
        }
      };
      
    return(
        <div className=" ">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-lg w-full">
          <h2 className="text-white text-2xl font-bold text-center mb-6">
            Mint Your NFT 🚀
          </h2>
  
          {/* NFT File Upload */}
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900 hover:border-purple-500 transition">
            <FiUploadCloud className="text-gray-400 text-4xl mb-2" />
            <span className="text-gray-400">{file ? file.name : "Upload NFT File"}</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
  
          {/* NFT Name */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="NFT Name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          {/* NFT Description */}
          <div className="mt-4">
            <textarea
              placeholder="NFT Description"
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-purple-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
  
          {/* Price */}
          <div className="mt-4 flex items-center bg-gray-700 px-4 py-2 rounded-md">
            <FaEthereum className="text-gray-400 mr-2" />
            <input
              type="number"
              placeholder="Price (ETH)"
              className="w-full bg-transparent text-white outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
  
          {/* Wallet Address */}
          <div className="mt-4 flex items-center bg-gray-700 px-4 py-2 rounded-md">
            <FaWallet className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Wallet Address"
              className="w-full bg-transparent text-white outline-none"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
  
          {/* Mint Button */}
          <button
            onClick={handleMint}
            className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-md flex items-center justify-center transition hover:bg-purple-700 disabled:opacity-50"
            disabled={isMinting}
          >
            {isMinting ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Mint NFT"
            )}
          </button>
  
          {/* Success Message */}
          {success && (
            <p className="text-green-400 text-center mt-4">
              ✅ NFT Minted Successfully!
            </p>
          )}
        </div>
      </div>
    )
}