import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModuleService } from '../../../_service/module.service';
import { Module } from '../../../_model/module';

@Component({
  selector: 'app-module-edition',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './module-edition.component.html',
  styleUrl: './module-edition.component.css'
})
export class ModuleEditionComponent implements OnInit {
  form: FormGroup;
  id = 0;
  edicion = false;
  titulo = 'NUEVO REGISTRO';

  private activateRoute = inject(ActivatedRoute);
  private moduleService = inject(ModuleService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      basePath: new FormControl('', [Validators.required]),
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
      this.moduleService.listarPorId(this.id).subscribe((data) => {
        this.form.controls['id'].setValue(data.id);
        this.form.controls['basePath'].setValue(data.basePath);
        this.form.controls['name'].setValue(data.name);
      });
    }
  }

  aceptar() {
    const registro: Module = this.form.value;
    if (this.edicion) {
      //MODIFICAR
      this.moduleService.modificarNvo(registro).subscribe((result) => {
        this.moduleService.setMensajeCambio('REGISTRO MODIFICADO SATISFACTORIAMENTE');
        this.router.navigate([
          `pages/module/detail/${registro.id}`,
        ]);
      });
    } else {
      //REGISTRAR
      this.moduleService.registrarNvo(registro).subscribe((result) => {
        let id = result.id;
        this.moduleService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/module/detail/${id}`]);
      });
    }
  }

  get name() {
    return this.form.get('name');
  }

  get basePath() {
    return this.form.get('basePath');
  }

}
