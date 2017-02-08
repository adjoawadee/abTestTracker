import { Injectable} from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TestService{
  public testId = new Subject<any>();
}
