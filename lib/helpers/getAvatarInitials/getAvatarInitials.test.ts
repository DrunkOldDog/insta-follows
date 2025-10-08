import { getAvatarInitials } from "./getAvatarInitials";

describe("getAvatarInitials", () => {
  it("should return the initials of the user", () => {
    const userMetadata = { name: "John Doe" };
    const initials = getAvatarInitials(userMetadata);
    expect(initials).toBe("JD");

    const userMetadata2 = {
      name: "Travis Barker",
    };
    const initials2 = getAvatarInitials(userMetadata2);
    expect(initials2).toBe("TB");
  });

  describe("when the name is not provided", () => {
    it("should return first two letters of the email when it has a dot separator", () => {
      const userMetadata = { email: "john.doe@example.com" };
      const initials = getAvatarInitials(userMetadata);
      expect(initials).toBe("JD");

      const userMetadata2 = { email: "travis.barker@example.com" };
      const initials2 = getAvatarInitials(userMetadata2);
      expect(initials2).toBe("TB");
    });

    it("should return first two letters of the email when it has no dot separator", () => {
      const userMetadata = { email: "john@example.com" };
      const initials = getAvatarInitials(userMetadata);
      expect(initials).toBe("JO");

      const userMetadata2 = { email: "travis@example.com" };
      const initials2 = getAvatarInitials(userMetadata2);
      expect(initials2).toBe("TR");
    });
  });

  it("should return an empty string if the name and email are not provided", () => {
    const userMetadata = {};
    const initials = getAvatarInitials(userMetadata);
    expect(initials).toBe("");
  });
});
