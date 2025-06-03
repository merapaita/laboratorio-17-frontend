import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Paciente } from '../../../_model/paciente';
import { PacienteService } from '../../../_service/paciente.service';

@Component({
  selector: 'app-paciente-detalle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './paciente-detalle.component.html',
  styleUrl: './paciente-detalle.component.scss'
})
export class PacienteDetalleComponent implements OnInit {
  paciente: Paciente | undefined;
  id: number = 0;

  private pacienteService = inject(PacienteService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: Params) => {
      this.id = data['id'];
      if (this.id !== null) {
        this.initForm();
      }
    });
  }
  initForm() {
    this.pacienteService.listarPorId(this.id).subscribe((data) => {
      this.paciente = data;
      console.log("detalle:", this.paciente);
    });
  }

  volver(): void {
    this.router.navigate(['pages/patient/list']);
  }
}
