import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { map } from 'rxjs/operators';
//import { Menu } from '../_model/menu';
import { LoginService } from './login.service';
//import { MenuService } from './menu.service';
import { variables } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
//    private menuService: MenuService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1) VERIFICAR SI ESTA LOGUEADO
    let rpta = this.loginService.estaLogueado();
console.log("autenticado:", rpta);    
    if (!rpta) {
      this.loginService.cerrarSesion();
      return false;
    }
    //2) VERIFICAR SI EL TOKEN NO HA EXPIRADO      
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
console.log('token:' + token);    
    if (!helper.isTokenExpired(token)) {
      //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESA PAGINA  
      //url -> /pages/consulta
      //let url = state.url;
      //const decodedToken = helper.decodeToken(token);
      //        console.log(decodedToken.user_name);
      // return this.menuService.listarPorUsuario(decodedToken.user_name).pipe(map((data: Menu[]) => {
      //   this.menuService.setMenuCambio(data);
      //   let cont = 0;
      //   //          console.log("url:", url)
      //   for (let m of data) {
      //     if (url.startsWith(m.url)) {
      //       cont++;
      //       break;
      //     }
      //   }
      //   if (cont > 0) {
      //     return true;
      //   } else {
      //     this.router.navigate(['pages/not-403']);
      //     return false;
      //   }
      // }));
      return true;
    } else {
      //console.log("expiro...");
      //let tokenR = sessionStorage.getItem(variables.REFRESH_TOKEN);
//  esta puede regresar
      // return this.loginService.refrescaToken(tokenR)
      //   .pipe(map(data => {
      //     console.log("refrescando...");
      //     sessionStorage.setItem(variables.TOKEN_NAME, data.access_token);
      //     sessionStorage.setItem(variables.REFRESH_TOKEN, data.refresh_token);
      //     return true;
      //   }));
      
      //       return true;
      //        this.loginService.cerrarSesion();
      return false;
    }
  }
}