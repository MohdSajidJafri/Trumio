// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Credential is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _credentialIds;

    struct CredentialData {
        uint256 id;
        address issuer;
        address holder;
        string credentialType;
        string metadata;
        uint256 issueDate;
        uint256 expiryDate;
        bool revoked;
    }

    mapping(uint256 => CredentialData) public credentials;
    mapping(address => uint256[]) public holderCredentials;
    mapping(address => uint256[]) public issuerCredentials;

    event CredentialIssued(
        uint256 indexed id,
        address indexed issuer,
        address indexed holder,
        string credentialType,
        uint256 issueDate,
        uint256 expiryDate
    );

    event CredentialRevoked(uint256 indexed id, address indexed issuer);

    constructor() Ownable() {}

    function issueCredential(
        address holder,
        string memory credentialType,
        string memory metadata,
        uint256 expiryDate
    ) public returns (uint256) {
        require(holder != address(0), "Invalid holder address");
        require(bytes(credentialType).length > 0, "Credential type cannot be empty");

        _credentialIds.increment();
        uint256 newCredentialId = _credentialIds.current();

        credentials[newCredentialId] = CredentialData({
            id: newCredentialId,
            issuer: msg.sender,
            holder: holder,
            credentialType: credentialType,
            metadata: metadata,
            issueDate: block.timestamp,
            expiryDate: expiryDate,
            revoked: false
        });

        holderCredentials[holder].push(newCredentialId);
        issuerCredentials[msg.sender].push(newCredentialId);

        emit CredentialIssued(
            newCredentialId,
            msg.sender,
            holder,
            credentialType,
            block.timestamp,
            expiryDate
        );

        return newCredentialId;
    }

    function revokeCredential(uint256 credentialId) public {
        CredentialData storage credential = credentials[credentialId];
        require(credential.issuer == msg.sender, "Only issuer can revoke");
        require(!credential.revoked, "Credential already revoked");

        credential.revoked = true;
        emit CredentialRevoked(credentialId, msg.sender);
    }

    function getCredential(uint256 credentialId)
        public
        view
        returns (
            uint256 id,
            address issuer,
            address holder,
            string memory credentialType,
            string memory metadata,
            uint256 issueDate,
            uint256 expiryDate,
            bool revoked
        )
    {
        CredentialData storage credential = credentials[credentialId];
        return (
            credential.id,
            credential.issuer,
            credential.holder,
            credential.credentialType,
            credential.metadata,
            credential.issueDate,
            credential.expiryDate,
            credential.revoked
        );
    }

    function getHolderCredentials(address holder)
        public
        view
        returns (uint256[] memory)
    {
        return holderCredentials[holder];
    }

    function getIssuerCredentials(address issuer)
        public
        view
        returns (uint256[] memory)
    {
        return issuerCredentials[issuer];
    }
} 