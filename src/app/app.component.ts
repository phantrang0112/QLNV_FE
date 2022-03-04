import { Component, DoCheck, SimpleChanges } from '@angular/core';
import { AppserviceService } from './services/appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // đường dẫn tới file html trong component
  styleUrls: ['./app.component.css'] // mảng các đường dẫn tới file css
})
export class AppComponent implements DoCheck {

  title = 'projectDauTien';
  message;
  oldTiitle;
  constructor(private appService: AppserviceService){
    // this.title= this.appService.getTitel();
   
  }
  ngDoCheck(): void {
    console.log(this.appService.getTitel())
    console.log(this.appService.getOldTitle())
    if(this.appService.getOldTitle()!=this.appService.getTitel()){
      this.title= this.appService.getTitel();
    }
  }
  ngOnInit() {
    this.message=this.appService.getMessage();
    console.log(this.title)
    this.oldTiitle=this.title;

  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
}
