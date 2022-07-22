export interface User {
  id?: string;
  address?: string;
}

export interface NFTLayer {
  name: string;
  elements: any[];
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
  roadmap: string;
  mintsPerPresale: string;
  mintsPerTx: string;
  whyILikeProject: string;
  whitelistAvailable?: string;
  whitelistRequirements?: string;
  teamInfo?: string;
  image?: string;
  dateCreated?: string;
  lastUpdated?: string;
  whitepaper?: string;
  commentCount?: number;
  favorited?: string[];
  timezone?: string;
}

export interface Comment {
  id: string;
  comment?: string;
  owner?: string;
  imageUrl?: string;
  collectionId: string;
  upVotes?: Map<string, boolean>;
  dateCreated?: string;
  lastUpdated?: string;
  signature?: string;
}

export interface User {
  walletId: string;
  name?: string;
  timeZone?: string;
  avatarUrl?: string;
  dateCreated?: string;
  lastUpdated?: string;
}
export interface OpenSeaCollection {
  banner_image_url?: string;
  chat_url?: string;
  created_date: string;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: { card_display_style: string };
  editors: string[];
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  image_url: string;
  instagram_username: string;
  is_nsfw: boolean;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username?: string;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payment_tokens: {
    address: string;
    decimals: number;
    eth_price: number;
    id: number;
    image_url: string;
    name: string;
    symbol: string;
    usd_price: string;
  }[];
  payout_address: string;
  primary_asset_contracts: {
    address: string;
    asset_contract_type: string;
    buyer_fee_basis_points: number;
    created_date: string;
    default_to_fiat: string;
    description: string;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: number;
    external_link: string;
    image_url: string;
    name: string;
    nft_version: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    opensea_version?: string;
    owner: number;
    payout_address: string;
    schema_name: string;
    seller_fee_basis_points: number;
    symbol: string;
    total_supply: string;
  }[];
  require_email: boolean;
  safelist_request_status: string;
  short_description: string;
  slug: string;
  stats: {
    average_price: number;
    count: number;
    floor_price: number;
    market_cap: number;
    num_owners: number;
    num_reports: number;
    one_day_average_price: number;
    one_day_change: number;
    one_day_sales: number;
    one_day_volume: number;
    seven_day_average_price: number;
    seven_day_change: number;
    seven_day_sales: number;
    seven_day_volume: number;
    thirty_day_average_price: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    thirty_day_volume: number;
    total_sales: number;
    total_supply: number;
    total_volume: number;
  };
  telegram_url?: string;
  twitter_username?: string;
  wiki_url?: string;
}

export interface Project {
  projectSlug: string;
  projectName: string;
  accounts: string[],
  baseUrl: string,
  description: string,
  owner: string,
  tokenSupply: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatetedAt: string;
}