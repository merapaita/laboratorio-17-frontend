import { Component, OnInit } from '@angular/core';
import { Notification, NotificationService } from '../../_service/notification.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications.shift();
      }, 3000); // desaparece en 3 segundos
    });
  }}
