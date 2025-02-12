import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//require('dotenv').config();



const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks:{
    hardhat:{
      chainId:31337
    },
    // sepolia:{
    //   url:process.env.ALCHEMY_SEPOLIA_RPC_URL!,//Alchemy RPC URL
    //   accounts:[process.env.PRIVATE_KEY!], //Your privalte key
    //   gasPrice:2000000000  
    // }
  }
};

export default config;