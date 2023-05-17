import { FeatureMenu } from '../../type/feature-sub-menu.model';
import { InformationMenuItem } from './information';
import { VantagePointMenuItem } from './vantage-points';
import { VideoMenuItem } from './video';


export const MenuItems: FeatureMenu[] = [
  VantagePointMenuItem,
  InformationMenuItem,
  VideoMenuItem
];
