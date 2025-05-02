import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { variables } from '../variables';
import { UsuarioNuevo } from '../_model/usuario-nuevo';
import { UsuarioRegistrado } from '../_model/usuario-registrado';
import { Subject } from 'rxjs';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = `${variables.HOST}/customers`;
  private mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  nuevo(usuarioNuevo: UsuarioNuevo) {
    return this.http.post<UsuarioRegistrado>(`${this.url}`, usuarioNuevo, {
      headers: new HttpHeaders().set('Content-Type', 'application/json;'),
    });
  }

  //   refrescaToken(tokenR:string) {
  //     const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(tokenR)}`;
  //     //const body = `grant_type=refresh_token&refresh_token=${tokenR}`;
  //     return this.http.post<any>(this.url, body, {
  //       headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(variables.TOKEN_AUTH_USERNAME + ':' + variables.TOKEN_AUTH_PASSWORD))
  //     });
  //   }

  estaLogueado() {
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    //    console.log(token);
    return token != null;
  }

  cerrarSesion() {
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    //    console.log("Esto es lo que tengo");
    //    console.log(sessionStorage);
    //    if (token) {
    //      this.http.get(`${variables.HOST}/tokens/anular/${token}`).subscribe(() => {
    sessionStorage.clear();
    //        this.router.navigate(['login']);
    //      });
    //    } else {
    //      sessionStorage.clear();
    //      this.router.navigate(['login']);
    //    }
  }

  //   enviarCorreo(correo: string) {
  // //    console.log("antes de enviar");
  //     return this.http.post<number>(`${variables.HOST}/login/enviarCorreo`, correo, {
  //       headers: new HttpHeaders().set('Content-Type', 'text/plain')
  //     });
  //   }

  //   verificarTokenReset(token: string) {
  //     return this.http.get<number>(`${variables.HOST}/login/restablecer/verificar/${token}`);
  //   }

  //   restablecer(token: string, clave: string) {
  //     return this.http.post(`${variables.HOST}/login/restablecer/${token}`, clave, {
  //       headers: new HttpHeaders().set('Content-Type', 'text/plain')
  //     });
  //   }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
