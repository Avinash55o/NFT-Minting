"use client";

import React, { useState } from "react";

import { connectWallet } from "../utils/web3Modal";
// interface window{//ethereum was injected by the metamask so the ts doesnt recognize and give the error to ethereum so i created a interface for the ethereum.
//   ethereum?:any
// }


const Navbar = () => {
  const[address,setAddress]=useState<string|null>(null);
  const handleconnectWallet=async()=>{
    try {
      const {address:connectedAddress}=await connectWallet();
      setAddress(connectedAddress);// Store the connected wallet address
    } catch (error) {
      console.error("Failed to connect the wallet:",error);
    }
  }

  return (
    <nav className="bg-blue-400 p-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-xl font-bold text-white">NFT Dashboard</h1>
      <button className="bg-blue-200 text-black px-4 py-2 rounded" onClick={handleconnectWallet}>{address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}</button>
    </nav>
  );
};

export default Navbar;