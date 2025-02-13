"use client";
import React from "react";
import Navbar from "@/app/components/navbar";
import NFTGrid from "@/app/components/nft-grid";
import CreateNFTForm from "@/app/components/create-nft-form";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-800 to-indigo-800">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full   z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex  pt-24 "> {/* Adjust padding to avoid overlapping with Navbar */}
        {/* Fixed Mint NFT Section */}
        <div className=" pl-4">
        <CreateNFTForm />
        </div>
          
       

        {/* Scrollable NFT Marketplace */}
        <div className="w-2/3 ml-auto min-h-[300px] max-h-[88vh] rounded-2xl bg-navy-900 p-6 mr-10 pb-40">
  {/* Search Input */}
  <div className="mb-8">
    <input
      type="search"
      placeholder="Search"
      className="w-full rounded-lg bg-gray-300/30 px-4 py-2 text-white placeholder-gray-400"
    />
  </div>

  {/* Scrollable NFT Grid */}
  <div className="px-10 overflow-y-auto max-h-[calc(88vh-150px)] scrollbar-hide">
    <NFTGrid />
  </div>
</div>

      </div>
    </div>
  );
}
