import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Factura {
  id?: number; // Opcional
  fecha: string; // Objeto Documento
  cliente: string;
  total_factura: string;
  detalles: Detalle[];
}

interface Detalle {
  id_detalle: number;
  articulo: string;
  cantidad: number;
  precio_unitario: number;
  total_detalle: number;
}

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss',
})
export class FacturaComponent implements OnInit {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  detalleForm!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      cliente: ['', Validators.required],
      total_factura: [{ value: '0.00', disabled: true }],
      detalles: this.fb.array([]),
    });

    // Modal FormGroup independiente para agregar un nuevo detalle
    this.detalleForm = this.fb.group({
      articulo: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio_unitario: [0, [Validators.required, Validators.min(0)]],
    });
    // Por defecto agregamos un detalle
    // this.addDetalle();
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  addDetalle() {
    const detalleGroup = this.fb.group({
      articulo: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio_unitario: [0, [Validators.required, Validators.min(0)]],
      total_detalle: [{ value: 0, disabled: true }],
    });

    // Recalcular total_detalle al cambiar cantidad o precio_unitario
    detalleGroup.valueChanges.subscribe(() => this.calcularTotales());

    this.detalles.push(detalleGroup);
  }

  guardarDetalle() {
    const values = this.detalleForm.value;
    const total = values.cantidad * values.precio_unitario;

    const nuevoDetalle = this.fb.group({
      articulo: [values.articulo],
      cantidad: [values.cantidad],
      precio_unitario: [values.precio_unitario],
      total_detalle: [total.toFixed(2)],
    });

    this.detalles.push(nuevoDetalle);
    this.calcularTotales();

    // Reset modal form para el siguiente uso
    this.detalleForm.reset({ articulo: '', cantidad: 1, precio_unitario: 0 });
  }

  removeDetalle(index: number) {
    this.detalles.removeAt(index);
    this.calcularTotales();
  }

  calcularTotales() {
    let totalFactura = 0;
    this.detalles.controls.forEach((detalle: any) => {
      const subtotal =
        detalle.get('cantidad').value * detalle.get('precio_unitario').value;
      detalle
        .get('total_detalle')
        .setValue(subtotal.toFixed(2), { emitEvent: false });
      totalFactura += subtotal;
    });
    this.form
      .get('total_factura')
      ?.setValue(totalFactura.toFixed(2), { emitEvent: false });
  }

  // calcularTotales() {
  //   let totalFactura = 0;
  //   this.detalles.controls.forEach((detalleGroup: any) => {
  //     const cantidad = detalleGroup.get('cantidad').value || 0;
  //     const precio = detalleGroup.get('precio_unitario').value || 0;
  //     const total = cantidad * precio;
  //     detalleGroup
  //       .get('total_detalle')
  //       .setValue(total.toFixed(2), { emitEvent: false });
  //     totalFactura += total;
  //   });
  //   this.form
  //     .get('total_factura')
  //     ?.setValue(totalFactura.toFixed(2), { emitEvent: false });
  // }

  onSubmit() {
    if (this.form.valid) {
      const factura: Factura = {
        ...this.form.getRawValue(), // incluye los valores "disabled"
      };
      console.log('Factura enviada:', factura);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
