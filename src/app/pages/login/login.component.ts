import { LoginUsuario } from './../../_model/login-usuario';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import '../../statics/login-animation.js';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginService } from '../../_service/login.service.js';
import { variables } from '../../variables.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario = "";
  clave = "";
  mensaje = "";
  error = "";
  
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  iniciarSesion() {
    let loginUsuario = new LoginUsuario();

    loginUsuario.username = this.usuario;
    loginUsuario.password = this.clave;

    this.loginService.login(loginUsuario).subscribe((data) => {
      sessionStorage.setItem(variables.TOKEN_NAME, data.jwt);
      // sessionStorage.setItem(variables.REFRESH_TOKEN, data.refresh_token);
      this.router.navigate(['pages/inicio']);
   });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }
}
