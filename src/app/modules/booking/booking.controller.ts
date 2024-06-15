import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { bookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB(
    req.body,
    req,
  );
 return sendResponse(res, {
    success: true,
    message: 'Booking created successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsFromDB();

  // check if any booking found
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  return sendResponse(res, {
    success: true,
    message: 'Bookings retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getBookingsByUser = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsByUserFromDB(req);

  // check if any facility found
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

 return sendResponse(res, {
    success: true,
    message: 'Bookings retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.cancelBookingIntoDB(id, req);
  return sendResponse(res, {
    success: true,
    message: 'Booking canceled successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
};
