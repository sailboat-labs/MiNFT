export interface User {
  id?: string;
  address?: string;
}

export interface Collection {
  id: string;
  owner: string;
  name?: string;
  slug?: string;
  blockchain?: string;
  projectType?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  etherscan?: string;
  opensea?: string;
  description?: string;
  preMintDate?: string;
  publicMintDate?: string;
  preSaleCost?: string;
  publicMintCost?: string;
  supply?: string;
  whitelistAvailable?: string;
  whitelistRequirements?: string;
  teamInfo?: string;
  image?: string;
  dateCreated?: string;
  lastUpdated?: string;
}
