import { Component, Input, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-markdown-creator',
  templateUrl: './markdown-creator.component.html',
})
export class MarkdownCreatorComponent {
  @Input()
  formGroup!: UntypedFormGroup;

  get control(): UntypedFormControl {
    return this.formGroup.get('attributes')?.get('value') as UntypedFormControl;
  }
}

@NgModule({
  declarations: [MarkdownCreatorComponent],
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  exports: [MarkdownCreatorComponent],
})
export class MarkdownCreatorModule {}
