export function minutesToHoursAndMinutes(n: number) {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}hr ${rminutes}m`;
}

export const formattedDate = (date) => {
  const [year, month, day] = date.split("-");
  if (!year || !month) return "";
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
