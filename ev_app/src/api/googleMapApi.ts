import { GOOGLE_API } from "../shared/constants";
import { calculateDistance } from "../utils/distance";


export const getNearByChargingStation = async (keyword: string, lat: number | null, long: number | null) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${lat},${long}&radius=1500&key=${GOOGLE_API}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "REQUEST_DENIED") {
      console.error("Request denied: ", data.error_message);
      return [];
    }
    if (lat && long) {
      const sortedStations = data.results.map((station: any) => ({
      ...station,
      distance: calculateDistance(lat, long, station.geometry.location.lat, station.geometry.location.lng)
    })).sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance);
    return sortedStations;
    } else {
      return null
    }
    
};

// export const getNearByChargingStationRecommend = async (lat: number | null, long: number | null) => {
//   const keyword = 'charging station'
//   const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${lat},${long}&radius=1500&key=${GOOGLE_API}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   if (data.status === "REQUEST_DENIED") {
//     console.error("Request denied: ", data.error_message);
//     return null;
//   }

//   if (lat && long) {
//     const sortedStations = data.results
//       .map((station: any) => ({
//         ...station,
//         distance: calculateDistance(lat, long, station.geometry.location.lat, station.geometry.location.lng),
//       }))
//       .sort((a: { distance: number }, b: { distance: number }) => a.distance - b.distance);
//     const openStation = sortedStations.find((station: any) => station.opening_hours?.open_now);

//     return openStation ? openStation : null;
//   } else {
//     return null;
//   }
// };