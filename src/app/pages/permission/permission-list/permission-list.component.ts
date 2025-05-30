import { NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReqPageable } from '../../../_model';
import { PermissionService } from '../../../_service/permissionService';
import { NotificationService } from '../../../_service/notification.service';
import { Operation } from '../../../_model/operation';
import { ShowPermission } from '../../../_model/showPermission';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule, NgClass],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.css',
})
export class PermissionListComponent implements OnInit {
  notifications: Notification[] = [];
  reqPage: ReqPageable | undefined;

  private permissionService = inject(PermissionService);
  private notificationService = inject(NotificationService);

  _text = '';
  _role = '';
  permissions: Array<ShowPermission> = [];

  ngOnInit(): void {
    this.changePage(this.numberPage);
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
    this.permissionService
      .listPageable(this._role, page, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.permissions = data.content;
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
  }

  pages(): number {
    return Math.ceil(this.totalElements / this.size) - 1;
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

  busca() {
    this.permissionService
      .listPageable(
        this._role,
        0,
        10
      ) // , this.order, this.asc
      .subscribe((data) => {
        this.permissions = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberPage = data.number;
        this._numberPage = data.number + 1;
      });
  }
}

