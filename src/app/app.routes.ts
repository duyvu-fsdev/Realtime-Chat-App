import { Routes } from "@angular/router";
import { authRoutes } from "./pages/auth/auth-routing";
import { conversationRoutes } from "./pages/conversations/conversations-routing";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "auth", children: authRoutes },

  {
    path: "conversations",
    children: conversationRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: "connections",
    loadComponent: () => import("./pages/connections/connections.page").then((m) => m.ConnectionsPage),
    canActivate: [AuthGuard],
  },
  {
    path: "connections/:id",
    loadComponent: () => import("./pages/connections/connection-detail/connection-detail.page").then((m) => m.ConnectionDetailPage),
    canActivate: [AuthGuard],
  },

  { path: "**", redirectTo: "conversations" },
];
