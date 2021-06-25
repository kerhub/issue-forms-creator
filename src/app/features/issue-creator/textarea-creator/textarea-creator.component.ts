import { Component, NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IssueFormDirective } from '../../../directives/issue-form.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-textarea-creator',
  templateUrl: './textarea-creator.component.html',
})
export class TextareaCreatorComponent extends IssueFormDirective {
  get label(): string {
    return this.formGroup.value.attributes.label;
  }

  get isLabelInvalid(): boolean {
    return (
      !!this.formGroup.get('attributes')?.get('label')?.touched &&
      !!this.formGroup.get('attributes')?.get('label')?.errors
    );
  }
}

@NgModule({
  declarations: [TextareaCreatorComponent],
  imports: [
    MatExpansionModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [TextareaCreatorComponent],
})
export class TextareaCreatorModule {}
