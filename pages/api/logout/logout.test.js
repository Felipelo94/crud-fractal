import { serialize } from "cookie";
import logoutHandler from "./index.js";

jest.mock("cookie");

describe("logoutHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return Not logged in if userToken cookie is not present", () => {
    const req = { cookies: {} };
    const res = { status: jest.fn().mockReturnValue({ json: jest.fn() }) };

    logoutHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().json).toHaveBeenCalledWith({ error: "Not logged in" });
  });

  test("should set userToken cookie to null and return Logout successful", () => {
    const req = { cookies: { userToken: "existingToken" } };
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };
    const serializedCookie =
      "userToken=null; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=strict";

    serialize.mockReturnValue(serializedCookie);

    logoutHandler(req, res);

    expect(serialize).toHaveBeenCalledWith("userToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    expect(res.setHeader).toHaveBeenCalledWith("Set-Cookie", serializedCookie);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status().json).toHaveBeenCalledWith({
      message: "Logout successful",
    });
  });
});
