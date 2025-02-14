import Web3Modal from "web3modal";
import {ethers} from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3Modal: Web3Modal | null = null;
export const initweb3Modle=()=>{
    if(typeof window !=="undefined" && !web3Modal){
        web3Modal=new Web3Modal({
            cacheProvider:true, //cache the selected provider
            providerOptions:{
                walletconnect:{
                    package:WalletConnectProvider,
                    options:{
                        rpc:{
                            11155111:"https://eth-sepolia.g.alchemy.com/v2/kfRU_4ZoxXTHocSBXkvM3W3dCLMReWlz", // sepolia network
                            1: "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY", // Ethereum Mainnet
                            5: "https://eth-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY", // Goerli Testnet
                            137: "https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY", // Polygon Mainnet
                        }
                    }
                }
            }
        });
    }
    return web3Modal;
}


// Function to connect to a wallet
export const connectWallet = async () => {
    const web3ModalInstance = initweb3Modle();
    if (!web3ModalInstance) {
        throw new Error("Web3Modal is not initialized");
    }

    try {
        const instance = await web3ModalInstance.connect(); // Open wallet selection modal
        const provider = new ethers.BrowserProvider(instance); // Wrap with ethers
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected to wallet:", address);
        return { provider, signer, address };
    } catch (error) {
        console.error("Error connecting wallet:", error);
        throw error;
    }
};