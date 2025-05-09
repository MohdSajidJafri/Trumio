import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { didDocumentApi, DIDDocument } from '../lib/api/didDocuments';

export const useDIDDocuments = () => {
  const { address } = useAccount();
  const [document, setDocument] = useState<DIDDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchDIDDocument = useCallback(async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const didDocument = await didDocumentApi.getDIDDocumentByOwner(address);
      setDocument(didDocument);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [address]);

  const createDIDDocument = useCallback(async (document: Omit<DIDDocument, 'id' | 'created_at' | 'updated_at'>) => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      const newDocument = await didDocumentApi.createDIDDocument(document);
      setDocument(newDocument);
      return newDocument;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  const updateDIDDocument = useCallback(async (updates: Partial<DIDDocument>) => {
    if (!document?.did) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedDocument = await didDocumentApi.updateDIDDocument(document.did, updates);
      setDocument(updatedDocument);
      return updatedDocument;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [document?.did]);

  const addPublicKey = useCallback(async (publicKey: any) => {
    if (!document?.did) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedDocument = await didDocumentApi.addPublicKey(document.did, publicKey);
      setDocument(updatedDocument);
      return updatedDocument;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [document?.did]);

  const addService = useCallback(async (service: any) => {
    if (!document?.did) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedDocument = await didDocumentApi.addService(document.did, service);
      setDocument(updatedDocument);
      return updatedDocument;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [document?.did]);

  return {
    document,
    loading,
    error,
    fetchDIDDocument,
    createDIDDocument,
    updateDIDDocument,
    addPublicKey,
    addService,
  };
}; 