import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authSvc: AuthService,private router:Router) { }

/*LOGGIN CON correoE*/
  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value)
      if (user) {
        const Verified = this.authSvc.isEmailVerified(user)
        this.redirectUser(Verified);
      }

    } catch (error) {
      console.log('erro', error)

    }
  }

  /*LOGGIN CON GOOGLE*/
  async onLogingoogle() {
    try {
      const user = await this.authSvc.logingoogle();
      if (user) {
        const Verified = this.authSvc.isEmailVerified(user)
        this.redirectUser(Verified);
      }

    } catch (error) {
      console.log('erro en .ts', error)

    }
  }

  private redirectUser(Verified:boolean){
    if(Verified){
      this.router.navigate(['administrador']);
    }else{
      this.router.navigate(['email-very']);
    }

  }

}
