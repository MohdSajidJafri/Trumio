'use client';

import React, { useState, useEffect } from 'react';
import { useDIDDocuments } from '../hooks/useDIDDocuments';
import { useAccount } from 'wagmi';
import { DIDDocument } from '../lib/api/didDocuments';

export default function DIDManager() {
  const { address } = useAccount();
  const { document, createDIDDocument, updateDIDDocument, fetchDIDDocument } = useDIDDocuments();
  const [newPublicKey, setNewPublicKey] = useState('');
  const [newService, setNewService] = useState({ type: '', endpoint: '' });

  useEffect(() => {
    if (address) {
      fetchDIDDocument();
    }
  }, [address, fetchDIDDocument]);

  const handleCreateDID = async () => {
    if (!address) return;
    try {
      await createDIDDocument({
        did: `did:ethr:${address}`,
        owner_address: address,
        public_keys: [],
        services: []
      });
      setNewPublicKey('');
      setNewService({ type: '', endpoint: '' });
    } catch (error) {
      console.error('Error creating DID document:', error);
    }
  };

  const handleAddPublicKey = async () => {
    if (!document?.did) return;
    try {
      await updateDIDDocument({
        public_keys: [...(document.public_keys || []), newPublicKey]
      });
      setNewPublicKey('');
    } catch (error) {
      console.error('Error adding public key:', error);
    }
  };

  const handleAddService = async () => {
    if (!document?.did) return;
    try {
      await updateDIDDocument({
        services: [...(document.services || []), newService]
      });
      setNewService({ type: '', endpoint: '' });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  if (!address) {
    return <div className="p-4 text-gray-600">Please connect your wallet to manage your DID</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">DID Management</h2>
      
      {!document ? (
        <div className="text-center p-4">
          <p className="text-gray-600 mb-4">You don't have a DID yet</p>
          <button
            onClick={handleCreateDID}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Create DID
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Your DID</h3>
            <p className="text-gray-600 break-all">{document.did}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Public Keys</h3>
            {document.public_keys?.length > 0 ? (
              <div className="space-y-2">
                {(document.public_keys as string[]).map((key: string, index: number) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <pre className="text-sm">{key}</pre>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No public keys added yet</p>
            )}
            <div className="mt-4">
              <input
                type="text"
                value={newPublicKey}
                onChange={(e) => setNewPublicKey(e.target.value)}
                placeholder="Add new public key"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleAddPublicKey}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add Public Key
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Services</h3>
            {document.services?.length > 0 ? (
              <div className="space-y-2">
                {(document.services as { type: string; endpoint: string }[]).map((service: { type: string; endpoint: string }, index: number) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <p className="text-sm">{service.type}: {service.endpoint}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No services added yet</p>
            )}
            <div className="mt-4 space-y-4">
              <div>
                <input
                  type="text"
                  value={newService.type}
                  onChange={(e) => setNewService(prev => ({ ...prev, type: e.target.value }))}
                  placeholder="Service type"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newService.endpoint}
                  onChange={(e) => setNewService(prev => ({ ...prev, endpoint: e.target.value }))}
                  placeholder="Service endpoint"
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleAddService}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 