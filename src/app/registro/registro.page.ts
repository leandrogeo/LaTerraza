import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private authSvc:AuthService) { }

  ngOnInit() { 
  }

  
  async onRegister(email, password){
    try {
      const user= await this.authSvc.registro(email.value,password.value);
      if(user){
        console.log('User->',user)
        //checkEmail
      }
      
    } catch (error) {
      console.log('Error chucha madre',error)
      
    }
  }

}
