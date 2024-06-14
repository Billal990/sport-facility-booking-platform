import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Facility } from '../facility/facility.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { calculatePayableAmount } from './booking.util';
import { User } from '../user/user.model';

type TCurrentUser = {
  role: string;
  email: string;
};

const createBookingIntoDB = async (
  payload: TBooking,
  currentUser: TCurrentUser,
) => {
  const { role, email } = currentUser;

  const user = await User.findOne({email, role});
  const existingFacility = await Facility.findOne({_id:payload.facility});

  // check if user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

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
    user: user._id,
  };

  const result = await Booking.create(modifiedData);
  return result;
};




const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};

const getBookingsByUserFromDB = async (user:{email:string, role:string}) => {
  const currentUser = await User.findOne({email:user?.email, role:user?.role});
  const result = await Booking.find({ user:currentUser?._id })
    .populate('user')
    .populate('facility');
  return result;
};

const cancelBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
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
