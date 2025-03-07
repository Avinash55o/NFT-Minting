// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";


contract MyNFT is IERC2981,ERC721URIStorage{
    uint256 private _nextTokenId = 1;
    uint public maxSupply = 5;
    uint private _royaltyBasisPoints = 500; // 5% royalty
    mapping(uint => address) private _creators;

    //Events
    event NFTMinted(address indexed owner, uint tokenId, string tokenURI);
    event TokenURIupdated(uint256 indexed tokenId, string newTokenURI);

    //constructor
    constructor() ERC721("MyNFT", "MNT") {}

    // Mint function to create a new NFT
    function mint(string memory _tokenURI) public {
        require(_nextTokenId <= maxSupply, "Max no of mint"); //a user can only create 5 nft
        uint256 newTokenId = _nextTokenId;
        _nextTokenId += 1;
        _safeMint(msg.sender, newTokenId); // Safely mint a new NFT for the caller
        _setTokenURI(newTokenId, _tokenURI); // Set the metadata URI
        _creators[newTokenId] = msg.sender; //set the minter as creator

        emit NFTMinted(msg.sender, newTokenId, _tokenURI);
    }

    //update function for the NFT metadata
    function updateTokenURI(uint _tokenId, string memory _newtokenURI) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only the token owner can update the URI"
        );
        _setTokenURI(_tokenId, _newtokenURI);

        emit TokenURIupdated(_tokenId, _newtokenURI);
    }

      // Custom exists function
    // function exists(uint256 tokenId) internal view returns (bool) {
    //     return _exists(tokenId); // Use OpenZeppelin's internal _exists function
    // }


     //function to check who should get the royalty
     function royaltyInfo(uint256 _tokenId, uint256 salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        // require(exists(_tokenId), "Token does not exist"); // Check if the token exists
         // This will throw an error if the token does not exist
         receiver = ownerOf(_tokenId);// Royalty goes to the creator
        royaltyAmount = (salePrice * _royaltyBasisPoints) / 10000; // Calculate royalty
    }

    // Function to get the owner of the contract
    // function getOwner() public view returns (address) {
    //     return owner();
    // }
}
