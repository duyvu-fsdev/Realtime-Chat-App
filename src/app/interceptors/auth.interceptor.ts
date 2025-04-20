import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, from, map, mergeMap, Observable, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { WebsocketService } from "../services/websocket.service";

const requiresAuth = (url: string): boolean => {
  return !(
    url.includes("/login") ||
    url.includes("/register") ||
    url.includes("/forgot-password") ||
    url.includes("/reset-password") ||
    url.includes("/refresh-token") ||
    url.includes("/get-reg-otp") ||
    url.includes("/assets/i18n")
  );
};

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let isRefreshing = false;
  const auth = inject(AuthService);
  const wsService = inject(WebsocketService); // 🆕 Inject WebSocket Service

  if (!requiresAuth(req.url)) {
    return next(req).pipe(
      map((event: HttpEvent<any>) => {
        if (req.url.includes("/assets/i18n") && event instanceof HttpResponse) return event;
        if (event instanceof HttpResponse) {
          const responseData = event.body.data !== undefined ? event.body.data : event.body.message ?? event.body;
          return event.clone({ body: responseData });
        }
        return event;
      })
    );
  }

  return from(auth.getAccessToken()).pipe(
    switchMap((UserToken) =>
      from(wsService.getSocketId()).pipe(
        mergeMap((socketId) => {
          let authReq = req.clone({
            headers: UserToken?.token ? req.headers.set("Authorization", `Bearer ${UserToken.token}`) : req.headers,
          });

          if (socketId) authReq = authReq.clone({ headers: authReq.headers.set("x-socket-id", socketId) });

          return next(authReq).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                const responseData = event.body.data !== undefined ? event.body.data : event.body.message ?? event.body;
                return event.clone({ body: responseData });
              }
              return event;
            }),
            catchError((error) => {
              if (error.status !== 401 || isRefreshing) {
                throw error;
              } else {
                isRefreshing = true;
                return from(auth.refreshToken()).pipe(
                  switchMap((newToken) => {
                    isRefreshing = false;
                    const newReq = req.clone({
                      headers: req.headers.set("Authorization", `Bearer ${newToken}`),
                    });
                    return next(newReq);
                  }),
                  catchError((refreshError) => {
                    isRefreshing = false;
                    const err = { type: "refreshError", error: refreshError };
                    throw err;
                  })
                );
              }
            })
          );
        })
      )
    )
  );
};
