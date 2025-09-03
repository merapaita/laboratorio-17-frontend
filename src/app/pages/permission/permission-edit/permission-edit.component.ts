import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '../../../_service/permission.service';
import { Operation } from '../../../_model/operation';
import { Role } from '../../../_model/role';
import { OperationService } from '../../../_service/operation.service';
import { RoleService } from '../../../_service/role.service';
import { SavePermission } from '../../../_model/savePermission';

@Component({
  selector: 'app-permission-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, AsyncPipe, NgFor, JsonPipe],
  templateUrl: './permission-edit.component.html',
  styleUrl: './permission-edit.component.scss'
})
export class PermissionEditComponent implements OnInit {
  form: FormGroup;
  id = 0;
  edicion = false;
  titulo = 'REGISTRO';
  operations$ = new Observable<Operation[]>;
  roles$ = new Observable<Role[]>;

  private activateRoute = inject(ActivatedRoute);
  private permissionService = inject(PermissionService);
  private operationService = inject(OperationService);
  private roleService = inject(RoleService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      operation: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.operations$ = this.operationService.listar();
    this.roles$ = this.roleService.listar();
    // this.activateRoute.params.subscribe((params) => {
    //   this.id = params['id'];
    //   this.edicion = params['id'] != null;
    //   this.initForm();
    // });
  }

  // initForm() {
  //   if (this.edicion) {
  //     this.operationService.listarPorId(this.id).subscribe((data) => {
  //       this.form.controls['role'].setValue(data.role);
  //       this.form.controls['operation'].setValue(data.operation);
  //     });
  //   }
  // }

  aceptar() {
    const registro: SavePermission = this.form.value;
    if (this.edicion) {
      //MODIFICAR
      // this.permissionService.modificarNvo(registro).subscribe((result) => {
      //   this.permissionService.setMensajeCambio('REGISTRO MODIFICADO SATISFACTORIAMENTE');
      //   this.router.navigate([
      //     `pages/permission/detail/${registro.id}`,
      //   ]);
      // });
    } else {
      //REGISTRAR
      this.permissionService.registrarNvo(registro).subscribe((result) => {
        let id = result.id;
        this.operationService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/operation/detail/${id}`]);
      });
    }
  }

  get operation() {
    return this.form.get('operation');
  }
  get role() {
    return this.form.get('role');
  }
  
}
