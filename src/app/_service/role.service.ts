import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { variables } from '../variables';
import { GenericService } from './generic.service';
import { Role } from '../_model/role';
import { ReqPageable } from '../_model';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends GenericService<Role> {
  private roleCambio = new Subject<Role[]>();
  private mensajeCambio = new Subject<string>();

  constructor(http: HttpClient) {
    super(http, `${variables.HOST}/role`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<ReqPageable>(
      `${this.url}/pageable?page=${p}&size=${s}`
    );
  }

  getRoleCambio() {
    return this.roleCambio.asObservable();
  }

  setRoleCambio(roles: Role[]) {
    this.roleCambio.next(roles);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
