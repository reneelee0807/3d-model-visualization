import {
  MarkerPoint,
  MarkerResourceType,
} from "src/app/services/engine/type/position";
import { FeatureMenu } from "src/app/type/feature-sub-menu.model";

const markers: MarkerPoint[] = [
  {
    position: [986.6915539470585, 680.6372324578816, 337.0754382815691],
    name: "Vantage Point 1",
    hasExtras: true,
    type: MarkerResourceType.Image,
    source: "assets/media/RLA1705_Year01_Flat.jpg",
  },

  {
    position: [886.6915539470585, 680.6372324578816, 137.0754382815691],
    name: "Vantage Point 2",
    hasExtras: true,
    type: MarkerResourceType.Image,
    source: "assets/media/RLA1705_Year08_Flat.jpg",
  },
];

export const VantagePointMenuItem: FeatureMenu = {
  label: "Vantage Points",
  isActive: false,
  color: "#062a4a",
  hoverColor: "#589edb",
  menuColor: "#90b3d1",
  markers: markers,
  markerIcon: "assets/labels/vantage-point.png",
  hasIcon: true,

  panToLocation: {
    cameraPosition: {
      x: 1666.9367044022106,
      y: 1310.1600773981502,
      z: 1128.5854446040976,
    },
    controlTarget: {
      x: 317.19696462961554,
      y: 218.55777484563814,
      z: -754.2464524700983,
    },
  },
};
