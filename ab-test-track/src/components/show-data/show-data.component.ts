import {Component, OnInit, Input} from '@angular/core';

import { ABTest } from '../../shared/models/ab-test-model'
import {HttpService} from "../../shared/services/http.service";
import {SearchPipe} from "../../shared/pipes/search.pipe";
import {FirebaseListObservable} from "angularfire2";
import {CompareDates} from "../../shared/utils/compare-date";

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss'],
  providers: [SearchPipe,CompareDates, HttpService]
})

export class ShowDataComponent implements OnInit {

  @Input() search_term;
  public abtest: FirebaseListObservable<ABTest>;

  constructor(public httpService: HttpService,
              private pipe:SearchPipe,
              private cd:CompareDates) {
  }

  ngOnInit() {
    this.abtest = this.httpService.getData();
    this.abtest.subscribe(snapshot =>(snapshot));
  }

  deleteTest(test){
    this.httpService.deleteTest(test);
  }

}
