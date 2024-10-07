import moment from 'moment';

export const getDayDates = (date: Date) => {
  //use moment to get the first and last day of the month
  const dateConverted = moment(date).format('YYYY-MM-DD');
  const firstDay = moment(dateConverted).startOf('month').toDate();
  const lastDay = moment(dateConverted).endOf('month').toDate();

  return { firstDay, lastDay };
};

export const getMonthBoundaries = () => {
  // Get the current date
  const currentDate = new Date();

  // Get the current year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of the current month
  const firstDay = new Date(year, month, 1);

  // Last day of the current month
  // Set the date to the first day of the next month and subtract one day
  const lastDay = new Date(year, month + 1, 0);

  return { firstDay, lastDay };
};

export const getPastAndCurrentDate = (
  daysAgo: number,
): {
  currentDate: string;
  pastDate: string;
} => {
  const currentDate: Date = new Date();
  const pastDate: Date = new Date(currentDate.getTime());

  pastDate.setDate(currentDate.getDate() - daysAgo);

  return {
    currentDate: currentDate.toISOString().slice(0, 10),
    pastDate: pastDate.toISOString().slice(0, 10),
  };
};
