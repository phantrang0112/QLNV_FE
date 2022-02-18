import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './share/footer/footer.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AppRoutingModule } from './app-routing.componet';
import { MyColorDirective } from './directives/my-color.directive';
import { FormLoginComponent } from './form-login/form-login.component';
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
@NgModule({
  declarations: [
            AppComponent,
            HeaderComponent,
            BodyComponent,
            FooterComponent,
            AddEmployeeComponent,
            MyColorDirective,
            FormLoginComponent,
            LoginComponent,
            LoadingComponent,


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
          BrowserModule
          ],
  providers: [AuthGuard,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
