import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { ReqPageable } from '../_model';
import { Medico } from '../_model/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoService extends GenericService<Medico> {
  private medicoCambio = new Subject<Medico[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/medico`);
  }

  listarPageable(_Apellidos: string = '', _Nombres: string = '', p: number, s: number) {
      return this.http.get<ReqPageable>(`${this.url}/pageable?apellidos=${_Apellidos}&nombres=${_Nombres}&page=${p}&size=${s}`);
  }

  getMedicoCambio() {
    return this.medicoCambio.asObservable();
  }

  setMedicoCambio(medicos: Medico[]) {
    this.medicoCambio.next(medicos);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

}