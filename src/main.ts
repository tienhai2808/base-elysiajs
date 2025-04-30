import { app } from "./app";
import { config } from "./config/app.config";

app.listen(config.port, () => {
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
});