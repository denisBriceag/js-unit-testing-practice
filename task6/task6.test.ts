import { ApiService, UserService, User } from "./index";

/** Manual stub class for ApiService */
class StubApiService extends ApiService {
  private readonly users: Record<string, User>;

  constructor(users: Record<string, User> = {}) {
    super();
    this.users = users;
  }

  async fetchUser(userId: string): Promise<User> {
    if (this.users[userId]) {
      return this.users[userId];
    }

    return { id: userId, firstName: "Denis", lastName: "Briceag" };
  }
}

describe("UserService - getUserName (manual stub)", () => {
  it("should return full name from stubbed ApiService", async () => {
    const stub = new StubApiService({
      "1": { id: "1", firstName: "Spider", lastName: "Man" },
    });
    const svc = new UserService(stub);

    await expect(svc.getUserName("1")).resolves.toBe("Spider Man");
  });

  it("should handle different userIds correctly", async () => {
    const stub = new StubApiService({
      a1: { id: "a1", firstName: "Steve", lastName: "Angello" },
      b2: { id: "b2", firstName: "Sebastian", lastName: "Ingrosso" },
    });
    const svc = new UserService(stub);

    await expect(svc.getUserName("a1")).resolves.toBe("Steve Angello");
    await expect(svc.getUserName("b2")).resolves.toBe("Sebastian Ingrosso");

    await expect(svc.getUserName("x9")).resolves.toBe("Denis Briceag");
  });
});
