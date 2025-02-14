import {ethers} from "ethers"

import MyNFTArtifact from "@/public/MyNFT.json"

export const CONTRACT_ABI=MyNFTArtifact.abi;
export const CONTRACT_ADDRESS="0xb5Ce5d272aA6910D84F0606f8a4BC37b396C303F";

export const getContract=(signerOrProvider:any)=>{
    return new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,signerOrProvider);                                              
}
