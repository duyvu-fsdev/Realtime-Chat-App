import { Routes } from "@angular/router";
import { AuthPage } from "./auth.page";

export const authRoutes: Routes = [
  {
    path: "",
    component: AuthPage,
  },
  {
    path: "reset-password",
    loadComponent: () => import("./reset-password/reset-password.page").then((m) => m.ResetPasswordPage),
  },
  {
    path: "login",
    loadComponent: () => import("./login/login.page").then((m) => m.LoginPage),
  },
  {
    path: "register",
    loadComponent: () => import("./register/register.page").then((m) => m.RegisterPage),
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./forgot-password/forgot-password.page").then((m) => m.ForgotPasswordPage),
  },
];
