import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() { 
  }

  
  async onRegister(email, password){
    try {
      const user= await this.authSvc.registro(email.value,password.value);
      if(user){
        console.log('User->',user)
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
      
    } catch (error) {
      console.log('Error chucha madre',error)
      
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
