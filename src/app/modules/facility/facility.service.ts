import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await Facility.find();
  return result;
};

const getSingleFacilityFromDB = async (id: string) => {
  if(!await Facility.isExistsFacility(id)){
    throw new AppError(httpStatus.NOT_FOUND, 'This facility not found !')
  }
  const result = await Facility.findById(id);
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const existingFacility = await Facility.isExistsFacility(id);

  // check if facility exists
  if (!existingFacility) {
    throw new AppError(httpStatus.NOT_FOUND, `This facility not found !`);
  }

  // check if facility deleted
  if (existingFacility && existingFacility.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This facility is already deleted !`,
    );
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  if(!await Facility.isExistsFacility(id)){
    throw new AppError(httpStatus.NOT_FOUND, 'This facility not found !')
  }
  const result = await Facility.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const facilityServices = {
  createFacilityIntoDB,
  getAllFacultiesFromDB,
  getSingleFacilityFromDB,
  deleteFacilityFromDB,
  updateFacilityIntoDB,
};
