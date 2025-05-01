import { TestDtoType } from './../dto/auth.dto';
import { loginService, registerService } from "../services/auth.service";
import { LoginDtoType, RegisterDtoType } from "../dto/auth.dto";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../utils/response.util";
import { generateJWT } from "../utils/auth.util";
import { Context } from "elysia";

export const testController = async ({body, set}: { body: TestDtoType, set: Context['set'] }) => {
  console.log(`Nội dung request gửi đến: ${body.request}`);
  set.status = 200;
  return { status: 200, message: "Hello world" }
}

export const loginController = async ({
  body,
  set,
  cookie,
}: {
  body: LoginDtoType;
  set: Context["set"];
  cookie: Context["cookie"];
}) => {
  try {
    const result = await loginService(body);
    set.status = 200;
    generateJWT({ id: result.user.id }, cookie);
    return createSuccessResponse("Đăng nhập thành công", 200, result);
  } catch (err: any) {
    console.log(`Lỗi đăng nhập: ${err.message}`);
    set.status = err.status || 500;
    return createErrorResponse(
      err.message || "Đăng nhập thất bại",
      Number(set.status) || 500
    );
  }
};

export const registerController = async ({
  body,
  set,
  cookie,
}: {
  body: RegisterDtoType;
  set: Context["set"];
  cookie: Context["cookie"];
}) => {
  try {
    const result = await registerService(body);
    set.status = 201;
    generateJWT({ id: result.user.id }, cookie);
    return createSuccessResponse("Đăng ký thành công", 201, result);
  } catch (err: any) {
    console.log(`Lỗi đăng ký người dùng: ${err.message}`);
    set.status = err.status || 500;
    return createErrorResponse(
      err.message || "Đăng ký thất bại",
      Number(set.status) || 500
    );
  }
};

export const logoutController = async ({
  set,
  cookie,
}: {
  set: Context["set"];
  cookie: Context["cookie"];
}) => {
  try {
    cookie.refreshToken.set({
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      secure: false,
    });
    return createSuccessResponse("Đăng xuất thành công", 200)
  } catch (err) {
    console.log(` Lỗi đăng xuất: ${err}`);
    set.status = 500;
    return createErrorResponse("Đăng xuất thất bại", 500);
  }
};
