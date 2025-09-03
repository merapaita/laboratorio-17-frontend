import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { UserService } from '../../_service/user.service';
import { NotificationService } from '../../_service/notification.service';
import { ShowPermission } from '../../_model/showPermission';
import { PermissionService } from '../../_service/permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
})
export class UsuarioComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private permissions: ShowPermission[] | undefined;
  private permissionService = inject(PermissionService);
  private role = '';

  ngOnInit(): void {
    let jwtHelp = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME);
    if (token) {
      let decodedToken = jwtHelp.decodeToken(token);
      this.role = decodedToken.role;
      this.permissionService.listar(this.role).subscribe((data) => {
        this.permissionService.setPermissionCambio(data);
      });
      this.permissionService.getPermissionCambio().subscribe((data) => {
        this.permissions = data;
      });
    }

    this.userService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/user/list']);
  }

  isOperation(operation: string) {
    console.log(this.permissions);
    return this.permissions?.some((reg) => reg.operation === operation);
  }
}
