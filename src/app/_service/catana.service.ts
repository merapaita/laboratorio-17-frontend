import { Catana } from './../_model/catana';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class CatanaService extends GenericService<Catana> {
  private catanaCambio = new Subject<Catana[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/catana`);
  }

  listarPageable(
    _descripcion: string = '',
    p: number,
    s: number
  ) {
    return this.http.get<ReqPageable>(
      `${this.url}/pageable?descripcion=${_descripcion}&page=${p}&size=${s}`
    );
  }

  getCatanaCambio() {
    return this.catanaCambio.asObservable();
  }

  setCatanaCambio(catanas: Catana[]) {
    this.catanaCambio.next(catanas);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
