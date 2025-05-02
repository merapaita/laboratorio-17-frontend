import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MedicoService } from '../../_service/medico.service';
import { Notification, NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent implements OnInit {

  notifications: Notification[] = [];
  private router = inject(Router);
  private medicoService = inject(MedicoService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.medicoService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    // this.medicoService.getMensajeCambio().subscribe(texto => {
    //   this.snackBar.open(texto, 'AVISO', { duration: 2000 });
    // });
    this.router.navigate(['/pages/medico/lista']);
  }
}
