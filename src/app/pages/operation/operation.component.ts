import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OperationService } from '../../_service/operation.service';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss'
})
export class OperationComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private operationService = inject(OperationService);
  private notificationService = inject(NotificationService);
  
  ngOnInit(): void {
    this.operationService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/operation/list']);
  }

}
