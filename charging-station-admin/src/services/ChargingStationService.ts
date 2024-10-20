import axiosClient from "./apiService";



export const fetchChargingStations = async (phone: string | null) => {
  try {
    const response = await axiosClient.get('/webapi/fetch_charging_station', {
      params :{
        phone: phone
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
};

export const getHistoryChargingStationsByUser = async (stationName: string) => {
  try {
    const response = await axiosClient.get('/webapi/fetch_detail_station', {
      params :{
        stationName: stationName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
};

export const postNewStation = async (phone: string, newStation: any) => {
  try {
    const response = await axiosClient.post(`/webapi/createStation`, {
      newStation: newStation,
      phone: phone
    });
    return response;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
};

export const getCharingStationById = async (id: string) => {
  try {
    const response = await axiosClient.get(`/webapi/fetch_charging_station_byId/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
}

export const updateChargingStation = async (id: string, updateData: any) => {
  try {
    const response = await axiosClient.patch(`/charging-test/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Lỗi cập nhật trạm sạc:', error);
    throw error;
  }
}

export const deleteStation = async (id: string) => {
  try {
    const response = await axiosClient.delete(`/webapi/delete_station/${id}`)
    return response;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
};