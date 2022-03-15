import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { UploadImgComponent } from "./add-employee/upload-img/upload-img.component";
import { AuthGuard } from "./auth.Guard";
import { BodyComponent } from "./body/body.component";
import { HomeComponent } from "./home/home.component";
import { ChangePassComponent } from "./login/change-pass/change-pass.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register/register.component";
import { HeaderComponent } from "./share/header/header.component";

const routes: Routes = [
  { path: 'list-employee', component: BodyComponent, children:[{path:'header',component:HeaderComponent}]},
  { path: 'employee-form/:id', component: AddEmployeeComponent,canActivate:[AuthGuard],children:[{path:'header',component:HeaderComponent}]},
  { path: 'form-login', component: LoginComponent,children:[{path:'header',component:HeaderComponent}]  },
  { path: 'form-register', component: RegisterComponent,children:[{path:'header',component:HeaderComponent}] },
  { path: 'form-changePass', component: ChangePassComponent,canActivate:[AuthGuard],children:[{path:'header',component:HeaderComponent}] },
  { path: 'change-img/:id', component:UploadImgComponent,canActivate:[AuthGuard],children:[{path:'header',component:HeaderComponent}]  },
  { path: '', component: HomeComponent}
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
