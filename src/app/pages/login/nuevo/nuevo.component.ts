import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../../../_service/user.service';
import { UsuarioNuevo } from '../../../_model/usuario-nuevo';
import { UsuarioRegistrado } from '../../../_model/usuario-registrado';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss',
})
export class NuevoComponent {
  form: FormGroup;
  usuarioNuevo: UsuarioNuevo | null = null;

  private userService = inject(UserService);
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

  aceptar() {
    const registroUsuario: UsuarioNuevo = this.form.value;

    this.userService
      .nuevo(registroUsuario)
      .subscribe((result: UsuarioRegistrado) => {
        // let id = result.id;
        //      console.log(result);
        this.userService.setMensajeCambio('REGISTRO SATISFACTORIO');
        //        this.notificationService.show("Medico registrado satisfactoriamente", 'success')
        //        this.medicoService.setMensajeCambio('SOCIO REGISTRADO');
        // this.toastr.success('Venta Registrada', 'OK', {
        //   timeOut: 3000,
        //   positionClass: 'toast-center-center',
        // });
        this.router.navigate([`/login`]);
      });
  }

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
