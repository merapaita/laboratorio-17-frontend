import { Operation } from './../../../_model/operation';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OperationService } from '../../../_service/operation.service';
import { Observable } from 'rxjs';
import { Module } from '../../../_model/module';
import { ModuleService } from '../../../_service/module.service';
import { Parmae } from '../../../_model/parmae';
import { ParmaeService } from '../../../_service/parmae.service';
import { FormSubmitDirective } from '../../commons/directivas/form-submit.directive';

@Component({
  selector: 'app-operation-edition',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, AsyncPipe, NgFor, JsonPipe],
  templateUrl: './operation-edition.component.html',
  styleUrl: './operation-edition.component.css',
})
export class OperationEditionComponent implements OnInit {
  form: FormGroup;
  id = 0;
  edicion = false;
  titulo = 'NUEVO REGISTRO';
  modules$ = new Observable<Module[]>();
  httpMethods$ = new Observable<Parmae[]>();
  //  operation:Operation|null = null;

  private activateRoute = inject(ActivatedRoute);
  private operationService = inject(OperationService);
  private moduleService = inject(ModuleService);
  private parmaeService = inject(ParmaeService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      path: new FormControl(''),
      httpMethod: new FormControl('', [Validators.required]),
      module: this.formBuilder.group({
        // Grupo anidado para Documento
        id: ['', Validators.required],
        basePath: [''],
        name: [''],
      }),
      //      module: new FormControl('', [Validators.required]),
      permitAll: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.modules$ = this.moduleService.listar();
    this.httpMethods$ = this.parmaeService.listarPorTipo('tipo/HTTPME');
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.titulo = "EDICION DE REGISTRO"
      this.operationService.listarPorId(this.id).subscribe((data) => {
        this.form.controls['id'].setValue(data.id);
        this.form.controls['name'].setValue(data.name);
        this.form.controls['path'].setValue(data.path);
        this.form.controls['httpMethod'].setValue(data.httpMethod);
        this.form.controls['permitAll'].setValue(data.permitAll);
        this.form.controls['module'].setValue(data.module);
      });
    }
  }

  aceptar() {
    const registro: Operation = this.form.value;
    //  registro:Operation = new Operation;
    if (this.edicion) {
      //MODIFICAR
      this.operationService.modificarNvo(registro).subscribe((result) => {
        this.operationService.setMensajeCambio(
          'REGISTRO MODIFICADO SATISFACTORIAMENTE'
        );
        this.router.navigate([`pages/operation/detail/${registro.id}`]);
      });
    } else {
      //REGISTRAR
      this.operationService.registrarNvo(registro).subscribe((result) => {
        let id = result.id;
        this.operationService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/operation/detail/${id}`]);
      });
    }
  }

  get name() {
    return this.form.get('name');
  }
  get path() {
    return this.form.get('path');
  }
  get httpMethod() {
    return this.form.get('httpMethod');
  }
  get permitAll() {
    return this.form.get('permitAll');
  }
  get module() {
    return this.form.get('module') as FormGroup;
  }
}
