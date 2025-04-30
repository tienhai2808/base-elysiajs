import { object, string, parse } from 'valibot';

const EnvSchema = object({
  PORT: string(),
  JWT_SECRET: string(),
  DATABASE_URL: string(),
});

const env = parse(EnvSchema, process.env);

export const config = {
  port: Number(env.PORT),
  jwtSecret: env.JWT_SECRET,
  dbUrl: env.DATABASE_URL,
};
