// src/utils/calculator.test.js
import { cToF } from "./weatherTest.js";

describe("celsiusToFahrenheit", () => {
  it("converts Celsius to Fahrenheit correctly", () => {
    const input = 25;
    const result = cToF(input);
    expect(result).toBe(77); // expected result
  });
  it("returns NaN if no temperature is provided", () => {
    const result = cToF({});
    expect(result).toBeNaN(); // Expected NaN for invalid input
  });

  it("returns NaN if data is null", () => {
    const result = cToF(null);
    expect(result).toBeNaN(); // Expected NaN for null input
  });
});
