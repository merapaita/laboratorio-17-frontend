import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RegistroEditorComponent } from '../registro-editor/registro-editor.component';
import { Router } from '@angular/router';

interface Registro {
  id?: number;
  nombre: string;
  email: string;
  descripcion?: string;
}

@Component({
  selector: 'app-registro-listar',
  standalone: true,
  imports: [NgIf, NgFor, RegistroEditorComponent],
  templateUrl: './registro-listar.component.html',
  styleUrl: './registro-listar.component.css'
})
export class RegistroListarComponent {
  listaDeRegistros: Registro[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, nombre: 'María Gómez', email: 'maria.gomez@example.com' }
  ];

//  registroAEditar: Registro | null = null;
//  mostrarFormularioNuevo: boolean = false;
//  nextId: number = 3; // Para simular IDs

  constructor(private router: Router) {} // Inyecta el Router

  // abrirFormularioNuevo(): void {
  //   this.registroAEditar = null;
  //   this.mostrarFormularioNuevo = true;
  // }

  editarRegistro(registro: Registro): void {
    this.router.navigate(['/editar-registro', registro.id]);
//    this.registroAEditar = { ...registro }; // Crear una copia para no modificar directamente la lista
//    this.mostrarFormularioNuevo = false;
  }

  verDetalle(id?: number): void {
    if (id) {
      this.router.navigate(['/detalle-registro', id]);
    }
  }

  // agregarRegistro(nuevoRegistro: Registro): void {
  //   nuevoRegistro.id = this.nextId++;
  //   this.listaDeRegistros.push(nuevoRegistro);
  //   this.mostrarFormularioNuevo = false;
  //   this.redireccionarADetalle(nuevoRegistro.id); // Redirige después de agregar
  // }

  // actualizarRegistro(registroActualizado: Registro): void {
  //   const index = this.listaDeRegistros.findIndex(r => r.id === registroActualizado.id);
  //   if (index !== -1) {
  //     this.listaDeRegistros[index] = registroActualizado;
  //   }
  //   this.registroAEditar = null;
  //   this.redireccionarADetalle(registroActualizado.id); // Redirige después de actualizar
  // }

  eliminarRegistro(id?: number): void {
    if (id !== undefined) {
      this.listaDeRegistros = this.listaDeRegistros.filter(r => r.id !== id);
    }
  }

  // cerrarFormulario(): void {
  //   this.registroAEditar = null;
  //   this.mostrarFormularioNuevo = false;
  // }

  // redireccionarADetalle(id?: number): void {
  //   if (id) {
  //     this.router.navigate(['pages', 'detalle-registro', id]); // Redirige a la ruta '/detalle-registro/:id'
  //   }
  // }

}
