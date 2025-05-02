import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Parmae } from '../_model/parmae'
import { GenericService } from './generic.service'
import { variables } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ParmaeService extends GenericService<Parmae> {

  private parmaeCambio: Subject<Parmae[]> = new Subject<Parmae[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(override http: HttpClient) {
    super(
      http,
      `${variables.HOST}/parmae`);
   }

   listarPorTipo(tipo: string) {
    return this.http.get<Parmae[]>(`${this.url}/${tipo}`);
  }

   getParmaeCambio(){
    return this.parmaeCambio.asObservable();
  }

  setParmaeCambio(lista: Parmae[]){
    this.parmaeCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(texto: string){
    this.mensajeCambio.next(texto);
  }

}