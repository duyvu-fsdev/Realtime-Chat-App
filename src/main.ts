import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from "@angular/router";
import { IonicRouteStrategy, provideIonicAngular } from "@ionic/angular/standalone";

import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { provideTranslateService, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { importProvidersFrom } from "@angular/core";
import { IonicStorageModule } from "@ionic/storage-angular";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./app/interceptors/auth.interceptor";
import { addIcons } from "ionicons";
import * as icons from "ionicons/icons";

import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// (() => {
//   const allIcons = Object.entries(icons).reduce((acc: { [key: string]: any }, [key, value]) => {
//     if (key.endsWith("Outline") || key.endsWith("Sharp")) {
//       acc[key] = value;
//     }
//     return acc;
//   }, {});

//   addIcons(allIcons);
// })();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: "md" }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideTranslateService(),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(IonicStorageModule.forRoot()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
});
