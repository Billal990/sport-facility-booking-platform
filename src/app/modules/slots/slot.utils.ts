import { TSlot } from "./slot.interface";

export const calculateAvailableSlots = (bookedSlots:TSlot[])=>{
    const availableSlots = [];
    let startTime = '00:00';

    for(const slot of bookedSlots){
        if(startTime < slot.startTime){
            availableSlots.push({startTime, endTime:slot.startTime})
        }
        startTime = slot.endTime;
    }

    if(startTime < '24'){
        availableSlots.push({startTime, endTime:'24:00'})
    }
    return availableSlots
}