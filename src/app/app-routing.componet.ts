import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { AuthGuard } from "./auth.Guard";
import { BodyComponent } from "./body/body.component";
import { FormLoginComponent } from "./form-login/form-login.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', component: BodyComponent},
  { path: 'employeeForm/:id', component: AddEmployeeComponent},
  { path: 'formLogin', component: LoginComponent  },
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
