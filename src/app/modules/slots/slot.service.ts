import { Booking } from "../booking/booking.model"
import { calculateAvailableSlots } from "./slot.utils"
import moment from "moment"

export const checkSlotAvailabilityIntoDB = async(payload:string)=>{
    const result = await Booking.find({date:payload || moment(new Date()).format('YYYY-MM-DD'), isBooked:'confirmed'})
    const bookedSlots = result.map(item => ({startTime:item.startTime, endTime:item.endTime}))
    const availableSlots = calculateAvailableSlots(bookedSlots);
    return availableSlots;
}

