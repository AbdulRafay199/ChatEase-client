import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { adduser } from '../../store/user/user.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  data = {email:"", password:""}
  router = inject(Router)
  authService = inject(AuthService)
  store = inject(Store)

  login(){
    this.authService.login(this.data).subscribe(res=>{
      localStorage.setItem("token",res?.body?.mytoken)
      this.router.navigateByUrl("/")
    })
  }
}
