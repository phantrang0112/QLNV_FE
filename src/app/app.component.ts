import { Component } from '@angular/core';
import { AppserviceService } from './services/appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // đường dẫn tới file html trong component
  styleUrls: ['./app.component.css'] // mảng các đường dẫn tới file css
})
export class AppComponent {

  title = 'projectDauTien';
  message;
  constructor(private appService: AppserviceService){
    this.title= this.appService.getTitel();
  }
  ngOnInit() {
    this.message=this.appService.getMessage();
    console.log(this.title)

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
}
