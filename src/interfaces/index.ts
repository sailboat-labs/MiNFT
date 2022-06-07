export interface ILayer {
  id: number;
  name: string;
  blendmode: string;
  opacity: 1;
  bypassDNA: boolean;
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
