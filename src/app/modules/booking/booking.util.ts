export const calculatePayableAmount = (
  payload: Record<string, unknown>,
  pricePerHour: number,
) => {
  const startDateString = `1970-01-01T${payload.startTime}`;
  const endDateString = `1970-01-01T${payload.endTime}`;
  const timeDiffInMilSec =
    new Date(endDateString).getTime() - new Date(startDateString).getTime();
  const totalHour = timeDiffInMilSec / 1000 / 60 / 60;
  const payableAmount = pricePerHour * totalHour;
  return payableAmount;
};
