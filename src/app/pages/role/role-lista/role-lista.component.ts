import { NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReqPageable } from '../../../_model';
import { RoleService } from '../../../_service/role.service';
import { NotificationService } from '../../../_service/notification.service';
import { FormsModule } from '@angular/forms';
import { Role } from '../../../_model/role';

@Component({
  selector: 'app-role-lista',
  standalone: true,
  imports: [FormsModule, NgFor, RouterModule, NgClass],
  templateUrl: './role-lista.component.html',
  styleUrl: './role-lista.component.css',
})
export class RoleListaComponent implements OnInit {
  notifications: Notification[] = [];
  reqPage: ReqPageable | undefined;

  private roleService = inject(RoleService);
  private notificationService = inject(NotificationService);

  _text = '';
  roles: Array<Role> = [];

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
    this.roleService
      .listarPageable(page, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.roles = data.content;
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
}
