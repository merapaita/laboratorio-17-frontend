import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Operation } from '../_model/operation';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';

@Injectable({
    providedIn: 'root'
})
export class OperationService extends GenericService<Operation> {
  private operationCambio = new Subject<Operation[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/operation`);
  }

  listPageable(p: number, s: number) {
    return this.http.get<ReqPageable>(
      `${this.url}/pageable?page=${p}&size=${s}`
    );
  }

  getOperationCambio() {
    return this.operationCambio.asObservable();
  }

  setOperationCambio(operations: Operation[]) {
    this.operationCambio.next(operations);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
  
}