import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-400 p-4 flex justify-between items-center rounded-b-2xl">
      <h1 className="text-xl font-bold text-white">NFT Dashboard</h1>
      <button className="bg-blue-200 text-black px-4 py-2 rounded">Connect Wallet</button>
    </nav>
  );
};

export default Navbar;