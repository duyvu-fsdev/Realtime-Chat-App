import { Routes } from "@angular/router";

export const conversationRoutes: Routes = [
  { path: "create", loadComponent: () => import("./conversation-create/conversation-create.page").then((m) => m.ConversationCreatePage) },
  { path: "new", loadComponent: () => import("./conversation-detail/conversation-detail.page").then((m) => m.ConversationDetailPage) },
  { path: ":id", loadComponent: () => import("./conversation-detail/conversation-detail.page").then((m) => m.ConversationDetailPage) },
  { path: "", loadComponent: () => import("./conversations.page").then((m) => m.ConversationsPage) },
];
