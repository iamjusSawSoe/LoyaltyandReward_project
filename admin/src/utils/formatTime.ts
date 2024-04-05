export const formatTime = (seconds: number): string => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};
