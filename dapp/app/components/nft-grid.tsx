

"use client";
import React from "react";
import NFTCard from "./nftcard";

const nftData = [
  {
    id: 1,
    name: "CyberPunk Ape",
    owner: "John Doe",
    price: 3.5,
    userImage: "/user1.jpg",
    NftImage: "/nft1.jpg",
    time: { day: 2, hour: 5, minutes: 30 },
  },
  {
    id: 2,
    name: "Futuristic City",
    owner: "Alice",
    price: 2.8,
    userImage: "/user2.jpg",
    NftImage: "/nft2.jpg",
    time: { day: 1, hour: 3, minutes: 15 },
  },
  {
    id: 3,
    name: "Galaxy Explorer",
    owner: "Eve",
    price: 5.2,
    userImage: "/user3.jpg",
    NftImage: "/nft3.jpg",
    time: { day: 0, hour: 12, minutes: 45 },
  },
];

const NFTGrid = () => {
  return (
    <div className=" flex flex-col h-[80vh] bg-white/10 backdrop-blur-lg p-6 mt-2 rounded-2xl shadow-xl border border-white/20">
     

      {/* Scrollable NFT Grid */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto pr-8  h-full p-4">
        {nftData.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
