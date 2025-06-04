import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

@Component({
  selector: 'app-analisis-edicion',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink, AsyncPipe, JsonPipe],
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
  formDetalle: FormGroup;
  analisis: Analisis | null = null;
  detalle: Iteana[] | null = null;
  id = 0;
  edicion: boolean = false;
  titulo = 'NUEVO REGISTRO';
  medicos$ = new Observable<Medico[]>();
  pacientes$ = new Observable<Paciente[]>();

  constructor() {
    this.formMaestro = this.formBuilder.group({
      idAnalisis: new FormControl(),
      fecha: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s()-]){3,50}$/),
      ]),
      medico: this.formBuilder.group({
        idMedico: ['', Validators.required],
        nombres: [''],
        apellidos: [''],
      }),
      paciente: this.formBuilder.group({
        idPaciente: ['', Validators.required],
        dni: [''],
        apellidos: [''],
        nombres: [''],
        direccion: [''],
        telefono: [''],
        fecnac: [''],
        edad: [''],
        sexo: [''],
      }),
      codenv: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s()-]){3,50}$/),
      ]),
      compag: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([A-Za-zÑñ\s()-]){3,50}$/),
      ]),
      monto: new FormControl('', [
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
    this.medicos$ = this.medicoService.listar();
    this.pacientes$ = this.pacienteService.listar();
    //     this.descripcion = "";
    //     this.observ = "";
    //     this.route.params.subscribe((data: Params) => {
    //       this.idAnalisis = data['id'];
    //       this.medicos$ = this.medicoService.listar();
    //       this.pacientes$ = this.pacienteService.listar();
    //       this.catanas$ = this.catanaService.listaNativo();
    //       this.catamue$ = this.catmueService.listar();
    //       //      console.log( this.catanas$);
    //       this.lsexo$ = this.parmaeService.listarPorTipo("tipo/SEXO  "); //.subscribe(data => this.pacientes = data);
    //       //      console.log("idMedico.-> " + this.idMedico);
    //       this.edicion = data['id'] != null;
    //       this.initForm();
    //     });
  }

  //    void {
  //     this.descripcion = "";
  //     this.observ = "";
  //     this.route.params.subscribe((data: Params) => {
  //       this.idAnalisis = data['id'];
  //       this.medicos$ = this.medicoService.listar();
  //       this.pacientes$ = this.pacienteService.listar();
  //       this.catanas$ = this.catanaService.listaNativo();
  //       this.catamue$ = this.catmueService.listar();
  //       //      console.log( this.catanas$);
  //       this.lsexo$ = this.parmaeService.listarPorTipo("tipo/SEXO  "); //.subscribe(data => this.pacientes = data);
  //       //      console.log("idMedico.-> " + this.idMedico);
  //       this.edicion = data['id'] != null;
  //       this.initForm();
  //     });
  //   }

  //   initForm() {
  //     if (this.edicion) {
  //       this.analisisService.listarPorId(this.idAnalisis).subscribe(data => {
  //         var arrFecha = data.fecha.split("-");

  //         this.idAnalisis = data.idAnalisis;
  //         this.descripcion = data.descripcion;
  //         this.codenv = data.codenv;
  //         this.compag = data.compag;
  //         this.monto = data.monto;
  //         this.observ = data.observ;
  //         this.idMedico = data.medico.idMedico;
  //         this.pidpaciente = data.paciente.idPaciente;
  //         this.pdni = data.paciente.dni;
  //         this.papellidos = data.paciente.apellidos;
  //         this.pnombres = data.paciente.nombres;
  //         this.pdireccion = data.paciente.direccion;
  //         this.ptelefono = data.paciente.telefono;
  //         this.pfecnac = new Date(parseInt(arrFecha[0]), parseInt(arrFecha[1]) - 1, parseInt(arrFecha[2]));
  //         this.pedad = data.paciente.edad;
  //         this.psexo = data.paciente.sexo;
  //         this.idCatmue = data.catmue.idCatmue;
  //         this.detiteana = data.detiteana;
  //       });
  //     }
  //   }

  validaPaciente() {
    //    console.log("hola");
    //   this.formMaestro.controls['idCatana'].setValue(data.idCatana);
    // let dni = this.formMaestro.get("paciente.dni");
    // let pidpaciente = 0;
    // let pnombres = '';
    // let papellidos = '';
    // let pdireccion = '';
    // let ptelefono = '';
    // let pfecnac = new Date();
    // let pedad = 0;
    // this.pacientes$.forEach((_lista) => {
    //   for (let i = 0; i < _lista.length; i++) {
    //     if (_lista[i].dni === this.pdni) {
    //       let arrFecha = _lista[i].fecnac.split('-');

    //       pidpaciente = _lista[i].idPaciente;
    //       pnombres = _lista[i].nombres;
    //       papellidos = _lista[i].apellidos;
    //       pdireccion = _lista[i].direccion;
    //       pdni = _lista[i].dni;
    //       ptelefono = _lista[i].telefono;
    //       pfecnac = new Date(
    //         parseInt(arrFecha[0]),
    //         parseInt(arrFecha[1]) - 1,
    //         parseInt(arrFecha[2])
    //       );
    //       pedad = _lista[i].edad;
    //       psexo = _lista[i].sexo;
    //     }
    //   }
    // });
  }

  //   calculaEdad($event) {
  //     let hoy = new Date();
  //     let nacimiento = this.pfecnac   //new Date($event.value);
  //     let _edad = hoy.getFullYear() - nacimiento.getFullYear();
  //     var m = hoy.getMonth() - nacimiento.getMonth();
  //     if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
  //       _edad--;
  //     }
  //     this.pedad = _edad;
  //   }

  //   escogeCatalogo($event) {
  //     let _idCatana = $event.value;
  //     let iteana: Iteana;
  //     let _resultado = new aResultados;
  //     this.catanas$.forEach(_lista => {
  //       //      console.log(_lista)
  //       this.detiteana = [];
  //       this._aresultados = [];
  //       for (let i = 0; i < _lista.length; i++) {
  //         if (_lista[i].idCatana === _idCatana) {
  //           for (let j = 0; j < _lista[i].detexamen.length; j++) {
  //             iteana = new Iteana;
  //             iteana.examen = _lista[i].detexamen[j];
  //             //            iteana.examen.tipo.descripcion
  //             this.detiteana.push(iteana);
  //             _resultado = new aResultados;
  //             _resultado.item = iteana.examen.item;
  //             _resultado.formula = iteana.examen.formula;
  //             this._aresultados.push(_resultado);
  //           }
  //         }
  //       }
  //       //      console.log(this._aresultados);
  //     });
  //   }

  //   aceptar() {
  //     let analisis = new Analisis();
  //     let medico = new Medico();
  //     medico.idMedico = this.idMedico;
  //     let paciente = new Paciente();
  //     paciente.idPaciente = this.pidpaciente;
  //     paciente.nombres = this.pnombres.toUpperCase();
  //     paciente.apellidos = this.papellidos.toUpperCase();
  //     paciente.dni = this.pdni;
  //     paciente.direccion = this.pdireccion.toUpperCase();
  //     paciente.telefono = this.ptelefono;
  //     paciente.fecnac = this.pfecnac.toISOString().substring(0,10);
  //     paciente.edad = this.pedad;
  //     paciente.sexo = this.psexo;
  //     let catana = new Catana();
  //     catana.idCatana = this.idCatana;
  //     let catmue = new Catmue();
  //     catmue.idCatmue = this.idCatmue;

  //     analisis.idAnalisis = this.idAnalisis;
  //     analisis.medico = medico;
  //     analisis.paciente = paciente;
  //     analisis.catmue = catmue;
  //     //    analisis.catana = catana;
  //     analisis.fecha = this.fecha.toISOString().substring(0,10);
  //     analisis.descripcion = this.descripcion.toUpperCase();
  //     analisis.codenv = this.codenv;
  //     analisis.compag = this.compag;
  //     analisis.monto = this.monto;
  //     analisis.observ = this.observ.toUpperCase();
  //     analisis.detiteana = this.detiteana;

  // console.log(analisis);
  //     this.statSend = true
  //     this.btnAceptar = "Enviando";
  //     if (this.edicion) {
  //       //MODIFICAR
  //       this.analisisService.modificar(analisis).pipe(switchMap(() => {
  //         return this.analisisService.listar();
  //       }))
  //         .subscribe(data => {
  //           //          console.log("data: " + data);
  //           this.analisisService.setAnalisisCambio(data);
  //           this.analisisService.setMensajeCambio('SE MODIFICO');
  //           this.router.navigate(['pages/analisis']);
  //         })
  //     } else {
  //       //REGISTRAR
  // console.log("antes de enviar");
  //       this.analisisService.registrar(analisis).pipe(switchMap(() => {
  // console.log("envie");
  //         return this.analisisService.listar();
  //       }))
  //         .subscribe(data => {
  //           this.analisisService.setAnalisisCambio(data);
  //           this.analisisService.setMensajeCambio('SE REGISTRO');
  //           this.router.navigate(['pages/analisis']);
  //         });
  //     }

  //   }

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

  //     function redondeo(numero, decimales) {
  //       var numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
  //       if (numeroRegexp.test(numero)) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
  //         //        alert("ggggg " + numero);
  //         return Number(numero.toFixed(decimales));
  //       } else {
  //         //        alert("kakak " + numero);
  //         return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
  //       }
  //     }

  //   }

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
  get paciente() {
    return this.formMaestro.get('paciente') as FormGroup;
  }

  get detexamen(): FormArray {
    return this.formMaestro.get('detexamen') as FormArray;
  }
}