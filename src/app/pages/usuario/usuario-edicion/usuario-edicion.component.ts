import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioNuevo } from '../../../_model/usuario-nuevo';
import { UserService } from '../../../_service/user.service';
import { UsuarioRegistrado } from '../../../_model/usuario-registrado';
import { Observable } from 'rxjs';
import { Role } from '../../../_model/role';
import { RoleService } from '../../../_service/role.service';

@Component({
  selector: 'app-usuario-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, AsyncPipe, NgFor],
  templateUrl: './usuario-edicion.component.html',
  styleUrl: './usuario-edicion.component.scss',
})
export class UsuarioEdicionComponent implements OnInit {
  form: FormGroup;
  usuarioNuevo: UsuarioNuevo | null = null;
  edicion = false;
  titulo = '';
  id = '';
  roles$ = new Observable<Role[]>();
  
  
  private activateRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private roleService = inject(RoleService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s]){3,530}$/),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9]){3,30}$/),
      ]),
      role: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9]){3,30}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])([A-Za-z\d$@$!%*?&#.$($)$-$_]|[^ ]){4,15}$/
        // ),
      ]),
      repeatedPassword: new FormControl('', [
        Validators.required,
        // Validators.pattern(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])([A-Za-z\d$@$!%*?&#.$($)$-$_]|[^ ]){4,15}$/
        // ),
      ]),
    });
  }

  ngOnInit(): void {
    this.roles$ = this.roleService.listar();
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
     this.initForm();
    });
  }
  
  initForm() {
    if (this.edicion) {
      this.userService.listarPorId(this.id).subscribe((data) => {
        this.form.controls['name'].setValue(data.name);
        this.form.controls['username'].setValue(data.username);
        this.form.controls['password'].setValue("");
        this.form.controls['repeatedPassword'].setValue("");
        this.form.controls['role'].setValue(data.role);
      });
    }
  }

  aceptar() {
    const registroUsuario: UsuarioNuevo = this.form.value;
//    const registro: Role = this.form.value;
    if (this.edicion) {
      //MODIFICAR
      this.userService.modifica(registroUsuario).subscribe((result) => {
        this.roleService.setMensajeCambio('REGISTRO MODIFICADO SATISFACTORIAMENTE');
        this.router.navigate([
          `pages/user/detail/${registroUsuario.username}`,
        ]);
      });
    } else {
      //REGISTRAR
      this.userService.nuevo(registroUsuario).subscribe((result) => {
        let id = result.id;
        this.userService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/user/detail/${id}`]);
      });
    }
  }
  // aceptar() {
  //   const registroUsuario: UsuarioNuevo = this.form.value;

  //   this.userService
  //     .nuevo(registroUsuario)
  //     .subscribe((result: UsuarioRegistrado) => {
  //       // let id = result.id;
  //       //      console.log(result);
  //       this.userService.setMensajeCambio('REGISTRO SATISFACTORIO');
  //       //        this.notificationService.show("Medico registrado satisfactoriamente", 'success')
  //       //        this.medicoService.setMensajeCambio('SOCIO REGISTRADO');
  //       // this.toastr.success('Venta Registrada', 'OK', {
  //       //   timeOut: 3000,
  //       //   positionClass: 'toast-center-center',
  //       // });
  //       //this.router.navigate([`/login`]);
  //     });
  // }

  get name() {
    return this.form.get('name');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get repeatedPassword() {
    return this.form.get('repeatedPassword');
  }
}
