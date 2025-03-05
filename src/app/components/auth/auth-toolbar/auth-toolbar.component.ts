import { TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "auth-toolbar",
  templateUrl: "./auth-toolbar.component.html",
  styleUrls: ["./auth-toolbar.component.scss"],
  standalone: true,
  imports: [TitleCasePipe, IonicModule, TranslateModule],
})
export class AuthToolbarComponent {
  @Input() defaultHref: string = "auth";
  @Input() title!: string;
}
