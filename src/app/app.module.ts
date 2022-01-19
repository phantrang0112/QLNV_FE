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
@NgModule({
  declarations: [
            AppComponent,
            HeaderComponent,
            BodyComponent,
            FooterComponent,
            AddEmployeeComponent,
            MyColorDirective,
            FormLoginComponent,


          ],
  imports: [
            BrowserModule,
          AppRoutingModule,
          ReactiveFormsModule
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
