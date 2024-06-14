import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { bookingServices } from './booking.service';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import { Booking } from './booking.model';

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB(
    req.body,
    req.user,
  );
  sendResponse(res, {
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

  sendResponse(res, {
    success: true,
    message: 'Bookings retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getBookingsByUser = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsByUserFromDB(req?.user);

  // check if any facility found
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    message: 'Bookings retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const currentBooking = await Booking.findById(id).populate('user');

  // check if booking exists
  if (!currentBooking) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking not found !');
  }

  //check if requested user and currently booked user same
  if (req.user.email !== currentBooking?.user?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await bookingServices.cancelBookingIntoDB(id);
  sendResponse(res, {
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
