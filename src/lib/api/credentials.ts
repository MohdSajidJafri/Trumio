import supabase from '../supabase';

export interface Credential {
  id: string;
  credential_id: number;
  issuer_address: string;
  holder_address: string;
  credential_type: string;
  metadata: any;
  issue_date: string;
  expiry_date: string | null;
  revoked: boolean;
  created_at: string;
  updated_at: string;
}

export const credentialApi = {
  // Create a new credential
  async createCredential(credential: Omit<Credential, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('credentials')
      .insert(credential)
      .select()
      .single();

    if (error) throw error;
    return data as Credential;
  },

  // Get credential by ID
  async getCredentialById(id: string) {
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Credential;
  },

  // Get credentials by holder address
  async getCredentialsByHolder(holderAddress: string) {
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('holder_address', holderAddress);

    if (error) throw error;
    return data as Credential[];
  },

  // Get credentials by issuer address
  async getCredentialsByIssuer(issuerAddress: string) {
    const { data, error } = await supabase
      .from('credentials')
      .select('*')
      .eq('issuer_address', issuerAddress);

    if (error) throw error;
    return data as Credential[];
  },

  // Update credential
  async updateCredential(id: string, updates: Partial<Credential>) {
    const { data, error } = await supabase
      .from('credentials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Credential;
  },

  // Revoke credential
  async revokeCredential(id: string) {
    const { data, error } = await supabase
      .from('credentials')
      .update({ revoked: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Credential;
  }
}; 