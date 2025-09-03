import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TipoService } from '../../_service/tipo.service';
import { NotificationService } from '../../_service/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';
import { PermissionService } from '../../_service/permission.service';
import { ShowPermission } from '../../_model/showPermission';
import { TipoListaComponent } from './tipo-lista/tipo-lista.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tipo',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive,TipoListaComponent,JsonPipe],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss',
})
export class TipoComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private tipoService = inject(TipoService);
  private notificationService = inject(NotificationService);
  private permissionService = inject(PermissionService);
  private permission: ShowPermission[] | undefined;
  private role:string;
  public activateRoute = inject(ActivatedRoute);

  constructor() {
    this.role = "";
  }

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

    this.tipoService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
//    this.router.navigate(['/pages/type/list']);
  }

  isOperation(operation: string) {
    return this.permission?.some((reg) => reg.operation === operation);
  }
}
