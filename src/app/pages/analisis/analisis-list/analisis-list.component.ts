import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReqPageable } from '../../../_model';
import { AnalisisService } from '../../../_service/analisis.service';
import { NotificationService } from '../../../_service/notification.service';
import { Analisis } from '../../../_model/analisis';

@Component({
  selector: 'app-analisis-list',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink, NgClass, DatePipe],
  templateUrl: './analisis-list.component.html',
  styleUrl: './analisis-list.component.css',
})
export class AnalisisListComponent implements OnInit {
  notifications: Notification[] = [];
  reqPage: ReqPageable | undefined;

  private analisisService = inject(AnalisisService);
  private notificationService = inject(NotificationService);

  _descripcion = '';
  _text = '';
  analysisList: Array<Analisis> = [];

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
    this.analisisService
      .listarPageable(this._descripcion, page, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.analysisList = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberPage = data.number;
        this._numberPage = data.number + 1;
      });
    this._validNumberPage();
    //      console.log("first:", this.isFirst, "last:", this.isLast, "page", this.numberPage, this.totalPages, this.totalElements);
  }

  busca() {
    this.analisisService
      .listarPageable(this._descripcion, this.numberPage, this.size)
      .subscribe((data) => {
        //        console.log(data);
        this.analysisList = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberPage = data.number;
        this._numberPage = data.number + 1;
      });
    this._validNumberPage();
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
