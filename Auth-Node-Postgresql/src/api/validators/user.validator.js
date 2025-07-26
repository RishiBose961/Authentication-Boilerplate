import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
