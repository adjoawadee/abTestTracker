import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService} from "../../shared/services/http.service";
import { FirebaseListObservable} from "angularfire2";
import { TestService} from "../../shared/services/test-service";


@Component({
  selector: 'app-test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.scss'],
  providers: [HttpService]
})

export class TestComponent implements OnInit {

  public testDetails: FirebaseListObservable<any>;
  public testId: any;
  public sub: any;

  private _testService:TestService;
  private _httpService:HttpService;
  private _activatedRoute: ActivatedRoute;

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService,
              private testService: TestService) {
      this._testService = testService;
      this._httpService = httpService;
      this._activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.getTestId();
  }

  getTestId(){
    this._activatedRoute.params.subscribe(params => {
      this.testId = params['test_id'];
      this._testService.testId = this.testId;
    });
  }
}
