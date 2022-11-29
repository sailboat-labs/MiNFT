export function isDateValid(date: Date) {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return date.getTime() === date.getTime();
}
