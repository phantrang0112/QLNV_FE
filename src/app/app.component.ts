import { Component, DoCheck, SimpleChanges } from '@angular/core';
import { AppserviceService } from './services/appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // đường dẫn tới file html trong component
  styleUrls: ['./app.component.css'] // mảng các đường dẫn tới file css
})
export class AppComponent implements DoCheck {

  title = 'Home';
  message;
  oldTiitle;
  constructor(private appService: AppserviceService){
    this.title= this.appService.getTitle();
   
  }
  ngDoCheck(): void {
console.log(this.appService.getCheck());
    
    if(this.appService.getCheck()== false){
      console.log(this.appService.getTitle())
    console.log(this.appService.getOldTitle())
      if(this.appService.getOldTitle()!=this.appService.getTitle()){
        this.title= this.appService.getTitle();
      }
    }
    
  }
  ngOnInit() {
    this.message=this.appService.getMessage();
    console.log(this.title)
    this.oldTiitle=this.title;
  }
  
  openNav() {
    // document.getElementById("mySidenav").style.width = "250px";
  }
}
