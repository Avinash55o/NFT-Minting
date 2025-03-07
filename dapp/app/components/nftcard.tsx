"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";

interface NFT {
  id: number;
  name: string;
  owner: string;
  price: number;
  userImage: string;
  NftImage: string;
  time: { day: number; hour: number; minutes: number };
}

interface NFTCardProps {
  nft: NFT;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card w-[250] h-[400] bg-gray-900 border border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-4">
      {/* NFT Image */}
      <div className="relative">
        <Image
          src={nft.NftImage}
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

      {/* User Details */}
      <div className="flex items-center gap-2 mt-2">
        <Image
          src={nft.userImage}
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <MdVerified className="text-blue-500" />
          {nft.name}
        </p>
      </div>

      {/* Price & Timer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-white font-semibold text-lg">💰 {nft.price} ETH</p>
        <p className="text-gray-400 flex items-center gap-1">
          <MdTimer className="text-yellow-500" />
          {nft.time.day}d {nft.time.hour}h {nft.time.minutes}m
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
