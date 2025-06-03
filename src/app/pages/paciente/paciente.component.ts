import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../_service/notification.service';
import { PacienteService } from '../../_service/paciente.service';

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

  ngOnInit(): void {
    this.pacienteService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/patient/list']);
  }
}
