// utils/walletConnect.ts
import  WalletConnectProvider  from "@walletconnect/web3-provider";
import { ethers } from "ethers";

// Configure WalletConnect provider
const walletConnectProvider = new WalletConnectProvider({
    infuraId: "YOUR_INFURA_PROJECT_ID", // Replace with your Infura project ID
});

// Function to connect to WalletConnect
export const connectWalletConnect = async () => {
    try {
        await walletConnectProvider.enable(); // Open WalletConnect modal
        const provider = new ethers.BrowserProvider(walletConnectProvider); // Wrap with ethers
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Connected via WalletConnect:", address);
        return { provider, signer, address };
    } catch (error) {
        console.error("Error connecting via WalletConnect:", error);
        throw error;
    }
};
