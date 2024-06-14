import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { facilityServices } from './facility.service';
import { Facility } from './facility.model';

const createFacility = catchAsync(async (req, res) => {
  const newFacilityData = req.body;
  const result = await facilityServices.createFacilityIntoDB(newFacilityData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await facilityServices.getAllFacultiesFromDB();

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
    statusCode: httpStatus.OK,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

const getSingleFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  // check if requested facility exists
  if (!(await Facility.isExistsFacility(id))) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: null,
    });
  }

  const result = await facilityServices.getSingleFacilityFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility retrieved successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  // check if requested facility exists
  if (!(await Facility.isExistsFacility(id))) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'This facility does not exists !',
    });
  }

  const result = await facilityServices.deleteFacilityFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility deleted successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const facilityData = req.body;

  // check if requested facility exists
  if (!(await Facility.isExistsFacility(id))) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'This facility does not exists !',
      data: null,
    });
  }

  const result = await facilityServices.updateFacilityIntoDB(id, facilityData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility updated successfully',
    data: result,
  });
});

export const facilityControllers = {
  createFacility,
  getSingleFacility,
  getAllFacilities,
  deleteFacility,
  updateFacility,
};
