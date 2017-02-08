import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import {ABTest} from "../models/ab-test-model";
import { AngularFire, FirebaseListObservable} from "angularfire2";


@Injectable()
export class HttpService {

    private data: FirebaseListObservable<ABTest>;
    private dataById: FirebaseListObservable<any>;
    private angularFire:any;

    constructor(private http: Http, af: AngularFire ){
      this.angularFire = af;
      const tests = this.angularFire.database.list('/');
    }

    getData(){
      this.data = this.angularFire.database.list('/');
      return this.data;
    }

    getDataById(id:string)
    {
      this.dataById  = this.angularFire.database.list('/',{
        query: {
          orderByChild: '_id',
          equalTo: id
        }
      });

      return this.dataById;
    }

    addNewTest(test: ABTest){
      const items = this.angularFire.database.list("/");
      items.push(test);
    }

    editTest(test:ABTest,key){
      const item = this.angularFire.database.object("/"+key)
      item.update(test);
    }

    deleteTest(test: string)
    {
      const items = this.angularFire.database.list("/");
      items.remove(test);
    }
}
