import {ethers} from "hardhat";

async function main(){
    const MyNFT=await ethers.getContractFactory("MyNFT");
    const mynft=await MyNFT.deploy();

    await mynft.waitForDeployment();
    console.log("contract deployed to:", await mynft.getAddress());

    const tx = await mynft.createToken("ipfs://QmTest123", {
        value: ethers.parseEther("0.00001")
    });
    await tx.wait();
    console.log("NFT minted successfully!");

    const totalSupply = await mynft.totalSupply();
console.log(totalSupply.toString());

}
main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
})