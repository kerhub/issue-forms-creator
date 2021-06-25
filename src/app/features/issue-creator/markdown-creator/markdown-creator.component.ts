import { Component, Input, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-markdown-creator',
  templateUrl: './markdown-creator.component.html',
})
export class MarkdownCreatorComponent {
  @Input()
  formGroup!: FormGroup;

  get control(): FormControl {
    return this.formGroup.get('attributes')?.get('value') as FormControl;
  }
}

@NgModule({
  declarations: [MarkdownCreatorComponent],
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  exports: [MarkdownCreatorComponent],
})
export class MarkdownCreatorModule {}
