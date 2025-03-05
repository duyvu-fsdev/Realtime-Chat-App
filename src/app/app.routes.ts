import { Routes } from "@angular/router";
import { authRoutes } from "./pages/auth/auth-routing";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "auth", children: authRoutes },
  {
    path: "conversations",
    loadComponent: () => import("./pages/conversation/conversation.page").then((m) => m.ConversationPage),
    canActivate: [AuthGuard],
  },
  {
    path: "conversations/:id",
    loadComponent: () => import("./pages/conversation/conversation-detail/conversation-detail.page").then((m) => m.ConversationPage),
    canActivate: [AuthGuard],
  },
];
