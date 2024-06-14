import { TErrorSource } from '../interfaces/error.interface';
import { TGenericErrorResponse } from '../interfaces/genericeErrorResponse.inerface';

export const handleDuplicateError = (error: Error): TGenericErrorResponse => {
  const errorMessages: TErrorSource = [
    {
      path: '',
      message: error.message,
    },
  ];

  const statusCode = 400;
  return {
    message: error.message,
    statusCode,
    errorMessages,
  };
};
