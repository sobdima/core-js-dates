/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const d = new Date(date);
  return d.getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const pad = (num) => num.toString().padStart(2, '0');
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());

  return `${h}:${m}:${s}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const d = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
  }).format(new Date(date));

  return d.split(',')[0];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const NumberOfDay = date.getDay();
  const dateInMilliseconds = Date.parse(date);

  const millisecondsInOneDay = 24 * 60 * 60 * 1000;

  const bibl = {
    0: 5,
    1: 4,
    2: 3,
    3: 2,
    4: 1,
    5: 7,
    6: 6,
  };

  const nextFriday =
    millisecondsInOneDay * bibl[NumberOfDay] + dateInMilliseconds;

  return new Date(nextFriday);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const timeStamp1 = new Date(year, month, 1);
  const timeStamp2 = new Date(year, month - 1, 1);
  const res = Math.round((timeStamp1 - timeStamp2) / 1000 / 60 / 60 / 24);

  return res;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const timeStampStart = Date.parse(dateStart);
  const timeStampEnd = Date.parse(dateEnd);
  const res =
    Math.round((timeStampEnd - timeStampStart) / 1000 / 60 / 60 / 24) + 1;
  return res;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const value = Date.parse(date);
  const start = Date.parse(period.start);
  const end = Date.parse(period.end);

  if (value >= start && value <= end) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const dateObject = new Date(date);

  const day = dateObject.getUTCDate().toString();
  const month = (dateObject.getMonth() + 1).toString();
  const year = dateObject.getFullYear().toString();
  let hours = dateObject.getUTCHours();
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');

  let timeIndex = 'AM';

  if (hours > 12) {
    hours -= 12;
    hours.toString();
    timeIndex = 'PM';
  }

  if (hours === 12 && minutes > 0) {
    timeIndex = 'PM';
  }

  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${timeIndex}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();

  let count = 0;

  for (let i = 1; i <= daysInMonth; i += 1) {
    const currentDay = new Date(year, month - 1, i).getDay();

    if (currentDay === 6 || currentDay === 0) {
      count += 1;
    }
  }

  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

  while (firstDayOfYear.getDay() > 4 && firstDayOfYear.getDay() < 1) {
    firstDayOfYear.setDate(firstDayOfYear.getDate() + 1);
  }

  const diffInTime = date.getTime() - firstDayOfYear.getTime();

  const diffInDays = Math.round(diffInTime / (1000 * 60 * 60 * 24));

  return Math.floor(diffInDays / 7) + 1;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const currentDay = new Date(date);

  const nextFriday = currentDay;
  let result = new Date(nextFriday.setDate(nextFriday.getDate() + 1));

  while (nextFriday.getDay() !== 5) {
    nextFriday.setDate(nextFriday.getDate() + 1);
  }

  while (result.getDay() !== 5 || result.getDate() !== 13) {
    result = new Date(nextFriday.setDate(nextFriday.getDate() + 7));
  }

  return result;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const q1start = new Date(date.getFullYear(), 0, 1);
  const q1end = new Date(date.getFullYear(), 2, 31);

  const q2start = new Date(date.getFullYear(), 3, 1);
  const q2end = new Date(date.getFullYear(), 5, 30);

  const q3start = new Date(date.getFullYear(), 6, 1);
  const q3end = new Date(date.getFullYear(), 8, 30);

  if (date >= q1start && date <= q1end) {
    return 1;
  }
  if (date >= q2start && date <= q2end) {
    return 2;
  }
  if (date >= q3start && date <= q3end) {
    return 3;
  }

  return 4;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const [startDay, startMonth, startYear] = period.start.split('-').map(Number);
  const [endDay, endMonth, endYear] = period.end.split('-').map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  const workSchedule = [];
  const currentDate = new Date(startDate);
  let dayCounter = 0;

  while (currentDate <= endDate) {
    if (dayCounter % (countWorkDays + countOffDays) < countWorkDays) {
      const formattedDate = [
        currentDate.getDate().toString().padStart(2, '0'),
        (currentDate.getMonth() + 1).toString().padStart(2, '0'),
        currentDate.getFullYear(),
      ].join('-');

      workSchedule.push(formattedDate);
    }

    currentDate.setDate(currentDate.getDate() + 1);
    dayCounter += 1;
  }

  return workSchedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();

  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
