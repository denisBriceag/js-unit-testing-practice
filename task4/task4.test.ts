import { validateMathExpression } from "./index";

describe("task 4", () => {
  describe.each`
    title                                  | expr
    ${"simple addition"}                   | ${"2+2"}
    ${"multiplication with decimal point"} | ${"3.14*2"}
    ${"parentheses around a number"}       | ${"(2)+3"}
    ${"value keyword with division"}       | ${"value/(5)"}
    ${"scientific notation + subtraction"} | ${"-1.5e+3-2"}
    ${"comma as decimal separator"}        | ${"2,5 + 3"}
  `("positive → $title", ({ expr }) => {
    it(`returns true for "${expr}"`, () => {
      expect(validateMathExpression(expr)).toBe(true);
    });
  });

  describe.each`
    title                             | expr
    ${"empty string"}                 | ${""}
    ${"empty parentheses"}            | ${"()"}
    ${"trailing operator"}            | ${"1+"}
    ${"value with trailing operator"} | ${"value+"}
    ${"letters only around plus"}     | ${"a+b"}
  `("negative → $title", ({ expr }) => {
    it(`returns false for "${expr}"`, () => {
      expect(validateMathExpression(expr)).toBe(false);
    });
  });
});
