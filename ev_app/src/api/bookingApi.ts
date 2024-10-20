import axiosClient from "./axiosClient"

export const postBookingStation = async (phoneNumber: string, stationName: string, slot: number) => {
    try {
        await axiosClient.post('/control-device/booking', {phoneNumber, stationName, slot})
     } catch (error) {
        console.log(error)
     }
}

export const postVerifiableCode = async (code: string, stationName: string | null) => {
   try {
      const res =  await axiosClient.post('/control-device/verifiableCode', {code, stationName})
      return res.data
    } catch (error) {
       console.log(error)
    }
}

export const postStatus = async (status: string) => {
   try {
      const res =  await axiosClient.post('/control-device/status', {status})
      return res.data
    } catch (error) {
       console.log(error)
    }
}




