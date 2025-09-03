import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { CatanaService } from '../../_service/catana.service';
import { PermissionService } from '../../_service/permission.service';
import { ShowPermission } from '../../_model/showPermission';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

@Component({
  selector: 'app-catana',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './catana.component.html',
  styleUrl: './catana.component.scss',
})
export class CatanaComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private catanaService = inject(CatanaService);
  private notificationService = inject(NotificationService);
  private permissionService = inject(PermissionService);
  private permission: ShowPermission[] | undefined;
  role = '';

  ngOnInit(): void {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    if (token) {
      const decodedToken = helper.decodeToken(token);
      this.role = decodedToken.role;
      this.permissionService.listar(this.role).subscribe((data) => {
        this.permissionService.setPermissionCambio(data);
      });
      this.permissionService.getPermissionCambio().subscribe((data) => {
        this.permission = data;
      });
    }
    this.catanaService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/catana/list']);
  }
  isOperation(operation: string) {
    return this.permission?.some((reg) => reg.operation === operation);
  }
}
