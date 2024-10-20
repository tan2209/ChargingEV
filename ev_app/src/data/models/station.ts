export interface ChargingStation {
    _id: string ;
    stationName: string,
    location: string,
    totalSlots: number,
    filledSlots: number,
    operatingHours: string,
    bookedPosition: number[],
}