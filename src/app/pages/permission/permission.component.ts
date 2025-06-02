import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PermissionService } from '../../_service/permissionService';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private permissionService = inject(PermissionService);
  private notificationService = inject(NotificationService);
  
  ngOnInit(): void {
    this.permissionService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/permission/list']);
  }
}
