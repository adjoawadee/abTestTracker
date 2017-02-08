import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";


import { ABTest} from "../../shared/models/ab-test-model";
import { HttpService} from "../../shared/services/http.service";
import { TestService} from "../../shared/services/test-service";

@Component({
  selector: 'app-edit-test',
  templateUrl: 'edit-test.component.html',
  styleUrls: ['edit-test.component.scss'],
  providers: [HttpService]
})

export class EditTestComponent implements OnInit {

  public testDetails: ABTest;
  public editTestForm: FormGroup;
  public formBuilder: FormBuilder;
  public snapshotDescription: any;

  private _testId: any;
  private _httpService: HttpService;
  private _activatedRoute: ActivatedRoute;
  private _testService: TestService;
  private _snapshots: any;
  private _testKey: any;

  constructor(private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private testService: TestService,
              private fb: FormBuilder) {
    this._httpService = httpService;
    this._activatedRoute = activatedRoute;
    this._testService = testService;
    this.formBuilder = fb;
  }

  ngOnInit() {
    this._testId = this._testService.testId;
    this.getTestDetails();

    if(this.testDetails){
      var _test:any = {};
      var _tag: any= {};
      for(let snapshot of this.testDetails.snapshots){
        let fg:FormGroup = this.formBuilder.group({
          description: new FormControl(snapshot.snapshot_description, [<any>Validators.required]),
          title: new FormControl(snapshot.snapshot_title, [<any>Validators.required]),
          url: new FormControl(snapshot.snapshot_url, [<any>Validators.required]),
        });
        _test[snapshot.snapshot_title] = fg;
      }
      for(let tag of this.testDetails.tags)
      {
        let tg: FormGroup = this.formBuilder.group({
          tag: new FormControl(tag, [<any>Validators.required])
        });
        _tag[""] = tg;
      }
    }

      this.editTestForm = this.formBuilder.group({
        name: new FormControl("", [<any>Validators.required, <any>Validators.minLength(5)]),
        mission: new FormControl("", [<any>Validators.required, <any>Validators.minLength(5)]),
        details: new FormGroup({
          from: new FormControl("", [<any>Validators.required]),
          to: new FormControl("", [<any>Validators.required])
        }),
        description: new FormGroup({
          long: new FormControl("", [<any>Validators.required]),
          short: new FormControl("", [<any>Validators.required])
        }),
        owner: new FormGroup({
          first: new FormControl("", [<any>Validators.required]),
          last: new FormControl("", [<any>Validators.required])
        }),
        snapshots: _test,
        tags: _tag
      });
    }


  getTestDetails() {
    this._httpService.getDataById(this._testId)
      .subscribe(
        (abtest) => {
          console.log(abtest);
          this.testDetails = abtest[0] as ABTest;
          if(this.testDetails)
          {
            this._snapshots = this.testDetails.snapshots;
            this._testKey= this.testDetails['$key'];
          }
        }
      );
  }

  onSave(){
    this.httpService.editTest(this.editTestForm.value, this._testKey);
  }

}
