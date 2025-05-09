'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

export default function WalletConnect() {
  // All hooks must be called unconditionally
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-700">Connected to {address}</p>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => connect({ connector: injected() })}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Connect MetaMask
      </button>
      <button
        onClick={() => connect({ 
          connector: walletConnect({ 
            projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID! 
          })
        })}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        Connect WalletConnect
      </button>
    </div>
  );
} 