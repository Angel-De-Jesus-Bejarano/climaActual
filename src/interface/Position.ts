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

  export interface WeatherData {
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
    }[];
    wind: {
      speed: number;
    };
    coord?: {
      lat: number;
      lon: number;
    };
  }
  