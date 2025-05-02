import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) {}
  //  protected http = inject(HttpClient);
  //  protected url = inject("url")
  listar() {
    return this.http.get<T[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  registrar(t: T) {
    return this.http.post(this.url, t);
  }

  registrarNvo(t: T) {
    // let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.post<T>(this.url, t, {
//      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
    // return this.http.post(this.url, t, {
    //   headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    // });
  }


  modificar(t: T) {
    return this.http.put(this.url, t);
  }

  modificarNvo(t: T) {
    //    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.put<T>(this.url, t, {
//      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
    // return this.http.put(this.url, t, {
    //   headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    // });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
