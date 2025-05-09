'use client';

import React, { useState, useEffect } from 'react';
import WalletConnect from '../components/WalletConnect';
import CredentialList from '../components/CredentialList';
import CreateCredential from '../components/CreateCredential';
import DIDManager from '../components/DIDManager';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'credentials' | 'create' | 'did'>('credentials');
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogin = () => {
    window.location.href = '/login';
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Onboarding/Instructions Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h2 className="font-semibold mb-2">How to Connect Your Wallet</h2>
          <ol className="list-decimal ml-6 text-sm text-gray-700 space-y-1">
            <li>
              <b>MetaMask:</b> Click "Connect MetaMask". If you have MetaMask installed, a popup will appear. Approve the connection. If nothing happens, make sure MetaMask is installed and unlocked.
            </li>
            <li>
              <b>WalletConnect:</b> Click "Connect WalletConnect". Scan the QR code with your mobile wallet app (e.g., MetaMask Mobile, Trust Wallet). If you copy the link, paste it into your wallet app's WalletConnect feature.
            </li>
            <li>
              <b>After scanning or pasting the link:</b> In your wallet app, approve the connection request. Once approved, return to this page and your wallet address will appear at the top.
            </li>
            <li>
              After connecting, your wallet address will appear at the top of the page.
            </li>
          </ol>
          <p className="mt-2 text-xs text-gray-500">
            Need help? <a href="https://metamask.io/faqs/" target="_blank" rel="noopener noreferrer" className="underline">MetaMask FAQ</a>
          </p>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">DID Blockchain Credential System</h1>
          <div className="flex items-center space-x-4">
            <WalletConnect />
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Login
              </button>
            )}
          </div>
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
    </main>
  );
} 