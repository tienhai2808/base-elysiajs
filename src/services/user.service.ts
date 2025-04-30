import { UpdateUserDtoType } from "./../dto/user.dto";
import { db } from "../lib/db.lib";
import { User, users } from "../models/user.model";
import { omit } from "../utils/omit.util";
import { eq, ilike, or } from "drizzle-orm";
import { redis } from "../lib/redis";

export type SafeUserRead = Omit<User, "password" | "createdAt" | "updatedAt">;

export const getAllUserService = async (): Promise<{
  users: SafeUserRead[];
}> => {
  const cachedUsers = await redis.get("base-elysiajs-user");
  if (cachedUsers) {
    return { users: JSON.parse(cachedUsers) };
  }
  const getUsers = await db.select().from(users);
  const safeUsers: SafeUserRead[] = getUsers.map((user) =>
    omit(user, ["password", "createdAt", "updatedAt"])
  );

  await redis.setex("base-elysiajs-user", 3600, JSON.stringify(safeUsers));

  return { users: safeUsers };
};

export const updateUserService = async (
  userId: string,
  body: UpdateUserDtoType
): Promise<{ user: SafeUserRead }> => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (existingUser.length == 0) {
    throw { status: 400, message: "Người dùng không tồn tại" };
  }

  if (body.username && existingUser[0].username != body.username) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, body.username))
      .limit(1);
    if (existingUser.length > 0) {
      throw { status: 400, message: "Username đã tồn tại" };
    }
  }

  const updatedUser = await db
    .update(users)
    .set({
      ...(body.username && { username: body.username }),
      ...(body.email && { email: body.email }),
      ...(body.first_name && { firstName: body.first_name }),
      ...(body.last_name && { lastName: body.last_name }),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  return { user: omit(updatedUser[0], ["password", "createdAt", "updatedAt"]) };
};

export const searchUserService = async (
  q: string
): Promise<{ users: SafeUserRead[] }> => {
  const result = await db
    .select()
    .from(users)
    .where(
      or(
        ilike(users.username, `%${q}%`),
        ilike(users.firstName, `%${q}%`),
        ilike(users.lastName, `%${q}%`)
      )
    );

  const safeUsers = result.map((user) =>
    omit(user, ["password", "createdAt", "updatedAt"])
  );
  return { users: safeUsers }
};
