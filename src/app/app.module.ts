
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './share/footer/footer.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AppRoutingModule } from './app-routing.componet';
import { MyColorDirective } from './directives/my-color.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.Guard';
import { LoadingComponent } from './share/loading/loading.component';
import { RegisterComponent } from './login/register/register.component';
import { ChangePassComponent } from './login/change-pass/change-pass.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UploadImgComponent } from './add-employee/upload-img/upload-img.component';
import { HomeComponent } from './home/home.component';
import { NotifyComponent } from './notify/notify.component';
@NgModule({
  declarations: [
            AppComponent,
            HeaderComponent,
            BodyComponent,
            FooterComponent,
            AddEmployeeComponent,
            MyColorDirective,
            LoginComponent,
            LoadingComponent,
            RegisterComponent,
            ChangePassComponent,
            UploadImgComponent,
            HomeComponent,
            NotifyComponent,
          ],
  imports: [
            BrowserModule,
          AppRoutingModule,
          ReactiveFormsModule,
          HttpClientModule,
          MatInputModule,
          MatFormFieldModule,
          MatPaginatorModule,
          MatTableModule,
          BrowserAnimationsModule,
          ],
  providers: [AuthGuard,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
