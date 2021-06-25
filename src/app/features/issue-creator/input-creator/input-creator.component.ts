import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { IssueFormDirective } from '../../../directives/issue-form.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-creator',
  templateUrl: './input-creator.component.html',
})
export class InputCreatorComponent extends IssueFormDirective {
  @Output() updatePreview: EventEmitter<string> = new EventEmitter<string>();

  get label(): string {
    return this.formGroup.value.attributes.label;
  }

  get isLabelInvalid(): boolean {
    return (
      !!this.formGroup.get('attributes')?.get('label')?.touched &&
      !!this.formGroup.get('attributes')?.get('label')?.invalid
    );
  }
}

@NgModule({
  declarations: [InputCreatorComponent],
  imports: [
    MatFormFieldModule,
    MatExpansionModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [InputCreatorComponent],
})
export class InputCreatorModule {}
