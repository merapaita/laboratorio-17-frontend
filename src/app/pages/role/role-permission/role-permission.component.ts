import { Operation } from './../../../_model/operation';
import { Role } from './../../../_model/role';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../_service/role.service';
import { OperationService } from '../../../_service/operation.service';
import { NgFor } from '@angular/common';
import { PermissionService } from '../../../_service/permission.service';
import { ShowPermission } from '../../../_model/showPermission';
import { PermissionDto } from '../../../_model/permissionDto';

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './role-permission.component.html',
  styleUrl: './role-permission.component.scss',
})
export class RolePermissionComponent implements OnInit {
  formMaestro: FormGroup;
  role = '';
  titulo = 'PERMISOS';
  //  newPermissions: PermissionDto | undefined;
  permissions: ShowPermission[] = [];

  private activateRoute = inject(ActivatedRoute);
  private roleService = inject(RoleService);
  private operationService = inject(OperationService);
  private permissionService = inject(PermissionService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.formMaestro = this.formBuilder.group({
      id: new FormControl(),
      role: new FormControl('', [Validators.required]),
      operations: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.role = this.activateRoute.snapshot.params['id'];

    this.permissionService.listar(this.role).subscribe((reg) => {
      this.permissions = reg;
      this.initForm(); // Pasas operations directamente
    });

    // this.activateRoute.params.subscribe((params) => {
    //   this.role = params['id'];
    //   this.permissionService.listar(this.role).subscribe((reg) => {
    //     this.permissions = reg;
    //     this.initForm();
    //   });
    // });
  }

  initForm() {
    this.titulo = 'PERMISOS';
    this.formMaestro.controls['role'].setValue(this.role);

    const array = this.formMaestro.get('operations') as FormArray;
    array.clear(); // limpia lo anterior

    this.operationService.listar().subscribe((data) => {
      data.forEach((reg) => {
        let acepta = false;
        this.permissions.forEach((regPermission) => {
          if (regPermission.operation === reg.name) {
            acepta = true;
          }
        });
        array.push(
          this.formBuilder.group({
            id: [''],
            name: [reg.name],
            path: [reg.path],
            httpMethod: [reg.httpMethod],
            permitAll: [reg.permitAll],
            module: this.formBuilder.group({
              id: [reg.module.id],
              basePath: [reg.module.basePath],
              name: [reg.module.name],
            }),
            select: [acepta],
          })
        );
      });
    });
  }

  aceptar() {
    let role:string = this.formMaestro.get('role')?.value;
    const array: Operation[] = this.formMaestro.get('operations')?.value;
    const permissionsOk = array.filter((reg) => reg.select === true);
    let newPermissions: PermissionDto = {role:role, operations: permissionsOk};
//    const newPermissions: {role:string, operations:Operation[]} = {role, permissionsOk};
    this.permissionService.registerPermissionPerRole(newPermissions).subscribe((result) => {
      this.roleService.setMensajeCambio(
        'PERMISOS REGISTRADOS SATISFACTORIAMENTE'
      );
      console.log(result);
      this.router.navigate(['pages/role/lista']);
      // this.router.navigate([`pages/role/detail/${result.role}`]);
    });

    //     const registro: Analisis = this.formMaestro.value;
    //     console.log(registro);
    //     //  registro:Operation = new Operation;
    // //    if (this.edicion) {
    // //      //MODIFICAR
    // //      this.analisisService.modificarNvo(registro).subscribe((result) => {
    // //        this.analisisService.setMensajeCambio(
    // //          'REGISTRO MODIFICADO SATISFACTORIAMENTE'
    // //        );
    // //        this.router.navigate([`pages/analysis/detail/${registro.idAnalisis}`]);
    // //      });
    // //    } else {
    //       //REGISTRAR
    //       this.analisisService.registrarNvo(registro).subscribe((result) => {
    //         let id = result.idAnalisis;
    //         this.analisisService.setMensajeCambio('REGISTRO SATISFACTORIO');
    //         this.router.navigate([`pages/analysis/detail/${id}`]);
    //       });
    // //    }
  }

  get operations(): FormArray {
    return this.formMaestro.get('operations') as FormArray;
  }
}
