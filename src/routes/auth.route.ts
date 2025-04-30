import { Elysia, t } from "elysia";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import {
  loginController,
  registerController,
  logoutController,
} from "../controllers/auth.controller";
import { ErrorResponse, SuccessResponse } from "../utils/response.util";

const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/login", loginController, {
    body: LoginDto,
    detail: {
      tags: ["Auth"],
      summary: "Login user",
    },
  })
  .post("/register", registerController, {
    body: RegisterDto,
    detail: {
      tags: ["Auth"],
      summary: "Register user",
    },
  })
  .post("/logout", logoutController, {
    detail: {
      tags: ["Auth"],
      summary: "Logou user",
    },
  });

export default authRoutes;
