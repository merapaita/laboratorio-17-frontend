import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
//import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LoginService } from "../_service/login.service";
//import { environment } from "src/environments/environment";
import { catchError, concatMap, retry } from "rxjs/operators";
import { inject } from "@angular/core";
import { EMPTY } from "rxjs";
import { NotificationService } from "../_service/notification.service";
import { variables } from "../variables";

export const ServerErrorsInterceptorFn:HttpInterceptorFn = (request, next) => {
//    const snackBar = inject(MatSnackBar);
    const router = inject(Router);
    const loginService = inject(LoginService);
    const notificationService = inject(NotificationService);
    
    return next(request)
    .pipe(retry(variables.REINTENTOS))
    //  .pipe(tap(event => {
    //     if (event instanceof HttpResponse) {
    //         if (event.body && event.body.error === true && event.body.errorMessage) {
    //             throw new Error(event.body.errorMessage);
    //         }/*else{
    //             this.snackBar.open("EXITO", 'AVISO', { duration: 5000 });    
    //         }*/
    //     }
    //     //variable err tiene el response json del backend
    // }))
    .pipe(catchError((err) => {
        console.log("err", err);
        //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        if (err.status === 400) {
//          console.log(err);
            notificationService.show(err.error.message, 'error');
//            snackBar.open(err.error.mensaje, 'ERROR 400', { duration: 5000 });
        }
        else if (err.status === 404) {
            notificationService.show(err.error.message, 'error');
//            snackBar.open(err.error.mensaje, 'ERROR 404', { duration: 5000 });
            //                    this.snackBar.open('No existe el recurso', 'ERROR 404', { duration: 5000 });
        }
        else if (err.status === 401) {
            notificationService.show(err.error.message, 'warning');
//            snackBar.open(err.error.error_description, 'ERROR 403', { duration: 5000 });
            sessionStorage.clear();
            router.navigate(['/login']);
        }
        else if (err.status === 403) {
            notificationService.show(err.error.message, 'warning');
        //     let tokenR = sessionStorage.getItem(variables.REFRESH_TOKEN);
        //     return loginService.refrescaToken(tokenR)
        //         .pipe(concatMap(data => {
        //             console.log("refrescando...");
        //             sessionStorage.setItem(variables.TOKEN_NAME, data.access_token);
        //             sessionStorage.setItem(variables.REFRESH_TOKEN, data.refresh_token);
        //             //                            return true;
        //             const intReq = addToken(request, data.access_token);
        //             return next(intReq);
        //         }))
        }
        else if (err.status === 500) {
            notificationService.show(err.error.message, 'error');
//          console.log(err)
//            snackBar.open(err.status, 'ERROR 500', { duration: 5000 });
        } else {
            notificationService.show(err.message, 'error');
//            snackBar.open(err.message, 'ERROR', { duration: 5000 });
        }
        return EMPTY;
    }));
}
// const addToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
//     return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
// }