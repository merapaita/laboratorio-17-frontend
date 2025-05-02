import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resistro',
  standalone: true,
  imports: [],
  templateUrl: './resistro.component.html',
  styleUrl: './resistro.component.css',
})
export class ResistroComponent {
  
  constructor(private router: Router) {}

  nuevoRegistro(): void {
    this.router.navigate(['/nuevo-registro']);
  }

  verLista(): void {
    this.router.navigate(['/registros']);
  }
}
