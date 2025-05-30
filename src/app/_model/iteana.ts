import { Examen } from './examen';
import { Analisis } from './analisis';

export interface Iteana {
  idIteana: number;
  analisis: Analisis;
  examen: Examen;
  resultado: string;
}
