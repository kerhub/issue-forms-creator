import { Component, NgModule } from '@angular/core';
import { IssueFormDirective } from '../../../directives/issue-form.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-markdown-creator',
  templateUrl: './markdown-creator.component.html',
})
export class MarkdownCreatorComponent extends IssueFormDirective {
  get control(): FormControl {
    return this.formGroup.get('attributes')?.get('value') as FormControl;
  }

  get isValueInvalid(): boolean {
    return this.control.touched && this.control.invalid;
  }
}

@NgModule({
  declarations: [MarkdownCreatorComponent],
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule],
  exports: [MarkdownCreatorComponent],
})
export class MarkdownCreatorModule {}
