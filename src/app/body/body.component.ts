import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../services/appservice.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  employee;
  constructor(private service: AppserviceService){
    this.employee= service.employee;
  }

  ngOnInit(): void {

  }
  public tangTuoi(){
    this.service.numberItem++;
    this.employee[0].age=this.service.numberItem;
  }

}
