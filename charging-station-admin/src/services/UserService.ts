import axiosClient from "./apiService";


export const getUserByManager = async (phoneNumber: string | null, role: string) => {
  try {
    const response = await axiosClient.get('/webapi/fetch_user', {
        params : {
            phoneNumber: phoneNumber,
            role: role,
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    throw error;
  }
};
export const getUserById = async (id: string) => {
    try {
      const response = await axiosClient.get(`/auth/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      throw error;
    }
  };

export const getHistoryCharging = async (userId: string) => {
    try {
      const response = await axiosClient.get('/webapi/fetch_detail_user', {
          params : {
             userId: userId
          }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      throw error;
    }
  };

  export const updateUserById = async (id: string, updateUser: any) => {
    try {
      const response = await axiosClient.put(`/auth/${id}`, {
        updateUser: updateUser
      });
      return response;
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      throw error;
    }
  };

  export const deleteUser = async (id: string) => {
    try {
      const response = await axiosClient.delete(`/webapi/users/${id}`)
      return response;
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      throw error;
    }
  };

  export const postNewUser = async (newUser: any) => {
    try {
      const response = await axiosClient.post(`/webapi/createUser`, {
        newUser: newUser
      });
      return response;
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      throw error;
    }
  };

  export const login = async (loginUser: any) => {
    try {
      const response = await axiosClient.post(`/webapi/login`, {
        newUser: loginUser
      });
      return response;
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      throw error;
    }
  };