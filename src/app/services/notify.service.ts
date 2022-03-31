import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private route: Router) { }

  blockPermission() {
    let success = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    success.fire({
      title: 'Not have access!!!',
      icon: 'error',
    }
    )
  }
  notifySuccessToggerMessage(titel){
    let success = Swal.mixin(
      {
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }
    )
    success.fire({
      title: titel,
      icon:'success',
      // background:'#CCF8D7',
    }

    )
  }
  public notifySuccess(title,linkRouter, text){
    Swal.fire({
      icon: 'success',
      title: title ,
      text: text,
    }).then((result)=>{
      if(result.isConfirmed){
        this.route.navigate([linkRouter]);
      }
    })
  }
  notifySuccessNotLink(link,text){

  }
  notifyCancel(text){
    Swal.fire({
      icon:'warning',
      title:'Cancelled',
     text: text,
    }
    )
  }
  notifiError(title, text){
    Swal.fire({
      icon: 'error',
      title: title ,
      text: text
    })
  }
}
