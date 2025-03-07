"use client";
import React from "react";
import dynamic from "next/dynamic";
import { FaSearch } from "react-icons/fa"; // Import Search Icon from React Icons

// Dynamically import the Navbar component
const Navbar = dynamic(() => import("@/app/components/navbar"), { ssr: false });
import NFTGrid from "@/app/components/nft-grid";
import CreateNFTForm from "@/app/components/create-nft-form";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-gray-950 via-purple-950 to-blue-950 text-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-opacity-40 backdrop-blur-lg shadow-md">
        <Navbar />
      </div>

      {/* Main content layout */}
      <div className="flex flex-1 pt-20 px-8 gap-8 h-screen">
        {/* Left Side - CreateNFTForm */}
        <div className="w-1/3 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl h-full flex items-center justify-center border border-white/20">
          <CreateNFTForm />
        </div>

        {/* Right Side - Search + NFT Grid */}
        <div className="w-2/3 flex flex-col h-full">
          {/* Search Bar */}
          <div className="relative bg-white/10 backdrop-blur-lg p-2 rounded-2xl shadow-md flex items-center border border-white/20">
            <FaSearch className="text-gray-300 absolute left-4" size={18} />
            <input
              type="text"
              placeholder="Search NFTs..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Scrollable NFT Grid */}
          <div >
            <NFTGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
