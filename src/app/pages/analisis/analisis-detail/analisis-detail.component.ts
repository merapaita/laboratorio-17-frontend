import { ShowPermission } from './../../../_model/showPermission';
import { Modal } from 'bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Analisis } from '../../../_model/analisis';
import { AnalisisService } from '../../../_service/analisis.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PermissionService } from '../../../_service/permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../../variables';

@Component({
  selector: 'app-analisis-detail',
  standalone: true,
  imports: [NgIf, NgFor, NgxExtendedPdfViewerModule],
  templateUrl: './analisis-detail.component.html',
  styleUrl: './analisis-detail.component.scss',
})
export class AnalisisDetailComponent implements OnInit {
  analysis: Analisis | undefined;
  id: number = 0;
  pdfSrc: string | ArrayBuffer | any;

  private analisisService = inject(AnalisisService);
  private activatedRoute = inject(ActivatedRoute);
  //  private dialog = inject()
  private router = inject(Router);
  private permissions: ShowPermission[] | undefined;
  private permissionService = inject(PermissionService);
  private role = "";

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
    this.analisisService.listarPorId(this.id).subscribe((data) => {
      this.analysis = data;
    });
  }

  reporte(id: number) {
    this.analisisService.generarReporte(id).subscribe((data) => {
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
    this.router.navigate(['pages/analysis/list']);
  }

  isOperation(operation: string) {
    return this.permissions?.some((reg) => reg.operation === operation);
  }
}
