function dateToYearMonthDay(inputDate: string): {
  year: number;
  month: number;
  day: number;
} {
  const [year, month, day] = inputDate.split("-");
  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10),
    day: parseInt(day, 10),
  };
}

export function CalculateWeekDifference(
  inputOneDate: string,
  inputTwoDate: string
) {
  const startDate = inputOneDate;
  const endDate = inputTwoDate;

  const startParsed = dateToYearMonthDay(startDate);
  const endParsed = dateToYearMonthDay(endDate);

  // Calculate the differences
  let yearDifference = endParsed.year - startParsed.year;
  let monthDifference = endParsed.month - startParsed.month;
  let dayDifference = endParsed.day - startParsed.day;

  // if month difference become negative
  if (monthDifference < 0) {
    yearDifference -= 1;
    monthDifference += 12;
  }

  // if day difference become negative
  if (dayDifference < 0) {
    monthDifference -= 1;

    const daysInPreviousMonth =
      monthDifference > 0 ? 30 - startParsed.day : 31 - startParsed.day;
    dayDifference += daysInPreviousMonth;
  }

  //finally calculate weeks difference
  const weeksDifference = Math.ceil(
    (yearDifference * 365 + monthDifference * 30 + dayDifference) / 7
  );

  return weeksDifference;
}
