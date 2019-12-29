# date-formately

`date-formately` is a JavaScript library for date formatting,supports **brower** and **[node.js](https://nodejs.org/en)**.

# Features

- Support both **browser** environment and **[node.js](https://nodejs.org/en)** environment.
- Resolve to the corresponding date expression string or date object according to the format string.
- Support calculation of relative date.
- Support for custom week and month strings.
- Many date format characters complete your most complex formatting in the simplest way.
- Some practical date comparison functions are provided.

# Install

`npm`:

```js
 npm install date-formately --save
```

`bower`:

```js
 bower install date-formately --save
```

`yarn`:

```js
 yarn add date-formately
```

# Usage

'date-formately' supports **Commonjs**, **AMD** and **Browser**. You can use it according to different environments.

### Commonjs

1.  Formate date

    - The easiest way to use it is:

      ```js
      const formate = require("date-formately");
      console.log(formate()); // output is "2018-12-20 16:25:55",depends on current date
      // alias to `formate`
      console.log(formate.format()); // output is "2018-12-20 16:25:55",depends on current date
      ```

    - Customized use:

      ```js
      const formate = require("date-formately");
      console.log(formate("YYYY/MM/DD HH:II:SS aa", new Date(2018, 12, 20))); // output is "2018/12/20 00:00:00 am"
      console.log(formate("YY/mm/dd hh:ii:ss  WW")); // output is "19/12/25 23:23:59  Wednesday"
      // Customize the display text for months and weeks
      console.log(
        formate("YY/mm/dd hh:ii:ss NN WW", Date.now(), {
          months: [
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
          ],
          // Note : the first item in the array is Sunday!
          weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        })
      ); // output is "19/12/25 23:23:59 Dec Wed"
      // alias to `formate`
      console.log(formate.format("YYYY/MM/DD HH:II:SS aa", "1547913600000")); // output is "2018/12/20 00:00:00 am"
      ```

2.  Resolve relative date

```js
const formate = require("date-formately");
console.log(formate.resolve("+3days4hours")); // output is "2019-12-20 20:25:55"
console.log(formate.resolve("-3years2weeks","YYYY/MM/DD HH:II:SS aa")); // output is "2016/12/20 16:25:55 pm"
console.log(formate.resolve("lastweek")); // output is "2019-12-13 16:25:55"
let date= formate.resolve("lastweek",false); // return a native Date Object
console.log(formate.relative(new Date(2017, 8, 24)));// output is "2 years ago"
let timestamp = Date.now();
console.log(formate.relative(timestamp)));// output is "2 minutes ago"
```

3.  Compare date

```js
const formate = require("date-formately");
console.log(formate.isBefore(new Date(2017, 8, 24))); // output is "true"
console.log(formate.isAfter(new Date(2017, 8, 24), new Date())); // output is "false"
console.log(formate.isLeapYear(2082)); // output is "false"
console.log(formate.compare(new Date(2017, 8, 24), new Date(2018, 8, 24))); // output is "-1"
console.log(
  formate.isBetween(1577286966411, new Date(2016, 8, 24), new Date(2018, 8, 24))
); // output is "false"
```

### Browser

The easiest way to use it in a browser is to introduce script tags, this exposes a `dateFm` object globally:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script src="./node_modules/dist/date-formately.js"></script>
    <script>
      // window.formate is the date formator
      let date = window.formate.resolve("tomorrow", false); // return a native Date Object
      // date.getFullYear();
      // ...
    </script>
  </body>
</html>
```

### Other

If you want to use `date-formately` in other packaging based engineering projects, it's very simple. Just import it and use it

```js
import formate from "date-formately";
let sDate = formate.format();
// ...
```

# Api

Let's call the date format object exposed by [date-formately](https://www.npmjs.com/package/date-formately) `formate`, and then

#### <span id= "formate">formate(format?:String, time?:Date|Timestamp = new Date(),options?:{months?:String[],weeks?:String[]}={}):String</span>

- **description** : Returns the corresponding format string according to the specified date format;
- **params** :  
   `format`:(String) format string,default to 'YYYY-MM-DD HH:II:SS'. see the following table for the [supported format symbols](#format).

  `time` :(Date|Number) Date object or timestamp to format,default to current time.

  `options`:(Object:{weeks,months}) Optional,custom month and week configuration objects,default to {};

  `options.weeks` :(Array) Array of custom weeks,

  `options.months`: (Array) Array of custom months

The following table is <span id="format">**supported format symbols:**</span>

> **Note**:Sometimes the normal text we display may contain `date-formately` predefined format characters. At this time, `date-formately` will also convert these characters, which may not be what we want. So in order to ensure that predefined format characters do not conflict with ordinary text characters, our built-in predefined format characters are composed of two characters,as listed in the table below：

| symbol | description                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------- |
| YYYY   | 4-digit year,eg. '2018'                                                                             |
| YY     | 2-digit year,eg. '18'                                                                               |
| MM     | Month with leading 0,eg. '07'                                                                       |
| mm     | Months without leading 0,eg. '7'                                                                    |
| DD     | Date with leading 0,eg. '06'                                                                        |
| dd     | Date without leading 0,eg. '6'                                                                      |
| HH     | 24 hour system with leading 0,eg. '22'                                                              |
| hh     | 24 hour system without leading 0,eg. '8'                                                            |
| KK     | 12 hour system with leading 0,eg. '06'                                                              |
| kk     | 12 hour system without leading 0,eg. '6'                                                            |
| II     | Minutes with leading 0,eg. '09'                                                                     |
| ii     | Minutes without leading 0,eg. '9'                                                                   |
| SS     | Seconds with leading 0,eg. '01'                                                                     |
| ss     | Seconds without leading 0,eg. '1'                                                                   |
| aa     | lower afternoon sign in capital,eg. 'am','pm'                                                       |
| AA     | Upper afternoon sign in capital,eg. 'AM','PM'                                                       |
| jj     | Days of the current year,eg. '365' or '366'                                                         |
| NN     | Complete spelling of English month names,eg.'December',can be overridden by custom `options.months` |
| nn     | Abbreviation of English month name,eg. 'Dec',can be overridden by custom `options.months`           |
| WW     | Complete spelling of English week names ,eg. 'Sunday',can be overridden by custom `options.weeks`   |
| ww     | Abbreviation of English week name, eg. 'Sun' ,can be overridden by custom `options.weeks`           |

- **returns**:(String) formated string

#### formate.format(format?:String, date?:Date|Timestamp = new Date(),options?:{months?:String[],weeks?:String[]}={}):String

- **description** : The alias of [formate](#formate) above.

#### formate.isLeapYear(year:Number|String|Date)

- **description** : Decide if it's a leap year
- **params** :  
  `year`:(Number|String|Date)Accept a date object , a number representing the year or a string representing the year can be converted to Number
- **returns**:(Boolean) Return `true` if leap year, `false` otherwise

#### formate.isBefore(target:Date, comparator?:Date = new Date()):Boolean

- **description** : Determine whether target precedes comparator
- **params** :  
  `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns** (Boolean) If target returns `true` before comparator, `false` otherwise

#### formate.isAfter(target:Date, comparator?:Date = new Date()):Boolean

- **description** : Determine whether target follows comparator
- **params** :  
  `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns** :(Boolean) If target returns `true` after comparator, `false` otherwise

#### formate.isEqual(target:Date, comparator?:Date = new Date()):Boolean

- **description** : Determine if two dates are equal
- **params** :  
  `target`: (Date) Date to compare
  `comparator` : (Date) Date to be compared;default to current time
- **returns** :(Boolean) Return true if it is the same date, otherwise return false

#### formate.compare(target:Date, comparator?:Date = new Date()):Number

- **description** : Compare two dates.
- **params** :  
   `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns**:(Boolean) If target is larger than comparator, return 1, equal return 0, otherwise return - 1

#### formate.resolve(relative:String, format?:String|false = "YYYY-MM-DD HH:II:SS"):Date|String

- **description** : Resolve relative date
- **params** :
  `relative`:(String) The relative date mark such as '+3year4month' and the mark consists of `operator` and `token`:

  For example, in '+3year4month', '+' is called operator, 'year' and 'month' are valid tokens, and their combination represents a certain meaning.

supported operators are: `+(add)` ,`-(sub)`

supported tokens are: `year(s)`, `month(s)`, `day(s)`, `week(s)` ,`hour(s)`, `minute(s)`, `second(s)` ,`millisecond(s)`, `now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yestoday`, `tomorrow`, `today`;

> **Note:** The above token and operator represent a certain meaning. In order to meet the specific application, try **not to** mix the operator `+` or `-` with the following specific token:`now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yestoday`, `tomorrow`, `today`,this will cause parsing errors!

`format`:(String) format string ,type: `string`|`false`.see valid [format](#format) symbols above.

- **returns**: (Date|String) If `format` is set to `false`, it will return a parsed date object, otherwise it will return the format string of the parsed object!

#### formate.relative(date:Date|timestamp):String

- **description** : Calculates the specified date relative to the current time and return the corresponding string
- **params** :  
   `date`: Date|timestamp

#### formate.isBetween(target:Date|timestamp, start:Date|timestamp, end:Date|timestamp):Boolean

- **description** Judge whether the date is within the specified range
- **params**:

  `target`:(Date|Number) Date to judge

  `start`:(Date|Number) Start of date range

  `end`:(Date|Number) End of date range

- **returns**:(Boolean) Returns `true` if the specified date is in the range, `false` otherwise

# Parsing strings to Date

Considering that parsing date format strings into date objects is only a small requirement and easy to implement,the `date-formately` library does **not support** this function, but if you're looking for anything more sophisticated than that you should probably look for a better library ([momentjs](https://momentjs.com) does pretty much everything).
