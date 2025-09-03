import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../_service/profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';
import { PermissionService } from '../../_service/permission.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  permissionService = inject(PermissionService);

  constructor() {
  }

  ngOnInit(): void {
  }
}
