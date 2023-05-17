export interface Position {
    x: number;
    y: number;
    z: number;
  }
  export interface PanToLocation {
    cameraPosition: Position;
    controlTarget: Position;
  }
  
  export interface LabelPostion {
    position: number[];
    name: string;
  }
  
  export interface HoverLabelPostions {
    hoverColor: string;
    points: LabelPostion[];
  }
  
export enum MarkerResourceType {
  FactSheet = "factSheet",
  Image = "image",
  Video = "video",
}

export interface MarkerPoint {
  position: Array<number>;
  name: string;
  hasExtras?: boolean;
  type?: MarkerResourceType;
  source?: string;
  description?: string;
  size?: number[];
}

  
