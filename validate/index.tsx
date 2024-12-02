import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const SignupSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone no must be 10 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
});
