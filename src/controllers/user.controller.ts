import { UpdateUserDtoType } from "./../dto/user.dto";
import { Context } from "elysia";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../utils/response.util";
import { getAllUserService, searchUserService, updateUserService } from "../services/user.service";

export const getAllUserController = async ({ set }: Context) => {
  const result = await getAllUserService();
  set.status = 200;
  return createSuccessResponse(
    "Lấy tất cả thông tin người dùng thành công",
    200,
    result
  );
};

export const updateUserController = async ({
  body,
  params,
  set,
}: {
  body: UpdateUserDtoType;
  set: Context["set"];
  params: Context["params"];
}) => {
  try {
    const result = await updateUserService(params.id, body);
    set.status = 200;
    return createSuccessResponse("Cập nhật người dùng thành công", 200, result);
  } catch (err: any) {
    console.log(`Lỗi cập nhật người dùng: ${err.message}`);
    set.status = err.status || 500;
    return createErrorResponse(
      err.message || "Cập nhật người dùng thất bại",
      Number(set.status) || 500
    );
  }
};

export const searchUserController = async ({ query, set }: Context) => {
  const result = await searchUserService(query.q);
  set.status = 200;
  return createSuccessResponse("Tìm kiếm người dùng thành công", 200, result)
}
