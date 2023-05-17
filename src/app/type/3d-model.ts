export interface FileCombination {
  gltfPath: string;
  texturePath: string[];
}

export interface PinAndMediaPath {
  pin: string;
  mediaId: string;
  mediaBtnId: string;
}

export interface Terrain {
  fileName: string;
}

export interface Stage {
  label: string;
  model: Terrain[];
  isActive: boolean;
}
