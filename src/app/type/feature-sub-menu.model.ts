import { MarkerPoint, PanToLocation } from '../services/engine/type/position';
import { SplinesData } from '../services/engine/type/spline';

export interface FeatureMenu {
  label: string;
  isActive: boolean;
  hasIcon?: boolean;
  hasRadioBtn?: boolean;
  color: string;
  menuColor?: string;
  hoverColor?: string;
  vantagePoint?: string;
  content?: string;
  splines?: SplinesData[];
  mesh?: string;
  markers?: MarkerPoint[];

  markerIcon?: string;
  panToLocation?: PanToLocation;
  disabled?: boolean;
  isGuidedTour?: boolean;
}
