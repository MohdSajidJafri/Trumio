// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract DID is Ownable {
    struct DIDDocument {
        string did;
        address owner;
        string[] publicKeys;
        string[] services;
        uint256 updated;
    }

    mapping(string => DIDDocument) public didDocuments;
    mapping(address => string) public addressToDID;

    event DIDCreated(string did, address owner);
    event DIDUpdated(string did, address owner);
    event DIDDeleted(string did, address owner);

    constructor() Ownable() {}

    function createDID(
        string memory did,
        string[] memory publicKeys,
        string[] memory services
    ) public {
        require(bytes(did).length > 0, "DID cannot be empty");
        require(didDocuments[did].owner == address(0), "DID already exists");
        require(bytes(addressToDID[msg.sender]).length == 0, "Address already has a DID");

        didDocuments[did] = DIDDocument({
            did: did,
            owner: msg.sender,
            publicKeys: publicKeys,
            services: services,
            updated: block.timestamp
        });

        addressToDID[msg.sender] = did;

        emit DIDCreated(did, msg.sender);
    }

    function updateDID(
        string memory did,
        string[] memory publicKeys,
        string[] memory services
    ) public {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");

        DIDDocument storage doc = didDocuments[did];
        doc.publicKeys = publicKeys;
        doc.services = services;
        doc.updated = block.timestamp;

        emit DIDUpdated(did, msg.sender);
    }

    function deleteDID(string memory did) public {
        require(didDocuments[did].owner == msg.sender, "Not the DID owner");

        delete addressToDID[msg.sender];
        delete didDocuments[did];

        emit DIDDeleted(did, msg.sender);
    }

    function getDIDDocument(string memory did)
        public
        view
        returns (
            string memory,
            address,
            string[] memory,
            string[] memory,
            uint256
        )
    {
        DIDDocument storage doc = didDocuments[did];
        return (doc.did, doc.owner, doc.publicKeys, doc.services, doc.updated);
    }

    function getDIDByAddress(address addr) public view returns (string memory) {
        return addressToDID[addr];
    }
} 