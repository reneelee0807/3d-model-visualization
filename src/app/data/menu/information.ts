import {
  MarkerPoint,
  MarkerResourceType,
} from "src/app/services/engine/type/position";
import { FeatureMenu } from "src/app/type/feature-sub-menu.model";

const markers: MarkerPoint[] = [
  {
    position: [-986.6915539470585, 680.6372324578816, -1567.214978],
    name: "PDF 1",
    hasExtras: true,
    type: MarkerResourceType.FactSheet,
    source: "assets/pdf/sample.pdf",
  },

  
];

export const InformationMenuItem: FeatureMenu = {
  label: "Information",
  isActive: false,
  color: "#022173",
  hoverColor: "#3a6ffc",
  menuColor: "#7ea0fc",
  markers: markers,
  markerIcon: "assets/labels/Pin.png",
  hasIcon: true,
  panToLocation: {
    cameraPosition: {
      x: -1914.3156299143711, y: 965.9966282232724, z: -2289.2761
    },
    controlTarget: {
      x: -802.3589283812731, y: 631.7299420437344, z: -1088.7230066
    },
  },
};
