import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModuleService } from '../../_service/module.service';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private moduleService = inject(ModuleService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
//    console.log("holaHola");
    this.moduleService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/module/list']);
  }
}
