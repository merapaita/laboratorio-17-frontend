import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { PacienteService } from '../../_service/paciente.service';
import { ShowPermission } from '../../_model/showPermission';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';
import { PermissionService } from '../../_service/permission.service';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss',
})
export class PacienteComponent {
  notifications: Notification[] = [];
  private router = inject(Router);
  private pacienteService = inject(PacienteService);
  private notificationService = inject(NotificationService);
  private permissions:ShowPermission[]|undefined;
  private permissionService = inject(PermissionService);
  role = "";

  ngOnInit(): void {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(variables.TOKEN_NAME)
    if (token) {
      let decodedToken = helper.decodeToken(token);
      this.role = decodedToken.role;
      this.permissionService.listar(this.role).subscribe(data => {
        this.permissionService.setPermissionCambio(data);
      })
      this.permissionService.getPermissionCambio().subscribe((data) => {
        this.permissions = data;
      });

    }
    this.pacienteService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/patient/list']);
  }

  isOperation(operation:string) {
    return this.permissions?.some(reg => reg.operation===operation);
  }
}
