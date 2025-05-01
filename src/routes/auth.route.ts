import { TestDto } from './../dto/auth.dto';
import { Elysia } from "elysia";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import {
  loginController,
  registerController,
  logoutController,
  testController,
} from "../controllers/auth.controller";

const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/test", testController, {
    body: TestDto,
  })
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
