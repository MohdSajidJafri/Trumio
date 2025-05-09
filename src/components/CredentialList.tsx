'use client';

import React from 'react';
import { useCredentials } from '../hooks/useCredentials';
import { Credential } from '../lib/api/credentials';

export default function CredentialList() {
  const { credentials, loading, error, fetchCredentials } = useCredentials();

  React.useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  if (loading) {
    return <div className="p-4">Loading credentials...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading credentials: {error.message}</div>;
  }

  if (!credentials.length) {
    return <div className="p-4">No credentials found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Credentials</h2>
      <div className="space-y-4">
        {credentials.map((credential) => (
          <div key={credential.id} className="border rounded-lg p-4">
            <h3 className="font-medium">{credential.credential_type}</h3>
            <p className="text-sm text-gray-600">Issuer: {credential.issuer_address}</p>
            <p className="text-sm text-gray-600">Issued: {new Date(credential.issue_date).toLocaleDateString()}</p>
            {credential.expiry_date && (
              <p className="text-sm text-gray-600">Expires: {new Date(credential.expiry_date).toLocaleDateString()}</p>
            )}
            {credential.revoked && (
              <p className="text-sm text-red-600">Revoked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 