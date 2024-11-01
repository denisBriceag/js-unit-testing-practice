# Task 3: Mocking dates

You will need to write unit tests for the future `getUtcStringDate` method. The method takes a date object as a parameter and returns a string with a UTC date and time in [ISO8601 format](https://en.wikipedia.org/wiki/ISO_8601), as the example: `2007-01-31T23:15:00Z`.

Please pay you attention to the next scenarios:

- without arguments function uses current date (you should mock system time):
```ts
const formattedString = getUtcStringDate(); // returns current date
```
- system should accept a date from any time zone and return string in UTC. We need to check that the functionality works well with different time zones, you can use `timezoned-date` for it.

Useful links:

- [jest.setSystemTime](https://jestjs.io/docs/jest-object#jestsetsystemtimenow-number--date)
- [jest.useFakeTimers](https://jestjs.io/docs/jest-object#jestusefaketimersfaketimersconfig)
- [timezoned-date](https://www.npmjs.com/package/timezoned-date)

---

[[Back to the main page](../README.md)]
