import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { checkSlotAvailabilityIntoDB } from "./slot.service";

export const checkSlotAvailability = catchAsync(async(req, res)=>{
    const {date} = req.query;
    const result = await checkSlotAvailabilityIntoDB(date as string)
    sendResponse(res, {
        message:'Availability checked successfully',
        success:true,
        statusCode:httpStatus.OK,
        data:result
    })
})
