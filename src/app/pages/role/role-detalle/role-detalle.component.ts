import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Role } from '../../../_model/role';
import { RoleService } from '../../../_service/role.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-role-detalle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './role-detalle.component.html',
  styleUrl: './role-detalle.component.scss',
})
export class RoleDetalleComponent implements OnInit {
  role: Role | undefined;
  id: number = 0;

  private roleService = inject(RoleService);
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
    this.roleService.listarPorId(this.id).subscribe((data) => {
      this.role = data;
      console.log('detalle:', this.role);
    });
  }

  volver(): void {
    this.router.navigate(['pages/role/lista']);
  }
}
