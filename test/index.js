// const formate = require("../dist/date-fm");
const formate = require("../src/index");
console.log(formate.resolve("+3years"));
console.log(formate.resolve("-3years2weeks"));
console.log(formate.relative(new Date(2017, 8, 24)));
console.log(formate.isBefore(new Date(2017, 8, 24)));
console.log(
  formate.isBetween(1577286966411, new Date(2016, 8, 24), new Date(2018, 8, 24))
);
console.log(formate.isLeapYear(2082));
console.log(formate.compare(new Date(2017, 8, 24), new Date(2018, 8, 24)));
console.log(
  formate("YY/mm/dd hh:ii:ss NN WW", new Date(), {
    months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  })
);
