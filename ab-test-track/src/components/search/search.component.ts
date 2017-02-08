import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() update = new EventEmitter();
  @Output() optionChange = new EventEmitter();

  options: any;

  constructor(){
    this.options = [
      'Mission',
      'Owner',
      'Name',
      'Tags',
    ]
  }

  changeOption(value){
    console.log(value);
  }
  ngOnInit() {
    // this.update.emit("");
  }

}
