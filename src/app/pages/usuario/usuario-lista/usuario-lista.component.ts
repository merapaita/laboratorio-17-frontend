import { Component, inject } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReqPageable } from '../../../_model';
import { UserService } from '../../../_service/user.service';
import { NotificationService } from '../../../_service/notification.service';
import { UsuarioRegistrado } from '../../../_model/usuario-registrado';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass, NgFor],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.css',
})
export class UsuarioListaComponent {
  notifications: Notification[] = [];
  reqPage: ReqPageable | undefined;

  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  _text = '';
  users: Array<UsuarioRegistrado> = [];

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
    this.userService
      .listPageable(page, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.users = data.content;
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
    this.userService
      .listPageable(0, 10) // , this.order, this.asc
      .subscribe((data) => {
        this.users = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberPage = data.number;
        this._numberPage = data.number + 1;
      });
  }
}
