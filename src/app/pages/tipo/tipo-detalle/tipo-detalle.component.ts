import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Tipo } from '../../../_model/tipo';
import { TipoService } from '../../../_service/tip.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-tipo-detalle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tipo-detalle.component.html',
  styleUrl: './tipo-detalle.component.css'
})
export class TipoDetalleComponent implements OnInit {
  tipo: Tipo | undefined;
  id: number = 0;

  private tipoService = inject(TipoService);
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
    this.tipoService.listarPorId(this.id).subscribe((data) => {
      this.tipo = data;
    });
  }

  volver(): void {
    this.router.navigate(['pages/type/list']);
  }
}
