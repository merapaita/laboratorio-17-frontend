import { Catana } from './catana';
import { Catmue } from './catmue';
import { Iteana } from './iteana';
import { Medico } from './medico';
import { Paciente } from './paciente';

export interface Analisis {
  idAnalisis: number;
  medico: Medico;
  paciente: Paciente;
  catmue:Catmue;
  catana:Catana[];
  fecha: string;
  descripcion: string;
  codenv: string;
  compag: string;
  monto: number;
  observ: string;
  telefono:string;
  detiteana: Iteana[];
}