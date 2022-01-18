import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './share/footer/footer.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AppRoutingModule } from './app-routing.componet';
@NgModule({
  declarations: [
            AppComponent,
            HeaderComponent,
            BodyComponent,
            FooterComponent,
            AddEmployeeComponent,


          ],
  imports: [
            BrowserModule,
          AppRoutingModule
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
