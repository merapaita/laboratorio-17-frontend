import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { RoleService } from '../../_service/role.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private roleService = inject(RoleService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.roleService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/role/lista']);
  }
}
