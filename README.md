# DID Blockchain Credential System

A decentralized identity system for managing and sharing credentials using blockchain technology.

## Features

- Decentralized Identity (DID) Management
  - Create and manage your DID
  - Add public keys and services to your DID document
  - Link your wallet address to your DID

- Credential Management
  - Create and issue credentials
  - View your received credentials
  - Revoke credentials when needed
  - Store credential metadata

- Blockchain Integration
  - Ethereum wallet connection
  - Smart contract integration for credential verification
  - Secure credential storage and verification

## Tech Stack

- Frontend
  - Next.js 13+ with App Router
  - React
  - TypeScript
  - Tailwind CSS
  - Wagmi (Ethereum wallet connection)

- Backend
  - Supabase (Database and Authentication)
  - Smart Contracts (Solidity)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd did-blockchain-credential-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   NEXT_PUBLIC_CHAIN_ID=your_chain_id
   NEXT_PUBLIC_RPC_URL=your_rpc_url
   ```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the SQL schema in `supabase/schema.sql`
   - Enable Row Level Security (RLS) policies

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API clients
│   ├── api/           # API functions for Supabase
│   └── web3/          # Web3 and smart contract utilities
└── contracts/          # Smart contract source files
```

## Smart Contracts

The project uses two main smart contracts:

1. `DID.sol`: Manages decentralized identities
2. `Credential.sol`: Handles credential issuance and verification

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 