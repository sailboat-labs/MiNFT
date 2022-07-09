/* eslint-disable eqeqeq */
/**
 * Gets years from current year backdated {backDateCount}
 *
 * @param backDateCount - back date count
 * @returns {Array} - years backdated to current year
 */
export function getYearsBackDated(backDateCount: number): number[] {
  const currentYear: number = new Date().getFullYear();
  let backDateYear: number = currentYear - backDateCount;
  const years: number[] = [];

  if (backDateCount === 0) return [currentYear];

  if (backDateCount > 0) {
    while (backDateYear <= currentYear) {
      years.push(backDateYear);
      backDateYear++;
    }
  } else {
    while (backDateYear >= currentYear) {
      years.unshift(backDateYear);
      backDateYear--;
    }
  }

  return years;
}
/**
 * checks if a given year argument passed is a leap year
 *
 * @param year - year to check
 * @returns {boolean} - true for leap year and false otherwise
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0;
}
/**
 *
 * @param year - year to check
 * @param month - month as number from 0-11 range
 * @returns {number} - number of days in the given month argument
 */
export function getDateCount(year: number, month: number): number {
  if (month === -1) return 0;

  const DAYS_IN_MONTH: number[] = [
    31, // jan
    isLeapYear(year) ? 29 : 28, // feb
    31, // mar
    30, // apr
    31, // may
    30, // jun
    31, // jul
    31, // aug
    30, // sep
    31, // oct
    30, // nov
    31, // dec
  ];
  return DAYS_IN_MONTH[month];
}
