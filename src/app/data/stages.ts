import { Stage, Terrain } from "../type/3d-model";

export const CurrentTerrains: Terrain[] = [
  { fileName: "Terrain_Existing.gltf" },
];

export const ProposeTerrains: Terrain[] = [
  { fileName: "Terrain_Year16.gltf" },
  { fileName: "Mining_Facilities.gltf" },
];

export const InitialTerrains: Terrain[] = [
  { fileName: "Terrain_Outer.gltf" },
  ...CurrentTerrains,
  ...ProposeTerrains,
];

export const Stages: Stage[] = [
  {
    label: "Current",
    model: CurrentTerrains,
    isActive: true,
  },
  { label: "Propose", model: ProposeTerrains, isActive: false },
];

export const TerrainObjName = "Terrain";

export const InitialCameraPosition = {
  x: 600.3587602649068,
  y: 934.8498834002754,
  z: -1631.4611017004518,
};

export const InitialControlTarget = {
  x: 253.45661424667753,
  y: 667.1839174817596,
  z: -1165.1410628296571,
};
