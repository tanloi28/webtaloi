export interface User {
    email: string;
    password: string;
    confirmPassword: string;
    _id?: string;
    role?: "admin" | "member" | "guest";
  }