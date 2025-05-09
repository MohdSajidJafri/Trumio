import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { credentialApi, Credential } from '../lib/api/credentials';

export const useCredentials = () => {
  const { address } = useAccount();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCredentials = useCallback(async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const userCredentials = await credentialApi.getCredentialsByHolder(address);
      setCredentials(userCredentials);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  const createCredential = useCallback(async (credential: Omit<Credential, 'id' | 'created_at' | 'updated_at'>) => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const newCredential = await credentialApi.createCredential(credential);
      setCredentials(prev => [...prev, newCredential]);
      return newCredential;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  const revokeCredential = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const revokedCredential = await credentialApi.revokeCredential(id);
      setCredentials(prev => 
        prev.map(cred => cred.id === id ? revokedCredential : cred)
      );
      return revokedCredential;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    credentials,
    loading,
    error,
    fetchCredentials,
    createCredential,
    revokeCredential,
  };
}; 