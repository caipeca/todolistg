import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private Subscription: Subscription[] = [];
  constructor(private router: Router, private authenticationService: AuthenticationService, private notifier: NotificationService){}

  ngOnInit(): void {
      if(this.authenticationService.isLoggedIn()){
        this.router.navigateByUrl('/manutenca/home');
      }else{
        this.router.navigateByUrl('/login');
      }
  }

  onLogin(user: User): void{
    this.Subscription.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>)=>{
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/manutenca/home');
        },
        (errorResponse: HttpErrorResponse)=>{
          console.log(errorResponse);
          this.notifier.openSnackBar(errorResponse.message);
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.Subscription.forEach(sub => sub.unsubscribe());
  }

}
