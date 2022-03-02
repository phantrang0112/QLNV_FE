import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { UploadImgComponent } from "./add-employee/upload-img/upload-img.component";
import { AuthGuard } from "./auth.Guard";
import { BodyComponent } from "./body/body.component";
import { ChangePassComponent } from "./login/change-pass/change-pass.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register/register.component";

const routes: Routes = [
  { path: '', component: BodyComponent},
  { path: 'employeeForm/:id', component: AddEmployeeComponent,canActivate:[AuthGuard]},
  { path: 'formLogin', component: LoginComponent  },
  { path: 'formRegister', component: RegisterComponent  },
  { path: 'formChangePass', component: ChangePassComponent,canActivate:[AuthGuard]  },
  { path: 'changeImg/:id', component:UploadImgComponent,canActivate:[AuthGuard]  }
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
