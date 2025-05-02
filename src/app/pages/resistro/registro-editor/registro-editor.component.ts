import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface Registro {
  id?: number;
  nombre: string;
  email: string;
  descripcion?: string;
}

@Component({
  selector: 'app-registro-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-editor.component.html',
  styleUrl: './registro-editor.component.css',
})
export class RegistroEditorComponent implements OnInit, OnChanges {
  @Input() registroParaEditar: Registro | null = null; // Recibe el registro a editar (si existe)
  @Output() guardarRegistro = new EventEmitter<Registro>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  registroForm: FormGroup;
  esEdicion: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      descripcion: [''],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['registroParaEditar'] &&
      changes['registroParaEditar'].currentValue
    ) {
      this.esEdicion = true;
      this.cargarRegistroParaEdicion(
        changes['registroParaEditar'].currentValue
      );
    } else {
      this.esEdicion = false;
      this.registroForm.reset(); // Limpiar el formulario si no hay registro para editar
    }
  }

  cargarRegistroParaEdicion(registro: Registro): void {
    this.registroForm.patchValue({
      nombre: registro.nombre,
      email: registro.email,
      descripcion: registro.descripcion || '',
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const registroAGuardar: Registro = this.registroForm.value;
      if (this.esEdicion && this.registroParaEditar?.id) {
        registroAGuardar.id = this.registroParaEditar.id; // Mantener el ID en la edición
      }
      this.guardarRegistro.emit(registroAGuardar);
      this.registroForm.reset(); // Limpiar el formulario después de guardar
      this.esEdicion = false;
      this.registroParaEditar = null; // Limpiar el registro para editar
    }
  }

  onCancelar(): void {
    this.cancelarEdicion.emit();
    this.registroForm.reset();
    this.esEdicion = false;
    this.registroParaEditar = null;
  }

  get f() {
    return this.registroForm.controls;
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }

  get email() {
    return this.registroForm.get('email');
  }
}
