import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("plese enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPass: z.string(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "passwords do not match",
    path: ["confirmPass"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
