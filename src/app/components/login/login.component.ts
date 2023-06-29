import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private authenticationService: AuthenticationService, private notifier: NotificationService){}

  ngOnInit(): void {
      if(this.authenticationService.isLoggedIn()){
        this.router.navigateByUrl('/manutenca/home');
      }else{
        this.router.navigateByUrl('/login');
      }
  }

  ngOnDestroy(): void {

  }

}
