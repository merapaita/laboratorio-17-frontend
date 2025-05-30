import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../_service/role.service';
import { Role } from '../../../_model/role';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-role-edicion',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './role-edicion.component.html',
  styleUrl: './role-edicion.component.css',
})
export class RoleEdicionComponent implements OnInit {
  form: FormGroup;
  id = 0;
  edicion = false;
  titulo = 'REGISTRO NUEVO';

  private activateRoute = inject(ActivatedRoute);
  private roleService = inject(RoleService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.titulo = "EDICION DE REGISTRO"
      this.roleService.listarPorId(this.id).subscribe((data) => {
        this.form.controls['id'].setValue(data.id);
        this.form.controls['name'].setValue(data.name);
      });
    }
  }

  aceptar() {
    const registro: Role = this.form.value;
    if (this.edicion) {
      //MODIFICAR
      this.roleService.modificarNvo(registro).subscribe((result) => {
        this.roleService.setMensajeCambio('REGISTRO MODIFICADO SATISFACTORIAMENTE');
        this.router.navigate([
          `pages/role/detalle/${registro.id}`,
        ]);
      });
    } else {
      //REGISTRAR
      this.roleService.registrarNvo(registro).subscribe((result) => {
        let id = result.id;
        this.roleService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/role/detalle/${id}`]);
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

}
