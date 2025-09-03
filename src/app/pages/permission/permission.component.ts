import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PermissionService } from '../../_service/permission.service';
import { NotificationService } from '../../_service/notification.service';
import { ShowPermission } from '../../_model/showPermission';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

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
  permissions:ShowPermission[]|undefined;
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
      this.permissionService.getPermissionCambio().subscribe(data => {
        this.permissions = data;
      })
    }


    this.permissionService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/permission/list']);
  }
  isOperation(operation:string){
    return this.permissions?.some(reg => reg.operation === operation );
  }
}
