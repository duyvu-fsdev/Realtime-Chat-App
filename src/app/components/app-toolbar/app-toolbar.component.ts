import { TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { addIcons } from "ionicons";
import { caretBack } from "ionicons/icons";

@Component({
  selector: "app-toolbar",
  templateUrl: "./app-toolbar.component.html",
  styleUrls: ["./app-toolbar.component.scss"],
  standalone: true,
  imports: [TitleCasePipe, IonicModule, TranslateModule],
})
export class AppToolbarComponent {
  @Input() defaultHref: string = "";
  @Input() title!: string;
  @Input() back = false;
  @Input() more = false;
  @Input() avatar!: string;

  constructor() {
    addIcons({ caretBack });
  }
}
