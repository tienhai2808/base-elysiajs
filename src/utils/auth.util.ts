import jwt from "jsonwebtoken";
import { config } from "../config/app.config";
import { Context } from "elysia";

export const generateJWT = (payload: object, cookie: Context['cookie']) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "7d",
  });

  cookie.refreshToken.set({
    value: token,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    sameSite: "strict",
    secure: false,
  });
};
