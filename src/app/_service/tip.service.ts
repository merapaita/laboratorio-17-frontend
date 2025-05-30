import { Tipo } from './../_model/tipo';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';

@Injectable({
    providedIn: 'root'
})
export class TipoService extends GenericService<Tipo> {
  private tipoCambio = new Subject<Tipo[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/type`);
  }

  listarPageable(p: number, s: number) {
      return this.http.get<ReqPageable>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getTipoCambio() {
    return this.tipoCambio.asObservable();
  }

  setTipoCambio(tipos: Tipo[]) {
    this.tipoCambio.next(tipos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}