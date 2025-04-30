import { t } from "elysia";

export const UpdateUserDto = t.Object({
  username: t.Optional(t.String({ minLength: 3 })),
  email: t.Optional(t.String({ format: "email" })),
  first_name: t.Optional(t.String()),
  last_name: t.Optional(t.String()),
});

export type UpdateUserDtoType = typeof UpdateUserDto.static;
