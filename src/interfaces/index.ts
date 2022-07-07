export interface ILayer {
  id?: number;
  name: string;
  blendmode: string;
  opacity: 1;
  elements: IElement[];
  bypassDNA: boolean;
}

export interface IDashboardState {
  selectedSidebar: string;
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
}

export interface IProject {
  projectName: string;
  tokenSupply: string;
  baseUrl: string;
  slug?: string;
  description: string;
  isDemo?: boolean;
}
