"use client";
import React, { useEffect, useState } from "react";
import NFTCard from "./nftcard";
import { fetchNFTs, NFTData } from "../utils/fetchNFTs";

const NFTGrid = () => {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        setLoading(true);
        const fetchedNFTs = await fetchNFTs();
        setNfts(fetchedNFTs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load NFTs');
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] bg-white/10 backdrop-blur-lg p-6 mt-2 rounded-2xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">Available NFTs</h2>
      
      {/* Scrollable NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-8 h-full p-4">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
