import { OrderData } from "../data/models/order"
import axiosClient from "./axiosClient"

export const postPayment = async (phoneNumber: string) => {
    try {
        const response = await axiosClient.post('/payment', {phoneNumber})
        return response.data
     } catch (error) {
        console.log(error)
     }
}

export const postOrder = async (orderData: OrderData) => {
   try {
       const response = await axiosClient.post('/orders/createOrder', orderData)
       return response
    } catch (error) {
       console.log(error)
    }
}

export const getPaymentStation = async (userId: string|null, paymentStatus: string) => {
   try {
       const response = await axiosClient.get(`/orders/${userId}`, {
         params: {
         paymentStatus: paymentStatus,
       },})
       return response
    } catch (error) {
       console.log(error)
    }
}

export const getPaymentHistory = async (userId: string|null) => {
   try {
       const response = await axiosClient.get(`/orders/user/${userId}`)
       return response
    } catch (error) {
       console.log(error)
    }
}

export const postUpdateOrder = async (orderId: string, paymentStatus: string) => {
   try {
       const response = await axiosClient.patch(`/orders/${orderId}`,{
            paymentStatus: paymentStatus,
       } )
       return response
    } catch (error) {
       console.log(error)
    }
}
