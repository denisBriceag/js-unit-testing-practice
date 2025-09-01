describe("GlobalCounter (isolated per test)", () => {
  const load = () => {
    let GlobalCounter: typeof import("./index").GlobalCounter;

    jest.isolateModules(() => {
      ({ GlobalCounter } = require("./index"));
    });

    return GlobalCounter!;
  };

  it('should have initial value "0"', () => {
    const Counter = load();

    expect(Counter.getValue()).toBe(0);
  });

  it("should increment counter", () => {
    const Counter = load();

    Counter.increment(); // 1

    expect(Counter.getValue()).toBe(1);
  });

  it("should decrement value", () => {
    const Counter = load();

    Counter.decrement();

    expect(Counter.getValue()).toBe(-1);
  });

  it("should multiply counter", () => {
    const Counter = load();

    Counter.increment(); // 1
    Counter.increment(); // 2
    Counter.multiply(5); // 10

    expect(Counter.getValue()).toBe(10);
  });
});
