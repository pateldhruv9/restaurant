import {Component, OnInit} from '@angular/core';
import { LoginService } from '../security/login/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'lacc-reservation',
    templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {
    reservationForm:FormGroup
   
   
    constructor(public loginService:LoginService,public formBuilder:FormBuilder ) {
        this.reservationForm = this.formBuilder.group({
            name :['',[Validators.required]],
             email :['',[Validators.required]],
             phone :['',[Validators.required]],
             message :[''],
             time :['',[Validators.required]]
        })
    }

   

    ngOnInit() {
    }
 
    sendReservationdetails(){
        let body = {
           name : this.reservationForm.get('name',).value,
           email : this.reservationForm.get('email').value,
           phone : this.reservationForm.get('phone').value,
           message : this.reservationForm.get('message').value,
           time : this.reservationForm.get('time').value
        }
      this.loginService.sendReservationDetails(body).subscribe((res:any)=>{
        console.log("added here your reservation")
      })  
    }
} 
