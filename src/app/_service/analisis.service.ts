import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Analisis } from '../_model/analisis';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class AnalisisService extends GenericService<Analisis> {
  private analisisCambio = new Subject<Analisis[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/analysis`);
  }

  listarPageable(_descripcion: string = '', p: number, s: number) {
    return this.http.get<ReqPageable>(
      `${this.url}/pageable?descripcion=${_descripcion}&page=${p}&size=${s}`
    );
  }

  getAnalisisCambio() {
    return this.analisisCambio.asObservable();
  }

  setAnalisisCambio(analisis: Analisis[]) {
    this.analisisCambio.next(analisis);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
