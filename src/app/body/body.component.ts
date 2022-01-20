import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';
import { ServerhttpService } from '../services/serverhttp.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  employee;
  constructor(private service: AppserviceService,private serverHttp: ServerhttpService){
    // this.employee= service.employee;
  }

  ngOnInit(): void {
    this.serverHttp.getProfile().subscribe((data)=> {
      console.log(data);
      this.employee= data;
    });
  }
  public tangTuoi(){
    this.service.numberItem++;
    this.employee[0].age=this.service.numberItem;
  }

}
