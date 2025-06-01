import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Analisis } from '../../../_model/analisis';
import { AnalisisService } from '../../../_service/analisis.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-analisis-detail',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './analisis-detail.component.html',
  styleUrl: './analisis-detail.component.css'
})
export class AnalisisDetailComponent implements OnInit {
  analysis: Analisis | undefined;
  id: number = 0;

  private analisisService = inject(AnalisisService);
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
    this.analisisService.listarPorId(this.id).subscribe((data) => {
      this.analysis = data;
    });
  }

  volver(): void {
    this.router.navigate(['pages/analysis/list']);
  }

}