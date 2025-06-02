import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Paciente } from '../../../_model/paciente';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../_service/paciente.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-paciente-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './paciente-edicion.component.html',
  styleUrl: './paciente-edicion.component.scss',
})
export class PacienteEdicionComponent {
  form: FormGroup;
  paciente: Paciente | null = null;
  id = 0;
  edicion: boolean = false;
  titulo = 'NUEVO REGISTRO';
  //   msgError = "";

  private activateRoute = inject(ActivatedRoute);
  private pacienteService = inject(PacienteService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      idPaciente: new FormControl(),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/),
      ]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]){8}$/),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9Ññ\s-.]){3,150}$/),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]){3,15}$/),
      ]),
      fecnac: new FormControl('', [Validators.required]),
      edad: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]){1,2}$/),
      ]),
      sexo: new FormControl('', [
        Validators.required,
        //        Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/),
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
      this.titulo = 'EDICION DE REGISTRO';
      this.pacienteService.listarPorId(this.id).subscribe((data) => {
        this.form.controls['idPaciente'].setValue(data.idPaciente);
        this.form.controls['apellidos'].setValue(data.apellidos);
        this.form.controls['nombres'].setValue(data.nombres);
        this.form.controls['direccion'].setValue(data.direccion);
        this.form.controls['dni'].setValue(data.dni);
        this.form.controls['telefono'].setValue(data.telefono);
        this.form.controls['sexo'].setValue(data.sexo);
        this.form.controls['fecnac'].setValue(data.fecnac);
        this.form.controls['edad'].setValue(data.edad);
      });
    }
  }

  aceptar() {
    this.form.controls['apellidos'].setValue(
      this.form.value['apellidos'].toUpperCase()
    );
    this.form.controls['nombres'].setValue(
      this.form.value['nombres'].toUpperCase()
    );
    const registro: Paciente = this.form.value;

    if (this.edicion) {
      //MODIFICAR
      this.pacienteService.modificarNvo(registro).subscribe((result) => {
        this.pacienteService.setMensajeCambio(
          'REGISTRO MODIFICADO SATISFACTORIAMENTE'
        );
        this.router.navigate([`pages/patient/detail/${registro.idPaciente}`]);
      });
    } else {
      //PRACTICA IDEAL
      //REGISTRAR
      this.pacienteService.registrarNvo(registro).subscribe((result) => {
        let idPaciente = result.idPaciente;
        this.pacienteService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/patient/detail/${idPaciente}`]);
      });
    }
  }

  get apellidos() {
    return this.form.get('apellidos');
  }

  get nombres() {
    return this.form.get('nombres');
  }

  get dni() {
    return this.form.get('dni');
  }

  get direccion() {
    return this.form.get('direccion');
  }

  get telefono() {
    return this.form.get('telefono');
  }

  get edad() {
    return this.form.get('edad');
  }

  get sexo() {
    return this.form.get('sexo');
  }

  get fecnac() {
    return this.form.get('fecnac');
  }
}
