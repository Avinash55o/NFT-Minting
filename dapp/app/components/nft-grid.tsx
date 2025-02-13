import { NFTCard } from "./nftcard"

const MOCK_NFTS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: "NFT Name",
  description: "description",
  price: 0.4,
  image: "/placeholder.svg?height=400&width=300",
}))

export default function NFTGrid() {
  return (
    <div className=" grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_NFTS.map((nft) => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
    
    
  )
}

