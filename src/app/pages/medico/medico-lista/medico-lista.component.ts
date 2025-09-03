import { ShowPermission } from './../../../_model/showPermission';
import { NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicoService } from '../../../_service/medico.service';
import {
  Notification,
  NotificationService,
} from '../../../_service/notification.service';
import { ReqPageable } from '../../../_model';
import { Medico } from '../../../_model/medico';
import { PermissionService } from '../../../_service/permission.service';

@Component({
  selector: 'app-medico-lista',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule, NgClass],
  templateUrl: './medico-lista.component.html',
  styleUrl: './medico-lista.component.scss',
})
export class MedicoListaComponent implements OnInit {
  notifications: Notification[] = [];
  reqPage: ReqPageable | undefined;

  private medicoService = inject(MedicoService);
  private notificationService = inject(NotificationService);
  private permissions: ShowPermission[] | undefined;
  private permissionService = inject(PermissionService);

  _nombre = '';
  _apellido = '';
  _text = '';
  medicos: Array<Medico> = [];

  ngOnInit(): void {
    this.permissionService.getPermissionCambio().subscribe((data) => {
      this.permissions = data;
    });
    // this.medicoService.getMensajeCambio().subscribe((_text) => {
    //   this.notificationService.show(_text, 'success');
    // });

    this.changePage(this.numberPage);
  }

  busca() {
    this.medicoService
      .listarPageable(this._apellido, this._nombre, this.numberPage, this.size)
      .subscribe((data) => {
        //        console.log('data:', data);
        //      this.socio = data.content;
        // this.totRegistros = data.totalElements;
        // this.dataSource = new MatTableDataSource(data.content);
        // this.idPagina = (0);
      });
  }

  numberPage = 0;
  _numberPage = 1; // para la vista
  _validPage = true; // para la

  size = 10;
  isFirst = true;
  isLast = true;
  totalPages = 0;
  totalElements = 0;

  first() {
    this.changePage(0);
  }

  last() {
    this.changePage(this.pages());
  }

  changePage(page: number) {
    this.medicoService
      .listarPageable(this._apellido, this._nombre, page, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.medicos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberPage = data.number;
        this._numberPage = data.number + 1;
        // this.iniPagina = data.number * data.size + 1;
        // this.finPagina =
        //   (data.number + 1) * 10 < data.totalElements
        //     ? (data.number + 1) * 10
        //     : this.totalElements;
        // this.txtPagina = data.number + 1;
      });
    this._validNumberPage();
    //      console.log("first:", this.isFirst, "last:", this.isLast, "page", this.numberPage, this.totalPages, this.totalElements);
  }

  pages(): number {
    let xx = Math.ceil(this.totalElements / this.size) - 1;
    //    console.log("xx:", xx);
    return xx;
  }

  _validNumberPage() {
    const total = this.pages();
    this._validPage =
      this._numberPage !== null &&
      this._numberPage >= 0 &&
      this._numberPage - 1 <= total;
  }

  irAPagina() {
    if (this._validPage && this._numberPage !== null) {
      this.changePage(this._numberPage);
    }
  }

  isOperation(operation: string) {
    return this.permissions?.some((reg) => reg.operation === operation);
  }
}
