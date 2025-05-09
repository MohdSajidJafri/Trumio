import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { userApi, User } from '../lib/api/users';

export const useUser = () => {
  const { address } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const userData = await userApi.getUserByWallet(address);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  const createOrUpdateUser = useCallback(async (did?: string) => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const userData = await userApi.upsertUser(address, did);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  const updateUserDID = useCallback(async (did: string) => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const userData = await userApi.updateUserDID(address, did);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  return {
    user,
    loading,
    error,
    fetchUser,
    createOrUpdateUser,
    updateUserDID,
  };
}; 