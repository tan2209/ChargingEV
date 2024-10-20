export interface ChargingStation {
  _id: string; 
  type: string; 
  geometry: {
      lng: number;
      lat: number;
      type: string;
      coordinates: [number, number]; 
  };
  properties: {
      stationName: string; 
      address: string; 
      bussinessStatus: string; 
      openingHours: string,
      rating: number; 
      totalChargingPorts: number; 
  };
  status?: boolean;
}
