import supabase from '../supabase';

export interface DIDDocument {
  id: string;
  did: string;
  owner_address: string;
  public_keys: any;
  services: any;
  created_at: string;
  updated_at: string;
}

export const didDocumentApi = {
  // Create a new DID document
  async createDIDDocument(document: Omit<DIDDocument, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('did_documents')
      .insert(document)
      .select()
      .single();

    if (error) throw error;
    return data as DIDDocument;
  },

  // Get DID document by DID
  async getDIDDocumentByDID(did: string) {
    const { data, error } = await supabase
      .from('did_documents')
      .select('*')
      .eq('did', did)
      .single();

    if (error) throw error;
    return data as DIDDocument;
  },

  // Get DID document by owner address
  async getDIDDocumentByOwner(ownerAddress: string) {
    const { data, error } = await supabase
      .from('did_documents')
      .select('*')
      .eq('owner_address', ownerAddress)
      .single();

    if (error) throw error;
    return data as DIDDocument;
  },

  // Update DID document
  async updateDIDDocument(did: string, updates: Partial<DIDDocument>) {
    const { data, error } = await supabase
      .from('did_documents')
      .update(updates)
      .eq('did', did)
      .select()
      .single();

    if (error) throw error;
    return data as DIDDocument;
  },

  // Add public key to DID document
  async addPublicKey(did: string, publicKey: any) {
    const document = await this.getDIDDocumentByDID(did);
    const publicKeys = document.public_keys || [];
    publicKeys.push(publicKey);

    return this.updateDIDDocument(did, { public_keys: publicKeys });
  },

  // Add service to DID document
  async addService(did: string, service: any) {
    const document = await this.getDIDDocumentByDID(did);
    const services = document.services || [];
    services.push(service);

    return this.updateDIDDocument(did, { services });
  }
}; 