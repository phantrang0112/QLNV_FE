import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { BodyComponent } from "./body/body.component";
import { FormLoginComponent } from "./form-login/form-login.component";

const routes: Routes = [
  { path: '', component: BodyComponent},
  { path: 'employeeForm/:id', component: AddEmployeeComponent},
  { path: 'formLogin', component: FormLoginComponent},
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
