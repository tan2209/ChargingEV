import { calculateDistance } from "../utils/distance";
import axiosClient from "./axiosClient"

export const getAllStation = async (lat: number , long: number ) => {
    try {
        const result = await axiosClient.get('/charging-test/fetch_data_test')
        const data =  result.data
        
        if (lat && long) {
         const sortedStations = data.map((station: any) => ({
         ...station,
         distance: calculateDistance(lat, long, station.geometry.coordinates[1], station.geometry.coordinates[0])
       })).sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);
       return sortedStations;
       } else {
         return null
       }
     } catch (error) {
        console.log(error)
     }
}

export const postStatusCharging = async (status: string, phoneNumber: string, time?: string, aboutTime?: number) => {
   try {
      await axiosClient.post('/control-device', {status, phoneNumber, time, aboutTime})
    } catch (error) {
       console.log(error)
    }
}

export const updateStatus = async (stationName: string, status : boolean) => {
   try {
      
     const response = await axiosClient.patch(`/charging-test/update/${stationName}`, {
       status: status
     });
     return response;
   } catch (error) {
     console.error('Error updating status:', error);
     throw error;
   }
 };

 


export const getStatus = async (stationName: string) => {
  try {
    const response = await axiosClient.get(`/charging-test/${stationName}`);
    return response.data.status;
  } catch (error) {
    console.error('Error fetching status:', error);
    throw error;
  }
};




export const getNearestChargingStationsRecommend = async (lat: number, lng: number, maxDistance: number) => {
  try {
    const response = await axiosClient.get('charging-stations/nearest', {
      params: {
        lat: lat.toString(),
        lng: lng.toString(),
        maxDistance: maxDistance.toString(),
      },
    });

    const stations = response.data;
    const openStations = stations.filter((station: any) => {
      if (station.properties.openingHours == 'Closed' ) {
        return false;
      }
      return true; 
    });
    return openStations.length > 0 ? openStations[0] : null;

  } catch (error) {
    console.error('Error fetching nearest charging stations:', error);
    throw error;
  }
};

export const getNearestChargingStations = async (lat: number, lng: number, maxDistance: number) => {
  try {
    const response = await axiosClient.get('charging-stations/nearest', {
      params: {
        lat: lat.toString(),
        lng: lng.toString(),
        maxDistance: maxDistance.toString(),
      },
    });

    const stations = response.data;
    
    const openStations = stations.filter((station: any) => {
      if (station.properties.openingHours == 'Closed') {
        return false;
      }
      return true; 
    });
    return openStations;
  } catch (error) {
    console.error('Error fetching nearest charging stations:', error);
    throw error;
  }
};

export const getNearByChargingStationSearchText = async (lat: number, long: number, searchText: string) => {
  try {
    const response = await axiosClient.get('charging-stations/by-address', {
      params: {
        address : searchText
      },
    });

    const stations = response.data;
    
    
    if (lat && long) {
      const sortedStations =stations.map((station: any) => ({
      ...station,
      dist: { calculated: calculateDistance(lat, long, station.geometry.coordinates[1], station.geometry.coordinates[0]) * 1000
    }}))
    return sortedStations;
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching nearest charging stations:', error);
    throw error;
  }
};

export const getNearByChargingStationName= async (stationName: string,lat: number, long: number,distance: number ) => {
  try {
    const response = await axiosClient.get('charging-stations/by-stationName', {
      params: {
        stationName : stationName,
        lat: lat, 
        long: long,
        maxDistance: distance
      },
    });

    const stations = response.data;
    
    
    if (lat && long) {
      const sortedStations =stations.map((station: any) => ({
      ...station,
      distance: calculateDistance(lat, long, station.geometry.coordinates[1], station.geometry.coordinates[0])
    }))
    return sortedStations;
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching nearest charging stations:', error);
    throw error;
  }
};



