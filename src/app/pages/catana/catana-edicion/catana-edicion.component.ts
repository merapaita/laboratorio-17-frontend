import { Examen } from './../../../_model/examen';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catana } from '../../../_model/catana';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatanaService } from '../../../_service/catana.service';
import { Tipo } from '../../../_model/tipo';
import { filter, map, Observable, pipe, single, switchMap } from 'rxjs';
import { TipoService } from '../../../_service/tip.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-catana-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './catana-edicion.component.html',
  styleUrl: './catana-edicion.component.css',
})
export class CatanaEdicionComponent implements OnInit {
  formMaestro: FormGroup;
  formDetalle: FormGroup;
  catana: Catana | null = null;
  detalle: Examen[] | null = null;
  id = 0;
  edicion: boolean = false;
  titulo = 'NUEVO REGISTRO';
  tipos$ = new Observable<Tipo[]>();

  private activateRoute = inject(ActivatedRoute);
  private catanaService = inject(CatanaService);
  private tipoService = inject(TipoService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.tipos$ = this.tipoService.listar();
    this.formMaestro = this.formBuilder.group({
      idCatana: new FormControl(),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s()-]){3,50}$/),
      ]),
      detexamen: this.formBuilder.array([]),
    });

    this.formDetalle = this.formBuilder.group({
      idExamen: new FormControl(),
      tipo: this.formBuilder.group({
        idTipo: ['', Validators.required],
        descripcion: [''],
      }),
      item: new FormControl(),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s()-]){3,50}$/),
      ]),
      unidad: new FormControl('', [
        Validators.pattern(/^([A-Za-z0-9Ññ\s()-\/]){0,50}$/),
      ]),
      valref: new FormControl('', [
        Validators.pattern(/^([A-Za-z0-9Ññ\s]){0,50}$/),
      ]),
      formula: new FormControl('', [
        Validators.pattern(/^([A-Za-z0-9Ññ\s()-<>]){0,50}$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.tipos$ = this.tipoService.listar();
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.titulo = 'EDICION DE REGISTRO';
      this.catanaService.listarPorId(this.id).subscribe((data) => {
        this.formMaestro.controls['idCatana'].setValue(data.idCatana);
        this.formMaestro.controls['descripcion'].setValue(data.descripcion);

        const array = this.formMaestro.get('detexamen') as FormArray;
        array.clear(); // limpia lo anterior

        data.detexamen.forEach((examen) => {
          array.push(
            this.formBuilder.group({
              idExamen: [examen.idExamen],
              tipo: this.formBuilder.group({
                idTipo: [examen.tipo.idTipo, Validators.required],
                descripcion: [examen.tipo.descripcion],
              }),
              item: [examen.item],
              descripcion: [
                examen.descripcion,
                [
                  Validators.required,
                  Validators.pattern(/^([A-Za-zÑñ\s]){3,50}$/),
                ],
              ],
              unidad: [
                examen.unidad,
                [Validators.pattern(/^([A-Za-z0-9Ññ\s]){3,50}$/)],
              ],
              formula: [examen.formula],
              valref: [
                examen.valref,
                [Validators.pattern(/^([A-Za-z0-9Ññ\s]){3,50}$/)],
              ],
            })
          );
        });
        this.formMaestro.controls['detexamen'].setValue(array);
      });
    }
  }

  aceptar() {
    const registro: Catana = this.formMaestro.value;
    //  registro:Operation = new Operation;
    if (this.edicion) {
      //MODIFICAR
      this.catanaService.modificarNvo(registro).subscribe((result) => {
        this.catanaService.setMensajeCambio(
          'REGISTRO MODIFICADO SATISFACTORIAMENTE'
        );
        this.router.navigate([`pages/catana/detail/${registro.idCatana}`]);
      });
    } else {
      //REGISTRAR
      this.catanaService.registrarNvo(registro).subscribe((result) => {
        let id = result.idCatana;
        this.catanaService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/catana/detail/${id}`]);
      });
    }
  }

  guardarDetalle() {
    const values = this.formDetalle.value;
    let _item = this.detexamen.controls.length + 1;
    this.tipos$.forEach((_lista) => {
      for (let i = 0; i < _lista.length; i++) {
        if (
          _lista[i].idTipo === parseInt(this.formDetalle.value['tipo'].idTipo)
        ) {
          const detalletmp = this.formBuilder.group({
            idExamen: [values.idExamen],
            item: [_item],
            tipo: this.formBuilder.group({
              idTipo: [_lista[i].idTipo],
              descripcion: [_lista[i].descripcion],
            }),
            descripcion: [values.descripcion],
            valref: [values.valref],
            unidad: [values.unidad],
            formula: [values.formula],
          });
          this.detexamen.push(detalletmp);
        }
      }
    });
  }

  get descripcion() {
    return this.formMaestro.get('descripcion');
  }
  get tipo() {
    return this.formMaestro.get('tipo') as FormGroup;
  }
  get detexamen(): FormArray {
    return this.formMaestro.get('detexamen') as FormArray;
  }
}