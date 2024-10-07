import moment from 'moment';

//use moment con get a Javascript date and convert into the formtat we want  and then convert it back to a Javascript date
export const convertDate = (
  date: Date,
  fromFormat: string,
  toFormat: string,
): Date => {
  const newDate = moment(date, fromFormat).format(toFormat);

  return newDate as unknown as Date;
};
