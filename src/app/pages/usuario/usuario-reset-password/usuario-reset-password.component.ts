import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsuarioNuevo } from '../../../_model/usuario-nuevo';
import { UserService } from '../../../_service/user.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './usuario-reset-password.component.html',
  styleUrl: './usuario-reset-password.component.scss',
})
export class UsuarioResetPasswordComponent implements OnInit {
  form: FormGroup;
  //   usuarioNuevo: UsuarioNuevo | undefined;
  //   titulo = 'RESETEAR PASSWORD';
  private userService = inject(UserService);
  //   private formControl = inject(FormControl);
  private activateRoute = inject(ActivatedRoute);
  newUser:UsuarioNuevo|undefined;
  username = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl(''),
      username: new FormControl(''),
      role: new FormControl(''),
      password: new FormControl('', [
        //         // Validators.required,
        //         // Validators.pattern(
        //         //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])([A-Za-z\d$@$!%*?&#.$($)$-$_]|[^ ]){4,15}$/
        //         // ),
      ]),
      repeatedPassword: new FormControl('', [
        //         // Validators.required,
        //         // Validators.pattern(
        //         //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])([A-Za-z\d$@$!%*?&#.$($)$-$_]|[^ ]){4,15}$/
        //         // ),
      ]),
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.username = params['id'];
      this.initForm();
    });
  }

  initForm() {
    this.userService.listarPorId(this.username).subscribe((data) => {
      this.newUser = data;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['username'].setValue(data.username);
      this.form.controls['password'].setValue('');
      this.form.controls['repeatedPassword'].setValue('');
      this.form.controls['role'].setValue(data.role);
    });
  }

  aceptar() {
    const registroUsuario: UsuarioNuevo = this.form.value;
    //    if (this.edicion) {
    //MODIFICAR
    this.userService.modificaPassword(registroUsuario).subscribe((result) => {
      this.userService.setMensajeCambio(
        'PASSWORD MODIFICADO SATISFACTORIAMENTE'
      );
      //        this.router.navigate([`pages/user/detail/${registroUsuario.username}`]);
    });
    // } else {
    //   //REGISTRAR
    //   this.userService.nuevo(registroUsuario).subscribe((result) => {
    //     let id = result.id;
    //     console.log('id:', id);
    //     this.userService.setMensajeCambio('REGISTRO SATISFACTORIO');
    //     this.router.navigate([`pages/user/detail/${id}`]);
    //   });
    //    }
  }

  get password() {
    return this.form.get('password');
  }

  get repeatedPassword() {
    return this.form.get('repeatedPassword');
  }
}
