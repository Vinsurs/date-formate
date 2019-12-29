const {
  padWithZero,
  trim,
  startsWith,
  normalize,
  isDate
} = require("../libs/helper");

// constants
const monthsAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const monthsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const daysAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
/**
@description    formate date to assigned format
@param format {String} formatting tokens ,default to `YYYY-MM-DD HH:II:SS`; all supported date formate token:
        `YYYY` eg.   2018,
        `YY`   eg.   18,
        `MM`   eg.   03,
        `mm`   eg.   3,
        `DD`   eg.   08,
        `dd`   eg.   8,
        `HH`   eg.   06 ,12 ,22h format,
        `hh`   eg.   6 ,12,
        `KK`   eg.   06 ,02 ,12h format,
        `kk`   eg.   6 ,2,
        `II`   eg.   08,
        `ii`   eg.   8,
        `SS`   eg.   02,
        `ss`   eg.   2,
        `AA`    eg.   'AM',
        `aa`    eg.   'am',
        `jj`    eg.   365|366,
        `NN`    eg.   'December',
        `nn`    eg.   'Dec',
        `WW`    eg.   'Sunday',
        `ww`    eg.   'Sun'
;
@param  date {Date|Number} Date Object or timestamp,default to current time
@param  options {Object} Optional,custom month and week configuration objects
@param  options.weeks {Array} Array of custom weeks
@param  options.months {Array} Array of custom months
    
@returns {String} A date string in the specified format

*/
function formate(
  format = "YYYY-MM-DD HH:II:SS",
  date = new Date(),
  options = {}
) {
  if (
    "number" !== typeof date &&
    "number" !== typeof Number(date) &&
    !date instanceof Date
  ) {
    throw new TypeError(
      `Cannot resolve 'date' parameter,The parameter 'date' must be either a Date object or a timestamp that represents date`
    );
  }
  if (options.months && !(options.months instanceof Array)) {
    throw new TypeError(`the parameter 'option.months' must be an array`);
  }
  if (options.weeks && !(options.weeks instanceof Array)) {
    throw new TypeError(`the parameter 'option.weeks' must be an array`);
  }
  date = new Date(date);
  let matchers = [
    {
      test: /Y{4}/,
      replace: date.getFullYear()
    },
    {
      test: /Y{2}/,
      replace: date
        .getFullYear()
        .toString()
        .slice(-2)
    },
    {
      test: /M{2}/,
      replace: padWithZero(date.getMonth() + 1)
    },
    {
      test: /m{2}/,
      replace: date.getMonth() + 1
    },
    {
      test: /D{2}/,
      replace: padWithZero(date.getDate())
    },
    {
      test: /d{2}/,
      replace: date.getDate()
    },
    {
      test: /H{2}/,
      replace: padWithZero(date.getHours())
    },
    {
      test: /h{2}/,
      replace: date.getHours()
    },
    {
      test: /K{2}/,
      replace: padWithZero(date.getHours() % 12)
    },
    {
      test: /k{2}/,
      replace: date.getHours() % 12
    },
    {
      test: /I{2}/,
      replace: padWithZero(date.getMinutes())
    },
    {
      test: /i{2}/,
      replace: date.getMinutes()
    },
    {
      test: /S{2}/,
      replace: padWithZero(date.getSeconds())
    },
    {
      test: /s{2}/,
      replace: date.getSeconds()
    },
    {
      test: /A{2}/,
      replace: date.getHours() > 12 ? "PM" : "AM"
    },
    {
      test: /a{2}/,
      replace: date.getHours() > 12 ? "pm" : "am"
    },
    {
      test: /j{2}/,
      replace: formate.isLeapYear(date.getFullYear()) ? "366" : "365"
    },
    {
      test: /N{2}/,
      replace: options.months
        ? options.months[date.getMonth()]
        : monthsFull[date.getMonth()]
    },
    {
      test: /n{2}/,
      replace: options.months
        ? options.months[date.getMonth()]
        : monthsAbbr[date.getMonth()]
    },
    {
      test: /W{2}/,
      replace: options.weeks
        ? options.weeks[date.getDay()]
        : daysFull[date.getDay()]
    },
    {
      test: /w{2}/,
      replace: options.weeks
        ? options.weeks[date.getDay()]
        : daysAbbr[date.getDay()]
    }
  ];
  matchers.forEach(matcher => {
    format = format.replace(matcher.test, matcher.replace);
  });
  return format;
}
/**
 * @description The alias of `formate`
 */
