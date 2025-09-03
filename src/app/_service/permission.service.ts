import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { variables } from '../variables';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ShowPermission } from '../_model/showPermission';
import { ReqPageable } from '../_model';
import { SavePermission } from '../_model/savePermission';
import { PermissionDto } from '../_model/permissionDto';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private url: string = `${variables.HOST}/permissions`;
  private http = inject(HttpClient);

  private permissionCambio: Subject<ShowPermission[]> = new Subject<
    ShowPermission[]
  >();
  private mensajeCambio: Subject<string> = new Subject<string>();

  listar(role: string = '') {
    return this.http.get<ShowPermission[]>(`${this.url}?role=${role}`);
  }

  listPageable(role: string = '', p: number, s: number) {
    return this.http.get<ReqPageable>(`${this.url}/pageable?role=${role}&page=${p}&size=${s}`
    );
  }

  listarPorId(id: number) {
    return this.http.get<ShowPermission>(`${this.url}/${id}`);
  }

  registrarNvo(permission: SavePermission) {
    return this.http.post<ShowPermission>(this.url, permission);
  }

  registerPermissionPerRole(permission: PermissionDto) {
    return this.http.post<PermissionDto>(`${this.url}/role`, permission);
  }

  //   modificarNvo(t: T) {
  //     return this.http.put<T>(this.url, t);
  //   }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getPermissionCambio() {
    return this.permissionCambio.asObservable();
  }

  setPermissionCambio(permissions: ShowPermission[]) {
    this.permissionCambio.next(permissions);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
