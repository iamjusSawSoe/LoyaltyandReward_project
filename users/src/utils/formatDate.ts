export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
};
