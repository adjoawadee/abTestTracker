import { Component } from '@angular/core';
import { SearchPipe} from "../shared/pipes/search.pipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[SearchPipe]
})
export class AppComponent {
  title = 'app works!';
}
