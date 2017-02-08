import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService} from "../../shared/services/http.service";
import { TestService} from "../../shared/services/test-service";
import { ABTest} from "../../shared/models/ab-test-model";

@Component({
  selector: 'app-test-detail',
  templateUrl: 'test-detail.component.html',
  styleUrls: ['test-detail.component.scss'],
  providers: [HttpService]
})
export class TestDetailComponent implements OnInit {

  public testDetails: ABTest;

  private _testId: any;
  private _httpService: HttpService;
  private _activatedRoute: ActivatedRoute;
  private _testService: TestService;

  constructor(private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private testService: TestService) {
    this._httpService = httpService;
    this._activatedRoute = activatedRoute;
    this._testService = testService;
  }

  ngOnInit() {
    this._testId = this._testService.testId;
    this.getTestDetails();
  }

  getTestDetails() {
    this._httpService.getDataById(this._testId)
      .subscribe(
        (abtest) => {
          console.log(abtest);
          this.testDetails = abtest[0] as ABTest;
          console.log(this.testDetails);
        }
      );
  }

}
