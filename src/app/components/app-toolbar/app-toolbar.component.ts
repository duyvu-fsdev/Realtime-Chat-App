import { TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./app-toolbar.component.html",
  styleUrls: ["./app-toolbar.component.scss"],
  standalone: true,
  imports: [TitleCasePipe, IonicModule, TranslateModule],
})
export class AppToolbarComponent {
  @Input() defaultHref: string = "app";
  @Input() title!: string;
}
