import bcrypt from 'bcrypt';
import { users, type NewUser } from "../models/user.model";
import { LoginDtoType, RegisterDtoType } from "../dto/auth.dto";
import { db } from "../lib/db.lib";
import { eq, and, or, desc } from "drizzle-orm";
import { omit } from '../utils/omit.util';
import { SafeUserRead } from './user.service';

type SafeUserCreate = Omit<NewUser, 'password' | 'createdAt' | 'updatedAt'>

export const loginService = async (body: LoginDtoType): Promise<{ user: SafeUserRead }> => {
  const { username, password } = body;
  const getUser = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (getUser.length > 1) {
    throw { status: 500, message: "Lỗi hệ thống" }
  }
  if (getUser.length == 0) {
    throw { status: 400, message: "Username không tồn tại" }
  }

  const user = getUser[0];

  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    throw { status: 400, message: "Mật khẩu không khớp" }
  }

  return { user: omit(user, ['password', 'createdAt', 'updatedAt']) }
};

export const registerService = async (body: RegisterDtoType): Promise<{ user: SafeUserCreate }> => {
  const { username, email, password, first_name, last_name } = body;
  const existingUser = await db
    .select()
    .from(users)
    .where(or(eq(users.username, username), eq(users.email, email))).limit(1);
  if (existingUser.length > 0) {
    if (existingUser[0].username === username) {
      throw { status: 400, message: "Username đã tồn tại" };
    } else {
      throw { status: 400, message: "Email đã tồn tại" };
    }
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser: NewUser = {
    username: username,
    email: email,
    password: hashedPassword,
    firstName: first_name,
    lastName: last_name,
  }

  const createdUser = await db.insert(users).values(newUser).returning();
  if (createdUser.length === 0) {
    throw { status: 500, message: "Không thể tạo người dùng" };
  }

  return { user: omit(createdUser[0], ['password', 'createdAt', 'updatedAt']) }
};
