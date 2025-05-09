'use client';

import React, { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import CredentialList from '../components/CredentialList';
import CreateCredential from '../components/CreateCredential';
import DIDManager from '../components/DIDManager';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'credentials' | 'create' | 'did'>('credentials');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">DID Blockchain Credential System</h1>
            <WalletConnect />
          </div>

          <div className="mb-8">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('credentials')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'credentials'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My Credentials
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'create'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create Credential
              </button>
              <button
                onClick={() => setActiveTab('did')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'did'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                DID Management
              </button>
            </nav>
          </div>

          <div className="bg-white shadow rounded-lg">
            {activeTab === 'credentials' && <CredentialList />}
            {activeTab === 'create' && <CreateCredential />}
            {activeTab === 'did' && <DIDManager />}
          </div>
        </div>
      </div>
    </main>
  );
} 