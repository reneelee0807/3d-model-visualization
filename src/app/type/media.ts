export interface Media {
    name: string;
    source: string;
    type: string;
    description?: string;
  }
  
  export interface Video {
    source: string;
    id: string;
    unfinishedWarningMsg: string;
    unfinishedWarningTitle: string;
  }
  