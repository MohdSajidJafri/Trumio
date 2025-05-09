import supabase from '../supabase';

export interface User {
  id: string;
  wallet_address: string;
  did: string;
  created_at: string;
  updated_at: string;
}

export const userApi = {
  // Create or update user
  async upsertUser(walletAddress: string, did?: string) {
    const { data: user, error } = await supabase
      .from('users')
      .upsert({
        wallet_address: walletAddress,
        did: did || null,
      })
      .select()
      .single();

    if (error) throw error;
    return user as User;
  },

  // Get user by wallet address
  async getUserByWallet(walletAddress: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (error) throw error;
    return user as User;
  },

  // Get user by DID
  async getUserByDID(did: string) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('did', did)
      .single();

    if (error) throw error;
    return user as User;
  },

  // Update user's DID
  async updateUserDID(walletAddress: string, did: string) {
    const { data: user, error } = await supabase
      .from('users')
      .update({ did })
      .eq('wallet_address', walletAddress)
      .select()
      .single();

    if (error) throw error;
    return user as User;
  }
}; 