"use client";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FaEthereum, FaWallet, FaSpinner } from "react-icons/fa";
import { uploadToPinata } from "../api/uploadToPinata";
import { getContract } from "../utils/contractUtils";
import { ethers } from "ethers";


export default function MintNFT() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [wallet, setWallet] = useState(""); // Wallet address from Navbar
  const [isMinting, setIsMinting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const fetchWalletAddress = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed!");
      return;
    }
  
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_accounts",
      })) as string[];
  
      if (accounts.length > 0) {
        setWallet(accounts[0]); // Set wallet address
      } else {
        alert("No wallet connected. Please connect your wallet.");
      }
    } catch (error) {
      console.error("Error fetching wallet:", error);
      alert("Failed to get wallet address!");
    }
  };
  

  const handleMint = async () => {
    if (!file || !name || !description || !price || !wallet) {
      alert("Please fill in all fields and connect your wallet!");
      return;
    }

    setIsMinting(true);

    try {
      const metadataURI = await uploadToPinata(file, name, description);
      if (!metadataURI) throw new Error("Error uploading to IPFS");

      const contract = await getContract();
      if (!contract) throw new Error("Smart contract not found");

      const tx = await contract.createToken(metadataURI, {
        value: ethers.parseEther("0.00001"),
      });

      await tx.wait();

      alert("✅ NFT Minted & Listed Successfully!");
      setSuccess(true);
    } catch (error) {
      console.error("Minting error:", error);
      alert("Minting failed!");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full mx-auto mt-6">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Mint Your NFT 🚀
        </h2>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900 hover:border-purple-500 transition">
          <FiUploadCloud className="text-gray-400 text-4xl mb-2" />
          <span className="text-gray-400">{file ? file.name : "Upload NFT File"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <input
          type="text"
          placeholder="NFT Name"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md mt-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="NFT Description"
          rows={3}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md mt-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

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

        <div className="mt-4 flex items-center bg-gray-700 px-4 py-2 rounded-md">
          <FaWallet className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Wallet Address"
            className="w-full bg-transparent text-white outline-none"
            value={wallet}
            readOnly
            onClick={fetchWalletAddress} 
          />
        </div>

        <button
          onClick={handleMint}
          className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-md flex items-center justify-center transition hover:bg-purple-700 disabled:opacity-50"
          disabled={isMinting}
        >
          {isMinting ? <FaSpinner className="animate-spin mr-2" /> : "Mint NFT"}
        </button>

        {success && <p className="text-green-400 text-center mt-4">✅ NFT Minted Successfully!</p>}
      </div>
    </div>
  );
}
