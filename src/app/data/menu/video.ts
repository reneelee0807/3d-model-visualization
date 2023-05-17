import {
  MarkerPoint,
  MarkerResourceType,
} from "src/app/services/engine/type/position";
import { FeatureMenu } from "src/app/type/feature-sub-menu.model";

const markers: MarkerPoint[] = [
  {
    position: [586.6915539470585, 680.6372324578816, 637.0754382815691],
    name: "Bowdens Silver Overview",
    hasExtras: true,
    type: MarkerResourceType.Video,
    source: "assets/media/Bowdens Silver Overview.mp4",
  },


];

export const VideoMenuItem: FeatureMenu = {
  label: "Video",
  isActive: false,
  color: "#f707f1",
  hoverColor: "#f584f2",
  menuColor: "#f5cbf4",
  markers: markers,
  markerIcon: "assets/labels/Pin.png",
  hasIcon: true,

  panToLocation: {
    cameraPosition: {
      x: 2664.6092342707934, y: 1226.694537416412, z: 1436.52218
    },
    controlTarget: {
      x: 681.6933435876322, y: 613.7702404571501, z: 599.5015623693
    },
  },
};
