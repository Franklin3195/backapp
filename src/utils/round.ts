export const round = (num: number, decimalPlaces: number) =>
  Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
