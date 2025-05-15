import { celsiusToFahrenheit } from "../page.js";

export const cToF = (celsius) => celsiusToFahrenheit(celsius);

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = { cToF };
}
