import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { AnalisisService } from '../../../_service/analisis.service';
import { MedicoService } from '../../../_service/medico.service';
import { PacienteService } from '../../../_service/paciente.service';
import { CatanaService } from '../../../_service/catana.service';
import { ParmaeService } from '../../../_service/parmae.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Analisis } from '../../../_model/analisis';
import { Iteana } from '../../../_model/iteana';
import { Observable } from 'rxjs';
import { Medico } from '../../../_model/medico';
import { Paciente } from '../../../_model/paciente';
import { Catana } from '../../../_model/catana';

@Component({
  selector: 'app-analisis-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink, AsyncPipe],
  templateUrl: './analisis-edicion.component.html',
  styleUrl: './analisis-edicion.component.scss',
})
export class AnalisisEdicionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private analisisService = inject(AnalisisService);
  private medicoService = inject(MedicoService);
  private pacienteService = inject(PacienteService);
  private catanaService = inject(CatanaService);
  //    private catmueService =inject(CatmueService);
  private parmaeService = inject(ParmaeService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  formMaestro: FormGroup;
  // formDetalle: FormGroup;
  analisis: Analisis | null = null;
  detalle: Iteana[] | null = null;
  id = 0;
  edicion: boolean = false;
  titulo = 'NUEVO REGISTRO';
  medicos$ = new Observable<Medico[]>();
  pacientes$ = new Observable<Paciente[]>();
  catanas$ = new Observable<Catana[]>();
  isDarkMode = false;

  constructor() {
    this.formMaestro = this.formBuilder.group({
      idAnalisis: new FormControl(),
      fecha: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [
        Validators.pattern(/^([A-Za-z0-9Ññ\s()-]){3,50}$/),
      ]),
      medico: this.formBuilder.group({
        idMedico: ['', Validators.required],
        nombres: [''],
        apellidos: [''],
      }),
      catmue: this.formBuilder.group({
        idCatmue: ['', Validators.required],
        descripcion: [''],
      }),
      paciente: this.formBuilder.group({
        idPaciente: ['', Validators.required],
        dni: ['', [Validators.required, Validators.pattern(/^([0-9]){8}$/)]],
        apellidos: [
          '',
          [Validators.required, Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/)],
        ],
        nombres: [
          '',
          [Validators.required, Validators.pattern(/^([A-Za-zÑñ\s]){3,30}$/)],
        ],
        direccion: [
          '',
          [Validators.required, Validators.pattern(/^([A-Za-zÑñ\s-]){3,150}$/)],
        ],
        telefono: ['', Validators.pattern(/^([0-9]){3,15}$/)],
        fecnac: ['', Validators.required],
        edad: ['', [Validators.required, Validators.pattern(/^([0-9]){1,3}$/)]],
        sexo: [''],
      }),
      codenv: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9A-Za-zÑñ\s()-]){2,6}$/),
      ]),
      compag: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9A-Za-zÑñ\s()-]){3,12}$/),
      ]),
      monto: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9]){1,10}$/),
      ]),
      catana: this.formBuilder.group({
        idCatana: ['', Validators.required],
        descri: [''],
      }),

      detiteana: this.formBuilder.array([]),
    });

    // this.formDetalle = this.formBuilder.group({
    //   idExamen: new FormControl(),
    //   tipo: this.formBuilder.group({
    //     idTipo: ['', Validators.required],
    //     descripcion: [''],
    //   }),
    //   item: new FormControl(),
    //   descripcion: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern(/^([A-Za-zÑñ\s()-]){3,50}$/),
    //   ]),
    //   unidad: new FormControl('', [
    //     Validators.pattern(/^([A-Za-z0-9Ññ\s()-\/]){0,50}$/),
    //   ]),
    //   valref: new FormControl('', [
    //     Validators.pattern(/^([A-Za-z0-9Ññ\s]){0,50}$/),
    //   ]),
    //   formula: new FormControl('', [
    //     Validators.pattern(/^([A-Za-z0-9Ññ\s()-<>]){0,50}$/),
    //   ]),
    // });
  }

  ngOnInit(): void {
    this.medicos$ = this.medicoService.listar();
    this.pacientes$ = this.pacienteService.listar();
    this.catanas$ = this.catanaService.listar();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
      //       this.idAnalisis = data['id'];
      //       this.catamue$ = this.catmueService.listar();
      //       this.lsexo$ = this.parmaeService.listarPorTipo("tipo/SEXO  "); //.subscribe(data => this.pacientes = data);
      //       //      console.log("idMedico.-> " + this.idMedico);
    });
  }

  initForm() {
    if (this.edicion) {
      this.analisisService.listarPorId(this.id).subscribe((data) => {
        this.formMaestro.controls['idAnalisis'].setValue(data.idAnalisis);
        this.formMaestro.controls['fecha'].setValue(data.fecha);
        this.formMaestro.controls['descripcion'].setValue(data.descripcion);
        this.formMaestro.controls['medico'].setValue(data.medico);
        this.formMaestro.controls['paciente'].setValue(data.paciente);
        this.formMaestro.controls['codenv'].setValue(data.codenv);
        this.formMaestro.controls['compag'].setValue(data.compag);
        this.formMaestro.controls['monto'].setValue(data.monto);

        const array = this.formMaestro.get('detiteana') as FormArray;
        array.clear(); // limpia lo anterior

        data.detiteana.forEach((iteana) => {
          array.push(
            this.formBuilder.group({
              idIteana: [iteana.idIteana],
              examen: this.formBuilder.group({
                idExamen: [iteana.examen.idExamen, Validators.required],
                tipo: [iteana.examen.tipo],
                item: [iteana.examen.item],
                descripcion: [iteana.examen.descripcion],
                valref: [iteana.examen.valref],
                unidad: [iteana.examen.unidad],
                formula: [iteana.examen.formula],
              }),
              resultado: [iteana.resultado],
            })
          );
        });
        this.formMaestro.controls['detiteana'].setValue(array);
      });
    }
  }

  validaPaciente() {
    let dni = this.formMaestro.get('paciente.dni')?.value;
    console.log(dni);
    this.pacienteService.buscaPorDni(dni).subscribe((data) => {
      this.formMaestro.controls['paciente'].setValue(data);
    });
  }

  calculaEdad() {
    let hoy = new Date();
    let nacimiento = new Date(this.formMaestro.get('paciente.fecnac')?.value); //new Date($event.value);
    let _edad = hoy.getFullYear() - nacimiento.getFullYear();
    this.formMaestro.get('paciente.edad')?.setValue(_edad);
  }

  selecCatana() {
    let idCatana = this.formMaestro.get('catana.idCatana')?.value;
    this.catanaService.listarPorId(idCatana).subscribe((data) => {
      this.formMaestro.get('catmue.idCatmue')?.setValue(idCatana);
      const array = this.formMaestro.get('detiteana') as FormArray;
      array.clear(); // limpia lo anterior

      data.detexamen.forEach((examen) => {
        let frmIteana = this.formBuilder.group({
          idIteana: [''],
          examen: examen,
          resultado: new FormControl(''),
        });
        array.push(frmIteana);
      });
      this.formMaestro.controls['detiteana'].setValue(array);
    });
  }

  // data.detiteana.forEach((iteana) => {
  //   array.push(
  //     this.formBuilder.group({
  //       idIteana: [iteana.idIteana],
  //       examen: this.formBuilder.group({
  //         idExamen: [iteana.examen.idExamen, Validators.required],
  //         tipo: [iteana.examen.tipo],
  //         item: [iteana.examen.item],
  //         descripcion: [iteana.examen.descripcion],
  //         valref: [iteana.examen.valref],
  //         unidad: [iteana.examen.unidad],
  //         formula: [iteana.examen.formula],
  //       }),
  //       resultado: [iteana.resultado],
  //     })
  //   );
  // });

  aceptar() {
    const registro: Analisis = this.formMaestro.value;
    //  registro:Operation = new Operation;
    if (this.edicion) {
      //MODIFICAR
      this.analisisService.modificarNvo(registro).subscribe((result) => {
        this.analisisService.setMensajeCambio(
          'REGISTRO MODIFICADO SATISFACTORIAMENTE'
        );
        this.router.navigate([`pages/analysis/detail/${registro.idAnalisis}`]);
      });
    } else {
      //REGISTRAR
      this.analisisService.registrarNvo(registro).subscribe((result) => {
        let id = result.idAnalisis;
        this.analisisService.setMensajeCambio('REGISTRO SATISFACTORIO');
        this.router.navigate([`pages/analysis/detail/${id}`]);
      });
    }
  }

  //   removerExamen(index: number) {
  //     this.detiteana.splice(index, 1);
  //   }

  //   calculaFormula() {
  //     let formula = "", formulaNueva = "", celda = "";
  //     let lenCelda = 0;
  //     let _valor: number | string;
  //     for (let i = 0; i < this.detiteana.length; i++) {
  //       for (let j = 0; j < this._aresultados.length; j++) {
  //         if (this.detiteana[i].examen.item === this._aresultados[j].item) {
  //           this._aresultados[j].valor = this.detiteana[i].resultado;
  //         }
  //       }
  //     }
  //     //debugger;
  //     let abre = -1, cierra = -1, item = 0, dato = 0;
  //     for (let k = 0; k < this._aresultados.length; k++) {
  //       if (this._aresultados[k].formula !== null) {
  //         formula = this._aresultados[k].formula;
  //         while (formula.search('<') !== -1) {
  //           abre = formula.search('<');
  //           cierra = formula.search('>');
  //           item = parseInt(formula.substr(abre + 1, cierra));
  //           celda = '<' + item + '>';
  //           lenCelda = celda.length;
  //           for (let l = 0; l < this.detiteana.length; l++) {
  //             if (this.detiteana[l].examen.item === item) {
  //               dato = parseFloat(this.detiteana[l].resultado);
  //               break;
  //             }
  //           }
  //           formula = formula.substr(0, abre) + dato + formula.substr(cierra + 1);
  //         }
  //         //        if (!isNaN(eval(formula))) {
  //         this._aresultados[k].valor = redondeo(eval(formula), 2);
  //         this.detiteana[k].resultado = redondeo(eval(formula), 2);
  //         //        }
  //       }
  //     }

  //   estadoBotonRegistrar() {
  //     //    console.log(this.idMedico);
  //     return (this.idMedico === 0) || !this.pdni || !this.papellidos || !this.pnombres || !this.pdireccion || !this.pfecnac || !this.psexo || !this.codenv || !this.compag || this.monto === 0 || this.idCatmue === 0 || this.statSend;
  //     //    return true;
  //   }

  get fecha() {
    return this.formMaestro.get('fecha');
  }
  get descripcion() {
    return this.formMaestro.get('descripcion');
  }
  get medico() {
    return this.formMaestro.get('medico') as FormGroup;
  }
  get catmue() {
    return this.formMaestro.get('catmue') as FormGroup;
  }
  get paciente() {
    return this.formMaestro.get('paciente') as FormGroup;
  }

  get detiteana(): FormArray {
    return this.formMaestro.get('detiteana') as FormArray;
  }

  // trackByItems(index:number, item:ITask) {
  //   return index;
  // }
}
