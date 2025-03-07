"use client";
import { useState} from "react";
import { FaWallet, FaCheckCircle } from "react-icons/fa";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const Navbar = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (accounts.length > 0) {
          setWalletConnected(true);
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask not installed. Please install it to continue.");
    }
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg p-4 flex justify-between items-center rounded-b-2xl shadow-lg">
      {/* Left: Logo & Name */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <h1 className="text-white font-semibold text-xl">MintSphere</h1>
      </div>

      {/* Right: Wallet Connect Button */}
      <button
        onClick={connectWallet}
        className={`px-5 py-2 rounded-xl font-medium flex items-center transition ${
          walletConnected
            ? "bg-green-500 text-white"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {walletConnected ? (
          <>
            <FaCheckCircle className="mr-2" /> Connected
          </>
        ) : (
          <>
            <FaWallet className="mr-2" /> Connect Wallet
          </>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
