import { QuantityValidator } from "./index";

describe("QuantityValidator", () => {
  // Constructor validation
  describe("constructor", () => {
    it("Should throw if threshold is negative", () => {
      expect(() => new QuantityValidator(-1, 5)).toThrow();
    });

    it.each([0, -1, -10])(
      "Should throw if packageSize is not greater than zero",
      (pkg) => {
        expect(() => new QuantityValidator(10, pkg)).toThrow();
      },
    );
  });

  // Quantity invalid values
  describe("the method should return false if quantity is less than zero or zero", () => {
    const validator = new QuantityValidator(10, 5);

    it("Should return false if quantity is less than zero", () => {
      const res = validator.validate(-1);
      expect(res.isValid).toBe(false);
    });

    it("Should return false if quantity is zero", () => {
      const res = validator.validate(0);
      expect(res.isValid).toBe(false);
    });
  });

  // Below threshold
  describe("the quantity exceeds the threshold and does not exceed", () => {
    const validator = new QuantityValidator(10, 5);

    it("Should be valid when quantity is below threshold, it is valid regardless of divisibility", () => {
      expect(validator.validate(1)).toEqual({ isValid: true, error: null });
      expect(validator.validate(7)).toEqual({ isValid: true, error: null });
      expect(validator.validate(9)).toEqual({ isValid: true, error: null });
    });
  });

  // At or above threshold → must be divisible by packageSize
  describe("the quantity is divisible by package size and is not divisible (when quantity >= threshold)", () => {
    it("should be valid when quantity >= threshold and divisible by packageSize (isValid=true, error=null)", () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate(10)).toEqual({ isValid: true, error: null });
      expect(validator.validate(15)).toEqual({ isValid: true, error: null });
      expect(validator.validate(20)).toEqual({ isValid: true, error: null });
    });

    it("should be invalid when quantity >= threshold and NOT divisible → error 'Quantity should be divisible by {N}'", () => {
      const validator = new QuantityValidator(10, 5);

      expect(validator.validate(11)).toEqual({
        isValid: false,
        error: "Quantity should be divisible by 5",
      });
      expect(validator.validate(16)).toEqual({
        isValid: false,
        error: "Quantity should be divisible by 5",
      });
    });

    it("should be invalid when quantity is exactly at threshold but not divisible by packageSize", () => {
      const validator = new QuantityValidator(11, 5);
      expect(validator.validate(11)).toEqual({
        isValid: false,
        error: "Quantity should be divisible by 5",
      });
    });
  });

  describe("boundary: threshold = 0 (every positive quantity must be divisible)", () => {
    const validator = new QuantityValidator(0, 5);

    it("should be invalid when quantity is non-divisible positive quantity", () => {
      expect(validator.validate(1)).toEqual({
        isValid: false,
        error: "Quantity should be divisible by 5",
      });
    });

    it("divisible positive quantity → valid", () => {
      expect(validator.validate(5)).toEqual({ isValid: true, error: null });
    });
  });
});
