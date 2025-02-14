import {ethers} from "hardhat";

async function main(){
    const MyNFT=await ethers.getContractFactory("MyNFT");
    const mynft=await MyNFT.deploy();

    await mynft.waitForDeployment();
    console.log("contract deployed to:", await mynft.getAddress());

}
main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
})