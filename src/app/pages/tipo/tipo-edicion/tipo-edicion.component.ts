import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TipoService } from '../../../_service/tip.service';
import { Tipo } from '../../../_model/tipo';

@Component({
  selector: 'app-tipo-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './tipo-edicion.component.html',
  styleUrl: './tipo-edicion.component.css',
})
export class TipoEdicionComponent implements OnInit {
  form: FormGroup;
  tipo: Tipo | null = null;
  id = 0;
  edicion: boolean = false;
  titulo = 'NUEVO REGISTRO';
  //   msgError = "";

  private activateRoute = inject(ActivatedRoute);
  private tipoService = inject(TipoService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      idTipo: new FormControl(),
      descripcion: new FormControl('', [
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
      this.titulo = 'EDICION DE REGISTRO';
      this.tipoService.listarPorId(this.id).subscribe((data) => {
        this.form.controls['idTipo'].setValue(data.idTipo);
        this.form.controls['descripcion'].setValue(data.descripcion);
      });
    }
  }

  aceptar() {
    this.form.controls['descripcion'].setValue(
      this.form.value['descripcion'].toUpperCase()
    );
    const registro: Tipo = this.form.value;

    if (this.edicion) {
      //MODIFICAR
      this.tipoService.modificarNvo(registro).subscribe((result) => {
        this.tipoService.setMensajeCambio(
          'REGISTRO MODIFICADO SATISFACTORIAMENTE'
        );
        // this.toastr.success('Venta Actualizada', 'OK', {
        //   timeOut: 3000,
        //   positionClass: 'toast-center-center',
        // });
        this.router.navigate([`pages/type/detail/${registro.idTipo}`]);
      });
    } else {
      //PRACTICA IDEAL
      //REGISTRAR
      this.tipoService.registrarNvo(registro).subscribe((result) => {
        let idTipo = result.idTipo;
        console.log(result);
        this.tipoService.setMensajeCambio('REGISTRO SATISFACTORIO');
        //        this.notificationService.show("Medico registrado satisfactoriamente", 'success')
        //        this.tipoService.setMensajeCambio('SOCIO REGISTRADO');
        // this.toastr.success('Venta Registrada', 'OK', {
        //   timeOut: 3000,
        //   positionClass: 'toast-center-center',
        // });
        this.router.navigate([`pages/type/detail/${idTipo}`]);
      });
    }
  }

  get descripcion() {
    return this.form.get('descripcion');
  }
}
