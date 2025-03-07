import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//require('dotenv').config();



const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks:{
    hardhat:{
      chainId:31337
    },
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/kfRU_4ZoxXTHocSBXkvM3W3dCLMReWlz",//Alchemy RPC URL
      accounts:["496bc71426dd3d5a1d77f65ee4a2a1bfae2e3f9276882f0a7ea27d48e05bfbf4"], //Your privalte key 
    }
  }
};

export default config;