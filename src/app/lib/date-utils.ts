function getCurrentDateForTimeZone(timeZone: string) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-CA", options); // Using Canadian English to favor YYYY-MM-DD format
  const currentDate = formatter.format(new Date());

  return currentDate; // Returns the date in 'YYYY-MM-DD' format
}

function formatDateYYYYMMDD(date: Date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-CA", options); // Using Canadian English to favor YYYY-MM-DD format
  return formatter.format(date);
}

export { getCurrentDateForTimeZone, formatDateYYYYMMDD };
