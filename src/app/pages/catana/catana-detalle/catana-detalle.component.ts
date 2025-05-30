import { Component, inject, OnInit } from '@angular/core';
import { Catana } from '../../../_model/catana';
import { CatanaService } from '../../../_service/catana.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-catana-detalle',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './catana-detalle.component.html',
  styleUrl: './catana-detalle.component.css'
})
export class CatanaDetalleComponent implements OnInit {
  catana: Catana | undefined;
  id: number = 0;

  private catanaService = inject(CatanaService);
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
    this.catanaService.listarPorId(this.id).subscribe((data) => {
      this.catana = data;
    });
  }

  volver(): void {
    this.router.navigate(['pages/catana/list']);
  }
}
