import axios from "axios";


export const uploadToPinata = async (file: File, name: string, description: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: name,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", pinataOptions);
  console.log("Pinata API Key:",process.env.NEXT_PUBLIC_PINATA_API_KEY!);
  console.log("Pinata Secret Key:",process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!);

  try {
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY!,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!,
      },
    });

    const imageUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

    // Upload NFT metadata
    const metadata = {
      name,
      description,
      image: imageUrl,
    };

    const metadataResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadata,
      {
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY!,
          pinata_secret_api_key:process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${metadataResponse.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    return null;
  }
};
