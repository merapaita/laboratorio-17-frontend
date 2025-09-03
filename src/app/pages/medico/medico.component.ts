import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MedicoService } from '../../_service/medico.service';
import {
  Notification,
  NotificationService,
} from '../../_service/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';
import { ShowPermission } from '../../_model/showPermission';
import { PermissionService } from '../../_service/permission.service';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss',
})
export class MedicoComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private medicoService = inject(MedicoService);
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

    this.medicoService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/doctor/list']);
  }

  isOperation(operation: string) {
    return this.permissions?.some((reg) => reg.operation === operation);
  }
}