formate.format = function(format, date = new Date(), options = {}) {
  return formate(format, date);
};
/**
 * @description Decide if it's a leap year
 * @param year {Number|String|Date}
 * @returns {Boolean}
 */
formate.isLeapYear = function(year) {
  if (year instanceof Date) {
    year = year.getFullYear();
  } else {
    year = Number(year);
    if (isNaN(year)) {
      throw TypeError(
        `The 'year' parameter should have accepted the Number and Date type, but type ${typeof year} was received`
      );
    }
  }
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};
/**
 * @description Determine whether target precedes comparator
 * @param target {Date} Date to compare
 * @param comparator {Date} Date to be compared;default to current time
 * @returns {Boolean}
 */
formate.isBefore = function(target, comparator = new Date()) {
  if (!isDate(target) && !isDate(comparator)) {
    throw new TypeError(`this function should receive Date Object for param`);
  }
  return target.getTime() < comparator.getTime();
};
/**
 * @description Determine whether target follows comparator
 * @param target {Date} Date to compare
 * @param comparator {Date} Date to be compared;default to current time
 * @returns {Boolean}
 */
formate.isAfter = function(target, comparator = new Date()) {
  if (!isDate(target) && !isDate(comparator)) {
    throw new TypeError(`this function should receive Date Object for param`);
  }
  return target.getTime() > comparator.getTime();
};
/**
 * @description Determine if two dates are equal
 * @param target {Date} Date to compare
 * @param comparator {Date} Date to be compared;default to current time
 * @returns {Boolean}
 */
formate.isEqual = function(target, comparator = new Date()) {
  if (!isDate(target) && !isDate(comparator)) {
    throw new TypeError(`this function should receive Date Object for param`);
  }
  return target.getTime() === comparator.getTime();
};
/**
 * @description Compare two dates
 * @param target {Date} Date to compare
 * @param comparator {Date} Date to be compared;default to current time
 * @returns {Number} -1 if target is less than comparator, 0 if they are equal, 1 if target is more than comparator
 */
formate.compare = function(target, comparator = new Date()) {
  return formate.isEqual(target, comparator)
    ? 0
    : formate.isBefore(target, comparator)
    ? -1
    : 1;
};
/**
 * @description compute relative date
 * @param relative {String}  The relative date ,eg. `+3year4month`,then:
            oparator:    +(add)      -(sub)
            supportedToken: `year`  `month`  `week` `day` `hour` `minute` `second` `millisecond` `lastyear` `lastmonth` `lastweek` `yestoday` `today` `tomorrow` `now` 
   @param format{String} optional,default to `YYYY-MM-DD HH:II:SS` 
   @returns {Date|String} If `format` is set to false, the parsed date object will be returned, otherwise the format string will be returned
 */
formate.resolve = function(relative, format = "YYYY-MM-DD HH:II:SS") {
  relative = trim(relative);
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ms = now.getMilliseconds();
  if (/^(\+)|-/.test(relative)) {
    let reg = /((?<ayear>\d+)years?)?((?<amonth>\d+)months?)?((?<aweek>\d+)week)?((?<aday>\d+)days?)?((?<ahour>\d*)hours+)?((?<aminute>\d+)minutes?)?((?<asecond>\d+)seconds?)?((?<ams>\d+)milliseconds?)?/g;
    let { ayear, amonth, aweek, aday, ahour, aminute, asecond, ams } = reg.exec(
      relative.slice(1)
    ).groups;
    ayear = normalize(ayear);
    amonth = normalize(amonth);
    aweek = normalize(aweek);
    aday = normalize(aday);
    ahour = normalize(ahour);
    aminute = normalize(aminute);
    asecond = normalize(asecond);
    ams = normalize(ams);

    if (startsWith(relative, "+")) {
      year += ayear;
      month += amonth;
      date += aweek * 7;
      date += aday;
      hours += ahour;
      minutes += aminute;
      seconds += asecond;
      ms += ams;
    } else if (startsWith(relative, "-")) {
      year -= ayear;
      month -= amonth;
      date -= aweek * 7;
      date -= aday;
      hours -= ahour;
      minutes -= aminute;
      seconds -= asecond;
      ms -= ams;
    }
  } else {
    switch (relative) {
      case "now":
        break;
      case "lastweek":
        date -= 7;
        break;
      case "lastyear":
        year -= 1;
        break;
      case "lastmonth":
        month -= 1;
        break;
      case "yestoday":
        date -= 1;
        hours = 0;
        minutes = 0;
        seconds = 0;
        ms = 0;
        break;
      case "tomorrow":
        date += 1;
        hours = 0;
        minutes = 0;
        seconds = 0;
        ms = 0;
        break;
      case "today":
        hours = 0;
        minutes = 0;
        seconds = 0;
        ms = 0;
        break;
    }
  }
  let computedDate = new Date(year, month, date, hours, minutes, seconds, ms);
  if (format === false) {
    return computedDate;
  } else if (typeof format === "string") {
    return formate(format, computedDate);
  } else {
    throw new TypeError(
      `The 'format' value must be false or a valid format string `
    );
  }
};
/**
 * @description Calculates the specified date relative to the current time
 * @param date {Date|Number} Date Object or timestamp
 * @returns {String} A string relative to the current time
 */
