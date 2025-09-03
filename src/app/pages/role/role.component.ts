import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { RoleService } from '../../_service/role.service';
import { ShowPermission } from '../../_model/showPermission';
import { PermissionService } from '../../_service/permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private roleService = inject(RoleService);
  private notificationService = inject(NotificationService);
  permissions:ShowPermission[]|undefined;
  permissionService = inject(PermissionService)
  role = "";

  ngOnInit(): void {
    let helper = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    if (token) {
      let decodeToken = helper.decodeToken(token);
      this.role = decodeToken.role;
      this.permissionService.listar(this.role).subscribe(data => {
        this.permissionService.setPermissionCambio(data);
      })
    }
    this.permissionService.getPermissionCambio().subscribe(data => {
      this.permissions = data;
    })
    this.roleService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/role/lista']);
  }

  isOperation(operation:string){
    return this.permissions?.some(reg => reg.operation === operation);
  }
}
