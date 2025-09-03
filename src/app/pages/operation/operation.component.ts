import { PermissionService } from './../../_service/permission.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { OperationService } from '../../_service/operation.service';
import { NotificationService } from '../../_service/notification.service';
import { ShowPermission } from '../../_model/showPermission';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss',
})
export class OperationComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private operationService = inject(OperationService);
  private notificationService = inject(NotificationService);
  permissions: ShowPermission[] | undefined;
  permissionService = inject(PermissionService);
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
        this.permissions = data;
      });
    }

    this.operationService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/operation/list']);
  }

  isOperation(operation: string) {
    return this.permissions?.some((reg) => reg.operation === operation);
  }
}
