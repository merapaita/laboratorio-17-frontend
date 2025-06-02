import { NgClass, NgFor } from '@angular/common';
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
  selector: 'app-factura2',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor],
  templateUrl: './factura2.component.html',
  styleUrl: './factura2.component.scss',
})
export class Factura2Component implements OnInit {
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
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
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
