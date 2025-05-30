import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';

interface Registro {
  id?: number;
  nombre: string;
  email: string;
  descripcion?: string;
}

@Component({
  selector: 'app-registro-detalle',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './registro-detalle.component.html',
  styleUrl: './registro-detalle.component.css'
})
export class RegistroDetalleComponent implements OnInit {
  registro: Registro | undefined;

   // Simulación de tu servicio de datos (reemplaza con tu lógica real)
   private obtenerRegistro(id: number): Registro | undefined {
    // En una aplicación real, harías una llamada a un servicio para obtener el registro por su ID
    const registros: Registro[] = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', descripcion: 'Detalle de Juan' },
      { id: 2, nombre: 'María Gómez', email: 'maria.gomez@example.com', descripcion: 'Detalle de María' }
    ];
    return registros.find(r => r.id === id);
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = Number(params['id']);
        return of(this.obtenerRegistro(id)); // Usa 'of' para convertir el resultado síncrono en un Observable
      })
    ).subscribe(registro => {
      this.registro = registro;
    });
  }

}
