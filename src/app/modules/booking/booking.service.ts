import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Facility } from '../facility/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { calculatePayableAmount } from './booking.util';
import { Request } from 'express';


const createBookingIntoDB = async (
  payload: TBooking,
  req:Request,
) => {
  const { userId } = req.user;

  const existingFacility = await Facility.findOne({_id:payload.facility});
  // check if facility exists
  if (!existingFacility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found !');
  }

  //get all bookings for the requested date and check if the requested time is already booked
  const requestedDateCurrentBookings = await Booking.find({
    date: payload.date,
    facility:payload.facility
  });
  if (requestedDateCurrentBookings.length > 0) {
    const requestedStartTime = new Date(
      `1970-01-01T${payload.startTime}`,
    ).getTime();
    const requestedEndTime = new Date(
      `1970-01-01T${payload.endTime}`,
    ).getTime();

    requestedDateCurrentBookings?.forEach(bookingItem => {
      const currentStartTime = new Date(
        `1970-01-01T${bookingItem.startTime}`,
      ).getTime();
      const currentEndTime = new Date(
        `1970-01-01T${bookingItem.endTime}`,
      ).getTime();

      if (
        requestedStartTime < currentEndTime &&
        requestedEndTime > currentStartTime
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'This booking time slot is not available !',
        );
      }
    });
  }

  //Calculate payable ammount
  const payableAmount = calculatePayableAmount(
    payload,
    existingFacility.pricePerHour,
  );

  const modifiedData = {
    ...payload,
    isBooked: 'confirmed',
    payableAmount: payableAmount,
    user: userId,
  };

  const result = await Booking.create(modifiedData);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};

const getBookingsByUserFromDB = async (req:Request) => {
  const result = await Booking.find({ user:req.user.userId })
    .populate('user')
    .populate('facility');
  return result;
};

const cancelBookingIntoDB = async (id:string, req:Request) => {
  const currentBooking = await Booking.findById(id);
  const {userId} = req.user;

  // check if booking exists
  if (!currentBooking) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking not found !');
  }

  // check if user authorized to cancel this booking
  if(userId !== currentBooking.user.toString()){
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to cancel this booking !')
  }


  const result = await Booking.findOneAndUpdate(
    {user:userId, _id:id},
    { isBooked: 'canceled' },
    { new: true },
  );
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getBookingsByUserFromDB,
  cancelBookingIntoDB,
};
