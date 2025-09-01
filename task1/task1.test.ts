import { validateUserName } from "./index";
import { fetchIsUserNameAvailable } from "./fetchIsUserNameValid";

jest.mock("./fetchIsUserNameValid", () => ({
  fetchIsUserNameAvailable: jest.fn(),
}));

const mockedFetch = fetchIsUserNameAvailable as jest.MockedFunction<
  typeof fetchIsUserNameAvailable
>;

describe("validateUserName", () => {
  beforeEach(() => jest.resetAllMocks());

  it("should return false if name has length less than 3 symbols", async () => {
    await expect(validateUserName("ab")).resolves.toBe(false);

    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("should contain only alphanumeric symbols (no spaces either)", async () => {
    await expect(validateUserName("ab#")).resolves.toBe(false);
    await expect(validateUserName("ab c")).resolves.toBe(false);

    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("should not start with a number", async () => {
    await expect(validateUserName("1abc")).resolves.toBe(false);

    expect(mockedFetch).not.toHaveBeenCalled();
  });

  it("should be unique", async () => {
    mockedFetch.mockResolvedValueOnce(true);

    await expect(validateUserName("Abc123")).resolves.toBe(true);

    expect(mockedFetch).toHaveBeenCalledWith("Abc123");
  });

  it("should return false when availability check says the name is NOT available (the name should be unique)", async () => {
    mockedFetch.mockResolvedValueOnce(false);

    await expect(validateUserName("Denis")).resolves.toBe(false);

    expect(mockedFetch).toHaveBeenCalledWith("Denis");
  });

  it("should return false if fetchIsUserNameAvailable fails", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("network error"));

    await expect(validateUserName("Anastasia")).resolves.toBe(false);

    expect(mockedFetch).toHaveBeenCalledWith("Anastasia");
  });
});
