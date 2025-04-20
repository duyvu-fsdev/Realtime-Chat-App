import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { TranslateDirective, TranslateModule, TranslatePipe } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AuthToolbarComponent } from "./components/auth/auth-toolbar/auth-toolbar.component";
import { BackgroundComponent } from "./components/auth/background/background.component";
import { RouterModule } from "@angular/router";
import { AppToolbarComponent } from "./components/app-toolbar/app-toolbar.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    BackgroundComponent,
    AuthToolbarComponent,
    TranslatePipe,
    TranslateDirective,
    RouterModule,
    AppToolbarComponent,
    PickerModule,
    EmojiModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    BackgroundComponent,
    AuthToolbarComponent,
    TranslatePipe,
    TranslateDirective,
    RouterModule,
    AppToolbarComponent,
    PickerModule,
    EmojiModule,
  ],
})
export class ComponentsModuleShare {}
