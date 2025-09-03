import { Component, inject, OnInit } from '@angular/core';
import { Catana } from '../../../_model/catana';
import { CatanaService } from '../../../_service/catana.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ShowPermission } from '../../../_model/showPermission';
import { PermissionService } from '../../../_service/permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../../variables';

@Component({
  selector: 'app-catana-detalle',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './catana-detalle.component.html',
  styleUrl: './catana-detalle.component.scss',
})
export class CatanaDetalleComponent implements OnInit {
  catana: Catana | undefined;
  id: number = 0;

  private catanaService = inject(CatanaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private permissionService = inject(PermissionService);
  private permissions: ShowPermission[] | undefined;

  private role = '';

  ngOnInit(): void {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    if (token) {
      const decodedToken = helper.decodeToken(token);
      this.role = decodedToken.role;
      this.permissionService.listar(this.role).subscribe((data) => {
        this.permissionService.setPermissionCambio(data);
      });
      this.permissionService.getPermissionCambio().subscribe((data) => {
        this.permissions = data;
      });
    }

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

  reporte(id: number) {
    this.catanaService.generarReporte(id).subscribe((data) => {
      const url = window.URL.createObjectURL(data);
      //console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
  }

  volver(): void {
    this.router.navigate(['pages/catana/list']);
  }

  isOperation(operation:string) {
    return this.permissions?.some(reg => reg.operation === operation);
  }

}
