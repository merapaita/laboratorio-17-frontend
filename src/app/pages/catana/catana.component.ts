import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { CatanaService } from '../../_service/catana.service';

@Component({
  selector: 'app-catana',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './catana.component.html',
  styleUrl: './catana.component.css'
})
export class CatanaComponent implements OnInit {

  notifications: Notification[] = [];
  private router = inject(Router);
  private catanaService = inject(CatanaService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.catanaService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/catana/list']);
  }
}
