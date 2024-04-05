import dayjs from "dayjs";

export const formatDate = (dateString: string): string => {
  const formattedDate = dayjs(dateString).format("DD/MM/YYYY");
  return formattedDate;
};

export const formatDateHour = (dateString: string): string => {
  const formattedDate = dayjs(dateString).format("DD/MM/YYYY HH:mm");
  return formattedDate;
};
