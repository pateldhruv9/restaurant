import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/messages/notification.service';
import { PATTERS } from '../../shared/patterns';

@Component({
  selector: 'lacc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private loginServive: LoginService,
              private activateRouter: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
      this.loginForm = this.fb.group({
          email: this.fb.control('', [Validators.required, Validators.pattern(PATTERS.email)]),
          password: this.fb.control('', [Validators.required]),
          name: this.fb.control('', [Validators.required])

      });

      this.navigateTo = this.activateRouter.snapshot.params['to'] || btoa('/');
  }

  login() {
      this.loginServive
          .signUp(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.name)
          .subscribe(
              user => this.notificationService.notify(`Welcome Chip&Chops`),
              response => this.notificationService.notify(response.error.message),
              () => {
                  this.router.navigate([atob(this.navigateTo)]);
              }
          );

  }
}
