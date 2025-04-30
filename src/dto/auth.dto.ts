import { t } from "elysia";

export const LoginDto = t.Object({
  username: t.String({ minLength: 3 }),
  password: t.String({ minLength: 6 }),
});

export const RegisterDto = t.Object({
  username: t.String({ minLength: 3 }),
  first_name: t.String(),
  last_name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
})

export type LoginDtoType = typeof LoginDto.static;
export type RegisterDtoType = typeof RegisterDto.static;

