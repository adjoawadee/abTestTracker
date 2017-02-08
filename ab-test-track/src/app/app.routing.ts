import {RouterModule} from "@angular/router";

import {ShowDataComponent} from "../components/show-data/show-data.component";
import {AddTestComponent} from "../components/add-test/add-test.component";
import {TestDetailComponent} from "../components/test-detail/test-detail.component";
import {EditTestComponent} from "../components/edit-test/edit-test.component";
import {TestComponent} from "../components/test/test.component";


const APP_ROUTES = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ShowDataComponent},
  { path: 'test/:test_id', component: TestComponent,
    children: [
      {path: '', redirectTo: 'details', pathMatch: 'full' },
      {path: 'details', component: TestDetailComponent},
      {path: 'edit', component: EditTestComponent}
  ]
  },
  { path: 'addtest', component: AddTestComponent},
]

export const app_router = RouterModule.forRoot(APP_ROUTES, { useHash:true });
