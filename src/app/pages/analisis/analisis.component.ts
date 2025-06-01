import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { AnalisisService } from '../../_service/analisis.service';

@Component({
  selector: 'app-analisis',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './analisis.component.html',
  styleUrl: './analisis.component.css',
})
export class AnalisisComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private analisisService = inject(AnalisisService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.analisisService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/analysis/list']);
  }
}