formate.relative = function(date) {
  if (
    "number" !== typeof date &&
    "number" !== typeof Number(date) &&
    !date instanceof Date
  ) {
    throw new TypeError(
      `Cannot resolve 'date' parameter,The parameter 'date' must be either a date object or a timestamp that represents date`
    );
  }
  let result = ""; //result return value
  let is_before = true; //ago
  let now = new Date();
  date = new Date(date);
  let diff_times = date.getTime() - now.getTime(); //diff milliseconds
  if (diff_times > 0) {
    is_before = false; //after
  }
  let diff_secs = Math.abs(diff_times) / 1000; //diff seconds
  let nDis = {
    num: 0, // Different Numbers
    desc: "just now" // description to show
  }; //mark diff
  let year = Math.floor(diff_secs / (365 * 24 * 60 * 60));
  let month = Math.floor(diff_secs / (30 * 24 * 60 * 60));
  let week = Math.floor(diff_secs / (7 * 24 * 60 * 60));
  let day = Math.floor(diff_secs / (24 * 60 * 60));
  let hour = Math.floor(diff_secs / (60 * 60));
  let minute = Math.floor(diff_secs / 60);
  if (year > 0) {
    nDis = {
      num: year,
      desc: year > 1 ? "years" : "year"
    };
  } else if (month > 0) {
    nDis = {
      num: month,
      desc: month > 1 ? "months" : "month"
    };
  } else if (week > 0) {
    nDis = {
      num: week,
      desc: week > 1 ? "weeks" : "week"
    };
  } else if (day > 0) {
    nDis = {
      num: day,
      desc: day > 1 ? "days" : "day"
    };
  } else if (hour > 0) {
    nDis = {
      num: hour,
      desc: hour > 1 ? "hours" : "hour"
    };
  } else if (minute > 0) {
    nDis = {
      num: minute,
      desc: minute > 1 ? "minutes" : "minute"
    };
  }
  if (nDis.num === 0) {
    result = nDis.desc;
  } else {
    if (is_before) {
      result = nDis.num + " " + nDis.desc + " ago";
    } else {
      result = "after " + nDis.num + " " + nDis.desc;
    }
  }
  return result;
};
/**
 * @description Judge whether the date is within the specified range
 * @param target {Date|timestamp} Date to judge
 * @param from {Date|timestamp} Start of date range
 * @param end {Date|timestamp} End of date range
 * @returns {Bollean} Returns `true` if the specified date is in the range, `false` otherwise
 */
formate.isBetween = function(target, start, end) {
  if (arguments.length !== 3) {
    throw new RangeError(
      `3 parameters are required ,but ${arguments.length} present`
    );
  }
  [target, start, end].forEach(item => {
    if ("number" !== typeof item && !isDate(item)) {
      throw new TypeError(`Parameters must be type of Number or Date`);
    }
  });
  target = new Date(target);
  start = new Date(start);
  end = new Date(end);
  return formate.isAfter(target, start) && formate.isBefore(target, end);
};
module.exports = formate;
