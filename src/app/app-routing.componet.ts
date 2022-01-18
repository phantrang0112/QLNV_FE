import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { BodyComponent } from "./body/body.component";

const routes: Routes = [
  { path: '', component: BodyComponent},
  { path: 'addEmployee', component: AddEmployeeComponent},
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
