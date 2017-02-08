import {AfterContentInit, Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormArray, FormGroup} from "@angular/forms";
import {Router} from "@angular/router"

import {AngularFire} from "angularfire2";
import {HttpService} from "../../shared/services/http.service";
import {Guid} from "../../shared/utils/guid";
import {CompareDates} from "../../shared/utils/compare-date";

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss'],
  providers: [CompareDates, HttpService]
})

export class AddTestComponent implements OnInit {

  public abTestForm: FormGroup;
  public formBuilder: FormBuilder;

  private _angularFire: AngularFire;
  private _httpService: HttpService;
  private _compareDates: CompareDates;
  private _submitted: boolean;
  private _router: Router;

  constructor(private angularFire: AngularFire,
              private httpService: HttpService,
              private cd: CompareDates,
              private fb: FormBuilder,
              private router: Router) {
    this._router = router;
    this._submitted = false;
    this._angularFire = angularFire;
    this._httpService = httpService;
    this._compareDates = cd;
    this.formBuilder = fb;
  }

  ngOnInit() {
    this.abTestForm = this.formBuilder.group({
      name: [],
      mission: [],
      description: this.formBuilder.group({
        long: [],
        short: [],
      }),
      details: this.formBuilder.group({
        from: [],
        to: [],
      }),
      owner: this.formBuilder.group({
        first: [],
        last: []
      }),
      snapshots: this.formBuilder.array([
        this.formBuilder.group({
          snapshot_description: [],
          snapshot_title: [],
          snapshot_url: []
        })
      ]),
      tags: this.formBuilder.array([
        [""]
      ])
    });
  }

  onSubmit() {
    let id = Guid.newGuid();
    this.abTestForm.value._id = id;
    this.abTestForm.value.details.active = this.compareDates();
    this.httpService.addNewTest(this.abTestForm.value);
    this._submitted = true;
    this.abTestForm.reset();
    this._submitted = false;
    this._router.navigateByUrl('home');
  }



  compareDates() {
    let start = this.abTestForm.value.details.from;
    let end = this.abTestForm.value.details.to;
    return this.cd.compareDates(start, end);
  }

  addSnapshots() {
    (<FormArray>this.abTestForm.controls['snapshots']).push(this.initSnapshots());
  }

  addTags() {
    (<FormArray>this.abTestForm.controls['tags']).push(this.initTags());
  }

  initSnapshots() {
    return new FormGroup({
      snapshot_description: new FormControl(),
      snapshot_title: new FormControl(),
      snapshot_url: new FormControl()
    })
  };

  initTags() {
    return new FormControl("");
  };
}
