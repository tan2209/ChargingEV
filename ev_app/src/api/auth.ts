import axiosClient from "./axiosClient"

export const postBookingStation = async (phoneNumber: string, stationName: string, slot: number) => {
    try {
        await axiosClient.post('/control-device/booking', {phoneNumber, stationName, slot})
     } catch (error) {
        console.log(error)
     }
}



export const updateUser = async (id: any, userData: any) => {
   try {
     const response = await axiosClient.put(`/auth/${id}`, userData);
     return response.data;
   } catch (error) {
     console.error('Error updating user:', error);
     throw error;
   }
 };

 export const checkPhoneNumber = async (phone: string) => {
   try {
       const res = await axiosClient.post('/auth/checkphone', {phone})
       return res.data
    } catch (error) {
       console.log(error)
    }
    
};

export const changePassword = async (phone: string, newPass: string) => {
   try {
     
     const response = await axiosClient.patch('/auth/changePassword', {phone, newPass});
     return response;
   } catch (error) {
     console.error('Error updating user:', error);
     throw error;
   }
 };

