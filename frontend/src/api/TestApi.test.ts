import { getGitHubProfile } from "./TestApi";

describe("getUser() using Promises", () => {
  it("should load user data", () => {
    return getGitHubProfile("ShaanCoding").then((data) => {
      expect(data).toBeDefined();
      expect(data.name).toEqual("Shaan Khan");
    });
  });
});
