import { serialize } from "cookie";
import { logger } from "../../../lib/logger/logger";

export default function logoutHandler(req, res) {
  const { userToken } = req.cookies;
  if (!userToken) {
    logger.info({
      userIp: req.headers["x-forwarded-for"],
      action: "Logout",
      msg: "Not logged in",
    });
    return res.status(401).json({ error: "Not logged in" });
  }

  const serialized = serialize("userToken", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  logger.info({
    userIp: req.headers["x-forwarded-for"],
    action: "Logout",
    msg: "Logout successful",
  });
  return res.status(200).json({
    message: "Logout successful",
  });
}
