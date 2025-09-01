import { getUtcStringDate } from "tasks/task3";
import { setupMockDate, MockDateSetup } from "./testUtils";

// This regular expression enforces the following EXACT shape YYYY-MM-DDTHH:MM:SSZ, with NO milliseconds.
const REG_EXP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

describe("task3 / getUtcStringDate", () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  const expectIsoZ = (s: string) => {
    expect(s).toMatch(REG_EXP);
  };

  it("should use current system date when called without arguments", () => {
    mockDate.set({ isoDate: "2007-01-31T23:15:00Z" });

    const formatted = getUtcStringDate();

    expectIsoZ(formatted);
    expect(formatted).toBe("2007-01-31T23:15:00Z");
  });

  it("should convert a date created in +03:00 to correct UTC string", () => {
    mockDate.set({ offset: 180 }); // minutes

    const localDate = new Date(2007, 0, 31, 23, 15, 0);
    const formatted = getUtcStringDate(localDate);

    expectIsoZ(formatted);
    expect(formatted).toBe("2007-01-31T20:15:00Z");
  });

  it("should convert a date created in -05:00 to correct UTC string (crosses day boundary)", () => {
    mockDate.set({ offset: -300 });

    const localDate = new Date(2007, 0, 31, 23, 15, 0);
    const formatted = getUtcStringDate(localDate);

    expectIsoZ(formatted);
    expect(formatted).toBe("2007-02-01T04:15:00Z");
  });

  it("should return a UTC ISO string for an arbitrary provided date", () => {
    mockDate.set({ isoDate: "2015-12-24T06:00:00Z", offset: 0 });

    const d = new Date(Date.UTC(2020, 6, 4, 12, 34, 56));
    const formatted = getUtcStringDate(d);

    expectIsoZ(formatted);
    expect(formatted).toBe("2020-07-04T12:34:56Z");
  });

  it("should always returns an ISO8601 UTC string ending with Z", () => {
    mockDate.set({ isoDate: "1999-11-30T00:00:00Z" });

    const formattedNoArg = getUtcStringDate();
    expect(formattedNoArg).toBe("1999-11-30T00:00:00Z");
    expectIsoZ(formattedNoArg);

    const d = new Date(Date.UTC(2011, 2, 5, 14, 8, 7));
    const formattedArg = getUtcStringDate(d);
    expect(formattedArg).toBe("2011-03-05T14:08:07Z");
    expectIsoZ(formattedArg);
  });
});
