export interface ILayer {
  id: number;
  name: string;
  blendmode: string;
  opacity: 1;
  elements: IElement[];
  bypassDNA: boolean;
}

export interface IGeneratedTokens {
  createdOn: string;
  filename: string | number;
  url: string;
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
}

export interface Trait {
  id: number;
  name: string;
  elements: any[];
  enabled: boolean;
}
