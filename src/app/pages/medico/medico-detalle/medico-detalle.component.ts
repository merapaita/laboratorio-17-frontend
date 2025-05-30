import { NgIf } from '@angular/common';
import { Medico } from './../../../_model/medico';
import { MedicoService } from './../../../_service/medico.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-medico-detalle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './medico-detalle.component.html',
  styleUrl: './medico-detalle.component.css',
})
export class MedicoDetalleComponent implements OnInit {
  medico: Medico | undefined;
  id: number = 0;

  private medicoService = inject(MedicoService);
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
    this.medicoService.listarPorId(this.id).subscribe((data) => {
      this.medico = data;
      console.log("detalle:", this.medico);
    });
  }

  volver(): void {
    this.router.navigate(['pages/doctor/list']);
  }
}
