"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { NFTData } from "../utils/fetchNFTs";

interface NFTCardProps {
  nft: NFTData;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card w-[250] h-[400] bg-gray-900 border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-4">
      {/* NFT Image */}
      <div className="relative">
        <Image
          src={nft.image}
          alt={nft.name}
          width={400}
          height={400}
          className="rounded-xl w-full object-cover"
        />
      </div>

      {/* NFT Details */}
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-bold text-white">{nft.name}</h3>
        <div
          className="cursor-pointer text-2xl"
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart className="text-gray-400 hover:text-red-500" />
          )}
        </div>
      </div>

      {/* Owner Details */}
      <div className="flex items-center gap-2 mt-2">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-white text-sm">
            {nft.owner.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <MdVerified className="text-blue-500" />
          {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
        </p>
      </div>

      {/* Price */}
      <div className="mt-4">
        <p className="text-white font-semibold text-lg">
          💰 {nft.price} ETH
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
