import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Paciente } from '../_model/paciente';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';

@Injectable({
    providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {
  private pacienteCambio = new Subject<Paciente[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/patient`);
  }

  listarPageable(_Apellidos: string = '', _Nombres: string = '', p: number, s: number) {
      return this.http.get<ReqPageable>(`${this.url}/pageable?apellidos=${_Apellidos}&nombres=${_Nombres}&page=${p}&size=${s}`);
  }

  buscaPorDni(_dni: string = '') {
      return this.http.get<Paciente>(`${this.url}/dni/${_dni}`);
  }

  getPacienteCambio() {
    return this.pacienteCambio.asObservable();
  }

  setPacienteCambio(paciente: Paciente[]) {
    this.pacienteCambio.next(paciente);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}