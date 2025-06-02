import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TipoService } from '../../_service/tip.service';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss'
})
export class TipoComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private tipoService = inject(TipoService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.tipoService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/type/list']);
  }
}
