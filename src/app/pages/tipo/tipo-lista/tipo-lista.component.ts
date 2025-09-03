import { Component, inject, OnInit } from '@angular/core';
import { TipoService } from '../../../_service/tipo.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReqPageable } from '../../../_model';
import { NotificationService } from '../../../_service/notification.service';
import { Tipo } from '../../../_model/tipo';
import { PermissionService } from '../../../_service/permission.service';
import { ShowPermission } from '../../../_model/showPermission';

@Component({
  selector: 'app-tipo-lista',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule, NgClass],
  templateUrl: './tipo-lista.component.html',
  styleUrl: './tipo-lista.component.scss',
})
export class TipoListaComponent implements OnInit {
  notifications: Notification[] = [];
  reqPage: ReqPageable | undefined;

  private tipoService = inject(TipoService);
  private notificationService = inject(NotificationService);
  private permissionService = inject(PermissionService);
  private permission: ShowPermission[] | undefined;

  _descripcion = '';
  tipos: Array<Tipo> = [];

  ngOnInit(): void {
    this.permissionService.getPermissionCambio().subscribe((data) => {
      this.permission = data;
    });

    // this.tipoService.getMensajeCambio().subscribe((_text) => {
    //   this.notificationService.show(_text, 'success');
    // });

    this.changePage(this.numberPage);
  }

  busca() {
    this.tipoService
      .listarPageable(this._descripcion, this.numberPage, this.size)
      .subscribe((data) => {
        this.tipos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberPage = data.number;
        this._numberPage = data.number + 1;
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
    this.tipoService
      .listarPageable(this._descripcion, page, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.tipos = data.content;
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
    return this.permission?.some((reg) => reg.operation === operation);
  }
}
