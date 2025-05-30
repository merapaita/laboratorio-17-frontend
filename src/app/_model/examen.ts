import { Tipo } from "./tipo";

export interface Examen {
  idExamen: number;
  tipo: Tipo;
  item: number;
  descripcion: string;
  valref: string;
  unidad: string;
  formula: string;
}