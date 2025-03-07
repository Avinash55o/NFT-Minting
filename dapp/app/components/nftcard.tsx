import Image from "next/image"


interface NFTCardProps {
  name: string
  description: string
  price: number
  image: string
}

export function NFTCard({ name, description, price, image }: NFTCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-800/80 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-md bg-gray-600">
          <Image
            src={image || "/placeholder.svg"}
            alt=""
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="text-sm text-gray-300">Name</div>
          <div className="font-medium text-white">{name}</div>
        </div>
      </div>
      <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-gray-700">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mb-4 text-sm text-gray-400">{description}</div>
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-gray-700 px-3 py-1 text-sm text-white">{price} ETH</div>
        <button  className="gap-2">
         
          Buy
        </button>
      </div>
    </div>
  )
}

