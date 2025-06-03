import { UsuarioRegistrado } from './../../../_model/usuario-registrado';
import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../_service/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './usuario-detalle.component.html',
  styleUrl: './usuario-detalle.component.scss'
})
export class UsuarioDetalleComponent {

  usuario: UsuarioRegistrado | undefined;
  id: string = '';

  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: Params) => {
      this.id = data['id'];
      if (this.id !== null) {
        this.initForm();
      }
    });
  }

  initForm() {
    this.userService.listarPorId(this.id).subscribe((data) => {
      this.usuario = data;
    });
  }

  
  volver(): void {
    this.router.navigate(['pages/user/list']);
  }

}
