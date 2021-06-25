import { Component, NgModule } from '@angular/core';
import { IssueFormDirective } from '../../../directives/issue-form.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-markdown-creator',
  templateUrl: './markdown-creator.component.html',
})
export class MarkdownCreatorComponent extends IssueFormDirective {
  get control(): FormControl {
    return this.formGroup.get('attributes')?.get('value') as FormControl;
  }
}

@NgModule({
  declarations: [MarkdownCreatorComponent],
  imports: [
    MatExpansionModule,
    MatChipsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [MarkdownCreatorComponent],
})
export class MarkdownCreatorModule {}
