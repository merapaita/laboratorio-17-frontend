import { Iteana } from './iteana';
import { Medico } from './medico';
import { Paciente } from './paciente';

export interface Analisis {
  idAnalisis: number;
  medico: Medico;
  paciente: Paciente;
  fecha: string;
  descripcion: string;
  codenv: string;
  compag: string;
  monto: number;
  observ: string;
  detiteana: Iteana[];
}

//	private Catmue catmue;
