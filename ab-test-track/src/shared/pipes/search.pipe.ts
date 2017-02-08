import {Pipe, PipeTransform, Input} from '@angular/core';
import {HttpService} from "../services/http.service";

@Pipe({
  name: 'searchPipe'
})

export class SearchPipe implements PipeTransform {
  transform(data: any, search_term: any, args?:any): any {
      if (search_term === undefined) return data;

      else {
        return data.filter( function (data) {
          return data.mission.toLowerCase().includes(search_term.toLowerCase());
          });
        }
      }
}
