import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { UploadImgComponent } from "./add-employee/upload-img/upload-img.component";
import { AuthGuard } from "./auth.Guard";
import { BodyComponent } from "./body/body.component";
import { ChangePassComponent } from "./login/change-pass/change-pass.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register/register.component";
import { HeaderComponent } from "./share/header/header.component";

const routes: Routes = [
  { path: '', component: BodyComponent, children:[{path:'header',component:HeaderComponent}]},
  { path: 'employeeForm/:id', component: AddEmployeeComponent,canActivate:[AuthGuard],children:[{path:'header',component:HeaderComponent}]},
  { path: 'formLogin', component: LoginComponent,children:[{path:'header',component:HeaderComponent}]  },
  { path: 'formRegister', component: RegisterComponent,children:[{path:'header',component:HeaderComponent}] },
  { path: 'formChangePass', component: ChangePassComponent,canActivate:[AuthGuard],children:[{path:'header',component:HeaderComponent}] },
  { path: 'changeImg/:id', component:UploadImgComponent,canActivate:[AuthGuard],children:[{path:'header',component:HeaderComponent}]  }
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
