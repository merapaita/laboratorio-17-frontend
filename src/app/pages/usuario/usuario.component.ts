import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  notifications: Notification[] = [];
  private router = inject(Router);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  
  ngOnInit(): void {
    this.userService.getMensajeCambio().subscribe((texto) => {
      this.notificationService.show(texto, 'success');
    });
    this.router.navigate(['/pages/user/list']);
  }
}
