
import { z } from "zod";

export const profileSchema = z.object({
  username: z.string().min(6, "Username at least 6 characters"),
  email: z.string().email("Invalid email"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters").max(15),
    confirm_password: z.string().min(6, "Confirm password must be at least 6 characters").max(15),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"], 
      });
    }
  });