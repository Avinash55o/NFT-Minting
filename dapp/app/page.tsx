"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Signup from "./Pages/signup/page";
export default function Home() {
  const router=useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-800 to-indigo-950 relative overflow-hidden flex items-center">
      {/* Left Side - Background Images */}
      <div className="absolute top-0 left-0 w-1/2">
        {/* Bottom Background Image */}
        <img
          src="/Frame 2.png"
          alt="Fluid Background"
          className="absolute top-0 left-0 object-cover"
        />
        {/* Overlay Image */}
        <img
          src="/Frame 1.png"
          alt="Overlay"
          className="absolute top-0 left-0  object-cover mix-blend-overlay"
        />
      </div>

      <div className="absolute top-0 left-0 ml-16 h-full flex flex-col justify-center p-16 text-white z-10">
        <h3 className="text-2xl ml-28 font-bold mb-3">Back to </h3>
        <h1 className="text-7xl ml-16 font-bold mb-6">Web3</h1>
        <p className="text-xl ml-6 w-80 mb-8">
          Explore, collect, and trade digital assets in a vibrant marketplace.
        </p>
        <button onClick={()=>router.push("/Pages/dashboard")} className="bg-white text-blue-600 ml-2 w-80 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-100">
          Start Exploring
        </button>
      </div>

      {/* Right Side*/}
      <div>
      {/* Bitcoin Floating */}
      <div className="absolute pb-10 inset-0 flex justify-center items-center">
          <img
            src="/bitcoin.png"
            alt="Bitcoin"
            className="h-36 mb-14 mr-12 object-cover animate-float"
          />
        </div>

        {/* Solana Floating */}
        <div className="absolute pb-96 inset-0 flex justify-center items-center">
          <img
            src="/solana.png"
            alt="Solana"
            className="h-32 mb-96 mr-40 object-cover  -rotate-45 animate-float-slow"
          />
        </div>

        {/* Ethereum Floating */}
        <img
          src="/ethereum.png"
          alt="Ethereum"
          className="absolute top-12 right-80 h-44 mr-32 animate-float-fast"
        />

        {/*Binance */}
        <img
          src="/binance.png"
          alt="Ethereum"
          className="absolute top-56 right-96 h-20 mr-96 animate-float"
        />

        {/* USDT Floating */}
        <img
          src="/usdt.png"
          alt="USDT"
          className="absolute top-80 right-2 h-24 mr-10 rotate-12 animate-float"
        />

        {/* Shiba Inu Floating */}
        <img
          src="/shiba-inu.png"
          alt="Shiba Inu"
          className="absolute top-16 right-24 h-24 mr-10 -rotate-30 animate-float-slow"
        />

     
        <img
          src="/bit.png"
          alt="Background"
          className="absolute bottom-0 right-0 w-1/2 h-2/3 object-cover animate-float-slow"
        />
      </div>
    </div>
  );
}
