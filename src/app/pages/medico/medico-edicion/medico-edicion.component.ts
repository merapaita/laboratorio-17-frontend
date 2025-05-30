import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicoService } from '../../../_service/medico.service';
import { Medico } from '../../../_model/medico';
import { NotificationService } from '../../../_service/notification.service';

@Component({
  selector: 'app-medico-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './medico-edicion.component.html',
  styleUrl: './medico-edicion.component.css',
})
export class MedicoEdicionComponent implements OnInit {
  form: FormGroup;
  medico:Medico|null = null;
  id = 0;
  edicion: boolean = false;
  titulo = 'NUEVO REGISTRO';
  //   msgError = "";

  private activateRoute = inject(ActivatedRoute);
  private medicoService = inject(MedicoService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      idMedico: new FormControl(),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/),
      ]),
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
      this.medicoService.listarPorId(this.id).subscribe((data) => {
        console.log(data);
        this.form.controls['idMedico'].setValue(data.idMedico);
        this.form.controls['apellidos'].setValue(data.apellidos);
        this.form.controls['nombres'].setValue(data.nombres);
      });
    }
  }

  aceptar() {
    this.form.controls['apellidos'].setValue(  this.form.value['apellidos'].toUpperCase() );
    this.form.controls['nombres'].setValue(  this.form.value['nombres'].toUpperCase() );
    const registroMedico: Medico = this.form.value;

    if (this.edicion) {
      //MODIFICAR
      this.medicoService.modificarNvo(registroMedico).subscribe((result) => {
        //        let codvta = result.codvta;
        this.medicoService.setMensajeCambio('REGISTRO MODIFICADO SATISFACTORIAMENTE');
        // this.toastr.success('Venta Actualizada', 'OK', {
        //   timeOut: 3000,
        //   positionClass: 'toast-center-center',
        // });
        this.router.navigate([
          `pages/doctor/detail/${registroMedico.idMedico}`,
        ]);
      });
    } else {
      //PRACTICA IDEAL
      //REGISTRAR
      this.medicoService.registrarNvo(registroMedico).subscribe((result) => {
        let idMedico = result.idMedico;
        console.log(result);
        this.medicoService.setMensajeCambio('REGISTRO SATISFACTORIO');
//        this.notificationService.show("Medico registrado satisfactoriamente", 'success')
//        this.medicoService.setMensajeCambio('SOCIO REGISTRADO');
        // this.toastr.success('Venta Registrada', 'OK', {
        //   timeOut: 3000,
        //   positionClass: 'toast-center-center',
        // });
        this.router.navigate([`pages/doctor/detail/${idMedico}`]);
      });
    }
  }

  get apellidos() {
    return this.form.get('apellidos');
  }

  get nombres() {
    return this.form.get('nombres');
  }
}
