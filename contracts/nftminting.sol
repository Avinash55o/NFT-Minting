// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public listingPrice = 0.00001 ether;
    address payable public owner;

    constructor() ERC721("MyNFT", "MNT") {
        owner = payable(msg.sender); // Set contract deployer as owner
    }

    // Mint NFT function
    function createToken(string memory tokenURI) public payable returns (uint256) {
        require(msg.value >= listingPrice, "Insufficient listing fee");

        _tokenIds.increment(); // ✅ First, increment the counter
        uint256 newTokenId = _tokenIds.current();  // ✅ Then, get the new token ID
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}
