 export interface Position {
    coords: Coordinates;
    timestamp: number;
  }
  
 export interface Coordinates {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  }