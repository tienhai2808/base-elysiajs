import { t } from "elysia";

export const createErrorResponse = (message: string, status: number = 400) => ({
  message,
  status
});

export const createSuccessResponse = (message?: string, status: number = 200, data?: any) => ({
  message,
  status,
  data,
})

export const ErrorResponse = t.Object({
  message: t.String(),
  status: t.Number()
});

export const SuccessResponse = t.Object({
  data: t.Optional(t.Any()),
  message: t.Optional(t.String()),
  status: t.Number()
});