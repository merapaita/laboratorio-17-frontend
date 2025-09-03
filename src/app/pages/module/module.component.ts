import { ShowPermission } from './../../_model/showPermission';
import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ModuleService } from '../../_service/module.service';
import { NotificationService } from '../../_service/notification.service';
import { PermissionService } from '../../_service/permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './module.component.html',
  styleUrl: './module.component.scss',
})
export class ModuleComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private moduleService = inject(ModuleService);
  private notificationService = inject(NotificationService);
  permissions: ShowPermission[] | undefined;
  permissionService = inject(PermissionService);
  role = "";

  ngOnInit(): void {
    let helper = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    if (token) {
      let decodeToken = helper.decodeToken(token);
      this.role = decodeToken.role;      
      this.permissionService.listar(this.role).subscribe(data => {
        this.permissions = data;
      })
    }


    this.permissionService.getPermissionCambio().subscribe((data) => {
      this.permissions = data;
    });
    //    console.log("holaHola");
    this.moduleService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/module/list']);
  }
  isOperation(operation: string) {
    return this.permissions?.some((reg) => reg.operation === operation);
  }
}
