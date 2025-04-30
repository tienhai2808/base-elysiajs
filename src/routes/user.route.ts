import { UpdateUserDto } from "./../dto/user.dto";
import { Elysia, t } from "elysia";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getAllUserController,
  searchUserController,
  updateUserController,
} from "../controllers/user.controller";

const userRoutes = new Elysia({ prefix: "/users" })
  .onBeforeHandle(authMiddleware)
  .get("", getAllUserController, {
    detail: {
      tags: ["User"],
      summary: "Get all users"
    }
  })
  .patch("/:id", updateUserController, {
    body: UpdateUserDto,
    detail: { 
      tags: ["User"], 
      summary: "Update user",
    },
  })
  .get("/search", searchUserController, {
    query: t.Object({
      q: t.String({ minLength: 1 }),
    }),
    detail: {
      tags: ["User"],
      summary: "Search user",
    },
  });

export default userRoutes;
