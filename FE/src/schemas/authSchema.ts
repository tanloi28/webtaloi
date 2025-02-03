import * as z from "zod";

export const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(255),
});

export const registerSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6).max(255),
		confirmPassword: z.string().min(6).max(255),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password and confirm password must be the same",
		path: ["confirmPassword"],
	});