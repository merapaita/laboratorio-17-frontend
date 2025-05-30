import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Module } from '../_model/module';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';

@Injectable({
    providedIn: 'root'
})
export class ModuleService extends GenericService<Module> {
  private moduleCambio = new Subject<Module[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/module`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<ReqPageable>(
      `${this.url}/pageable?page=${p}&size=${s}`
    );
  }

  getModuleCambio() {
    return this.moduleCambio.asObservable();
  }

  setModuleCambio(modules: Module[]) {
    this.moduleCambio.next(modules);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}