import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { IssueFormDirective } from '../../../directives/issue-form.directive';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkboxes-creator',
  templateUrl: './checkboxes-creator.component.html',
  styleUrls: ['./checkboxes-creator.component.scss'],
})
export class CheckboxesCreatorComponent extends IssueFormDirective {
  @Output() addCheckbox: EventEmitter<void> = new EventEmitter<void>();

  get label(): string {
    return this.formGroup.value.attributes.label;
  }

  get isLabelInvalid(): boolean {
    return (
      !!this.formGroup.get('attributes')?.get('label')?.touched &&
      !!this.formGroup.get('attributes')?.get('label')?.errors
    );
  }

  get optionsControls(): FormGroup[] {
    return (this.formGroup.get('attributes')?.get('options') as FormArray).controls as FormGroup[];
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.moveItemInFormArray(
      this.formGroup.get('attributes')?.get('options') as FormArray,
      event.previousIndex,
      event.currentIndex,
    );
  }

  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const dir = toIndex > fromIndex ? 1 : -1;

    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }
    formArray.setControl(toIndex, item);
  }
}

@NgModule({
  declarations: [CheckboxesCreatorComponent],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
  ],
  exports: [CheckboxesCreatorComponent],
})
export class CheckboxesCreatorModule {}
