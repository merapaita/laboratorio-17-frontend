import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionService } from '../../_service/permission.service';
import { ShowPermission } from '../../_model/showPermission';
import { JwtHelperService } from '@auth0/angular-jwt';
import { variables } from '../../variables';

@Component({
  selector: 'app-layout2',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  templateUrl: './layout2.component.html',
  styleUrl: './layout2.component.scss'
})
export class Layout2Component implements OnInit {
  permissionService = inject(PermissionService);
  role: string;

  isCollapsed = true;
  isDarkMode = true;
  permission:ShowPermission[]|undefined;

  constructor() {
    this.role = "";
  }

  ngOnInit(): void {
       const helper = new JwtHelperService();

    let token = sessionStorage.getItem(variables.TOKEN_NAME);

    if (token) {
      const decodedToken = helper.decodeToken(token);
      this.role = decodedToken.role;
      this.permissionService.listar(this.role).subscribe(data => {
        this.permissionService.setPermissionCambio(data);
      });
    }

    this.permissionService.getPermissionCambio().subscribe(data => {
      this.permission = data;
    });
  }
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log("saliendo");
  
}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  isModule(module:string) {
    return this.permission?.some(reg => reg.module===module)
  }
  
}
