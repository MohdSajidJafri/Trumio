-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table to store user information
create table public.users (
  id uuid references auth.users on delete cascade,
  wallet_address text unique,
  did text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Credentials table to store credential metadata
create table public.credentials (
  id uuid default uuid_generate_v4() primary key,
  credential_id bigint not null,
  issuer_address text not null,
  holder_address text not null,
  credential_type text not null,
  metadata jsonb,
  issue_date timestamp with time zone default timezone('utc'::text, now()) not null,
  expiry_date timestamp with time zone,
  revoked boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DID Documents table to store DID information
create table public.did_documents (
  id uuid default uuid_generate_v4() primary key,
  did text unique not null,
  owner_address text not null,
  public_keys jsonb,
  services jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.credentials enable row level security;
alter table public.did_documents enable row level security;

-- Create policies
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid() = id);

create policy "Anyone can view credentials"
  on public.credentials for select
  using (true);

create policy "Issuers can create credentials"
  on public.credentials for insert
  with check (auth.uid() in (
    select id from public.users where wallet_address = issuer_address
  ));

create policy "Issuers can update their credentials"
  on public.credentials for update
  using (auth.uid() in (
    select id from public.users where wallet_address = issuer_address
  ));

create policy "Anyone can view DID documents"
  on public.did_documents for select
  using (true);

create policy "Users can create their own DID documents"
  on public.did_documents for insert
  with check (auth.uid() in (
    select id from public.users where wallet_address = owner_address
  ));

create policy "Users can update their own DID documents"
  on public.did_documents for update
  using (auth.uid() in (
    select id from public.users where wallet_address = owner_address
  ));

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
create trigger handle_users_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger handle_credentials_updated_at
  before update on public.credentials
  for each row
  execute function public.handle_updated_at();

create trigger handle_did_documents_updated_at
  before update on public.did_documents
  for each row
  execute function public.handle_updated_at(); 