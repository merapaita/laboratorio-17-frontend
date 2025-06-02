import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Operation } from '../../../_model/operation';
import { OperationService } from '../../../_service/operation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-operation-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './operation-detail.component.html',
  styleUrl: './operation-detail.component.scss'
})
export class OperationDetailComponent implements OnInit {
  operation: Operation | undefined;
  id: number = 0;

  private operationService = inject(OperationService);
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
    this.operationService.listarPorId(this.id).subscribe((data) => {
      this.operation = data;
    });
  }

  volver(): void {
    this.router.navigate(['pages/operation/list']);
  }
}
