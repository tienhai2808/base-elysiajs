import jwt from "jsonwebtoken";
import { db } from "../lib/db.lib";
import { User, users } from "../models/user.model";
import { config } from "../config/app.config";
import { Context } from "elysia";
import { eq } from "drizzle-orm";
import { createErrorResponse } from "../utils/response.util";

export interface AuthContext extends Context {
  store: {
    user?: User;
  }
}

export const authMiddleware = async ({ cookie, set, store }: AuthContext) => {
  const token = cookie.refreshToken?.value;
  if (!token) {
    set.status = 401;
    return createErrorResponse("Chưa được cấp token", 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    const getUser = await db
      .select()
      .from(users)
      .where(eq(users.id, decoded.id))
      .limit(1);

    if (getUser.length === 0) {
      set.status = 404;
      return createErrorResponse("Không tìm thấy người dùng", 404)
    }

    store.user = getUser[0] as User;

  } catch (err: any) {
    console.error(`Lỗi xác thực: ${err.message}`);
    set.status = 401;
    return createErrorResponse("Token không hợp lệ", 401)
  }
};
