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

  // MetaMask detection
  const isMetaMaskInstalled = typeof window !== 'undefined' && (window as any).ethereum && (window as any).ethereum.isMetaMask;
  console.log('MetaMask detected:', isMetaMaskInstalled);

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
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div>
        <button
          onClick={() => {
            if (!isMetaMaskInstalled) {
              alert('MetaMask not detected. Please install MetaMask from https://metamask.io/');
              return;
            }
            connect({ connector: injected() });
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
        {!isMetaMaskInstalled && (
          <div className="text-red-600 text-xs mt-2">
            MetaMask not detected. <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="underline">Install MetaMask</a>
          </div>
        )}
      </div>
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