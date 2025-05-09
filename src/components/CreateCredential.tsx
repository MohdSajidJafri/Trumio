'use client';

import React, { useState } from 'react';
import { useCredentials } from '../hooks/useCredentials';
import { useAccount } from 'wagmi';
import { Credential } from '../lib/api/credentials';

export default function CreateCredential() {
  const { address } = useAccount();
  const { createCredential } = useCredentials();
  const [credentialType, setCredentialType] = useState('');
  const [holderAddress, setHolderAddress] = useState('');
  const [metadata, setMetadata] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      const newCredential: Omit<Credential, 'id' | 'created_at' | 'updated_at'> = {
        credential_id: Math.floor(Date.now() / 1000),
        issuer_address: address,
        holder_address: holderAddress,
        credential_type: credentialType,
        metadata: JSON.parse(metadata),
        issue_date: new Date().toISOString(),
        expiry_date: null,
        revoked: false
      };

      await createCredential(newCredential);
      setCredentialType('');
      setHolderAddress('');
      setMetadata('');
    } catch (error) {
      console.error('Error creating credential:', error);
    }
  };

  if (!address) {
    return <div className="p-4 text-gray-600">Please connect your wallet to create credentials</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create New Credential</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="credentialType" className="block text-sm font-medium text-gray-700">
            Credential Type
          </label>
          <input
            type="text"
            id="credentialType"
            value={credentialType}
            onChange={(e) => setCredentialType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., Education, Employment, Membership"
            required
          />
        </div>

        <div>
          <label htmlFor="holderAddress" className="block text-sm font-medium text-gray-700">
            Holder Address
          </label>
          <input
            type="text"
            id="holderAddress"
            value={holderAddress}
            onChange={(e) => setHolderAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label htmlFor="metadata" className="block text-sm font-medium text-gray-700">
            Metadata (JSON)
          </label>
          <textarea
            id="metadata"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder='{"key": "value"}'
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Credential
        </button>
      </form>
    </div>
  );
} 