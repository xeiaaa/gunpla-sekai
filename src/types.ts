export enum COLOR_TYPE {
  COMMERCIAL = "COMMERCIAL",
  OWN = "OWN",
}

export enum ALPHA_MODE {
  OPAQUE = "OPAQUE",
  BLEND = "BLEND",
}

export interface MaterialData {
  color: string;
  isClear: boolean;
  isMetallic: boolean;
  roughness: number;
  // texture: null,
  alphaMode: ALPHA_MODE;
}
