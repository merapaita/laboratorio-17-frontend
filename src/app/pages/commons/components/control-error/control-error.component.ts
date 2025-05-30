import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  standalone: true,
  imports: [NgIf],    //MatFormFieldModule, MatInputModule, 
  templateUrl: './control-error.component.html',
  styleUrl: './control-error.component.css'
})
export class ControlErrorComponent {
	textError = '';

	@Input() set error(value: string) {
		if (value !== this.textError) {
			this.textError = value;
			this.cdr.detectChanges();
		}
	}

	constructor(private cdr: ChangeDetectorRef) {}

}
