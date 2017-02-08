import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AddTestComponent } from '../components/add-test/add-test.component';
import { ShowDataComponent } from '../components/show-data/show-data.component';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { SearchComponent } from '../components/search/search.component';
import {HttpService} from "../shared/services/http.service";
import {app_router} from "./app.routing";
import { TestDetailComponent } from '../components/test-detail/test-detail.component';
import {AngularFireModule} from "angularfire2";
import { EditTestComponent } from '../components/edit-test/edit-test.component';
import { TestComponent } from '../components/test/test.component';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import {TestService} from "../shared/services/test-service";


//export for Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyC_txLN4QzQgbuL-QqIH91bkvIqFEv7PYw",
  authDomain: "abtesttracker.firebaseapp.com",
  databaseURL: "https://abtesttracker.firebaseio.com",
  storageBucket: "abtesttracker.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent,
    AddTestComponent,
    ShowDataComponent,
    SearchPipe,
    SearchComponent,
    TestDetailComponent,
    EditTestComponent,
    TestComponent
 ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    app_router
  ],
  providers: [TestService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
