export interface ILayer {
  id?: number;
  name: string;
  blendmode: string;
  opacity: number;
  elements: IElement[];
  bypassDNA: boolean;
  layerPosition?: number;
}

export interface IDashboardState {
  selectedSidebar: string;
  informationBar: {
    show: boolean;
    message: string;
    showLoader: boolean;
  };
}

export interface IGeneratedTokens {
  createdOn: string;
  file: File;
  edition: number;
  metadata: IMetadata;
  renderObjects: IElement[];
}

export interface IMetadata {
  dna: string;
  name: string;
  description: string;
  image: string;
  imageHash: string;
  edition: number;
  date: number;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  compiler: string;
}

export interface IElement {
  sublayer: boolean;
  weight: number;
  blendmode: string;
  opacity: number;
  id: number;
  name: string;
  filename: string;
  path: string;
  zindex: string;
  trait: string;
  traitValue: string;
  isSelected?: boolean;
  isWeightTouched?: boolean;
}

export interface Trait {
  id: number;
  name: string;
  elements: any[];
  enabled: boolean;
}

export interface SelectOption {
  name: string | number;
  index?: number;
}

export interface IProject {
  projectName: string;
  tokenSupply: string;
  baseUrl: string;
  slug?: string;
  description: string;
  isDemo?: boolean;
  owner?: string;
  startDate?: string;
  family?: string;
  symbol?: string;
}

export interface IProjectLaunch {
  projectName: string;
  totalQuantity: string;
  symbol: string;
  contractType: string;
  startTimeStamp: string;
  endDateTimeStamp: string;
  mintPrice: string;
  summary: string;
  description: string;
  mintPerWallet: string;
  mintPerTransaction: string;
  hasWhitelist: boolean;
  team: string;
  discordLink?: string;
  twitterLink?: string;
  openseaLink?: string;
  roadmap: { title: string; description: string }[];
  website?: string;
  requiresTwitter?: boolean;
  requiredEthAmount?: number;
  publishTimeStamp?: string;
  contractAddress?: string;
  mainImage?: string;
  secondaryImage?: string[];
  faq?: { question: string; answer: string }[];
}
