// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MarvelNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    // to track token Ids
    Counters.Counter private _tokenIds;
    using Strings for uint256;
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;
    // mapping hash of token_URI to tokenID to boolean
    mapping(bytes32 => bool) private claimed;

    // Base URI
    string private _baseURIextended;
    string[] public marvelCharacter;

    constructor() ERC721("MarvelNFT", "MARVEL") {}

    // https://forum.openzeppelin.com/t/function-settokenuri-in-erc721-is-gone-with-pragma-0-8-0/5978/3
    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    // enter the URL of the json metadata file
    function claimItem(string memory _tokenURI) external returns (uint256) {
        _tokenIds.increment();
        
        bytes32 httpHash = keccak256(abi.encodePacked(_tokenURI));
        // to check the tokenURI is not claimed yet
        require(!claimed[httpHash],"TOKEN_URI_ALREADY_CLAIMED");
        marvelCharacter.push(_tokenURI);
        // newItemId to index the NFT, start from zero
        uint256 newItemId = _tokenIds.current();
                
        // to set the claimed status hash of tokenURI as true
        claimed[httpHash] = true;
        // send the token to the claimant
        _safeMint(msg.sender, newItemId);

        // check if the token exists --> then mapping to keep track of Id and URI
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
}

