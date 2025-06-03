import { Component, inject } from '@angular/core';
import { Module } from '../../../_model/module';
import { ModuleService } from '../../../_service/module.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-module-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './module-details.component.html',
  styleUrl: './module-details.component.scss'
})
export class ModuleDetailsComponent {
  module: Module | undefined;
  id: number = 0;

  private moduleService = inject(ModuleService);
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
    this.moduleService.listarPorId(this.id).subscribe((data) => {
      this.module = data;
      console.log('detalle:', this.module);
    });
  }

  volver(): void {
    this.router.navigate(['pages/module/list']);
  }

}
