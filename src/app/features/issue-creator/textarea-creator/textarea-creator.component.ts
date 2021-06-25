import { Component, Input, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea-creator',
  templateUrl: './textarea-creator.component.html',
})
export class TextareaCreatorComponent {
  @Input()
  formGroup!: FormGroup;

  get labelControl(): FormControl {
    return this.formGroup.get('attributes')?.get('label') as FormControl;
  }

  get isLabelInvalid(): boolean {
    return this.labelControl.touched && this.labelControl.invalid;
  }
}

@NgModule({
  declarations: [TextareaCreatorComponent],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
  ],
  exports: [TextareaCreatorComponent],
})
export class TextareaCreatorModule {}
