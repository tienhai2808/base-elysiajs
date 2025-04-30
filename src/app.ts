import { Elysia } from "elysia";
import authRoutes from "./routes/auth.route";
import { swaggerPlugin } from "./plugins/swagger.plugin";
import userRoutes from "./routes/user.route";
import cookie from "@elysiajs/cookie";

export const app = new Elysia({ prefix: "/elysia-bun" })
  .use(swaggerPlugin)
  .use(cookie())
  .get("/", () => "Hello ElysiaJS + BunJS")
  .use(authRoutes)
  .use(userRoutes);
