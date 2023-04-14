import {Component, OnInit} from '@angular/core';
import { LoginService } from '../security/login/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'lacc-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']

})

export class ReservationComponent implements OnInit {
    reservationForm:FormGroup
    time:any[] = [{'time': '9:00-10:00','occupied':false},
    {'time': '10:00-11:00','occupied':false},{'time': '11:00-12:00','occupied':false},{'time': '12:00-13:00','occupied':false},{'time': '13:00-14:00','occupied':false},{'time': '17:00-18:00','occupied':false},{'time': '18:00-19:00','occupied':false},
    {'time': '19:00-20:00','occupied':false}, {'time': '20:00-21:00','occupied':false}, {'time': '21:00-22:00','occupied':false}]   
   
    constructor(public loginService:LoginService,public formBuilder:FormBuilder ) {
        this.reservationForm = this.formBuilder.group({
            name : new FormControl('',[Validators.required]),
             email :  new FormControl('',[Validators.required]),
             phone : new FormControl('',[Validators.required]),
             message : new FormControl(''),
             time : new FormControl('',[Validators.required]),
             date:  new FormControl('',[Validators.required])
        })
    }

   

    ngOnInit() {
this.getTimeDetails()
    }

 getTimeDetails(){
  this.loginService.getDetailsOfReservation().subscribe((res:any)=>{
    console.log("added here your reservation",res)
    if(res && res.length > 0) {
      res.forEach((element:any) => {
        this.time.forEach((ele:any)=>{
          if(element.time == ele.time){
            ele.occupied = true
          }
        })
      });
    }
  }) 
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
        this.reservationForm = this.formBuilder.group({
          name : new FormControl('',[Validators.required]),
           email :  new FormControl('',[Validators.required]),
           phone : new FormControl('',[Validators.required]),
           message : new FormControl(''),
           time : new FormControl('',[Validators.required]),
           date:  new FormControl('',[Validators.required])
      })
        this.getTimeDetails()
      })  
    }
} 
