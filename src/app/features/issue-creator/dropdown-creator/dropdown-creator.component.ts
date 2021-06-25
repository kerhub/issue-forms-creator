import { Component, NgModule } from '@angular/core';
import { IssueFormDirective } from '../../../directives/issue-form.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dropdown-creator',
  templateUrl: './dropdown-creator.component.html',
})
export class DropdownCreatorComponent extends IssueFormDirective {
  // TODO : change to a Set for unique items
  options: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionsControl: FormControl = new FormControl(null);

  get label(): string {
    return this.formGroup.value.attributes.label;
  }

  get isLabelInvalid(): boolean {
    return (
      !!this.formGroup.get('attributes')?.get('label')?.touched &&
      !!this.formGroup.get('attributes')?.get('label')?.errors
    );
  }

  dropOption(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    this.formGroup.get('attributes')?.get('options')?.setValue(this.options);
  }

  addOption(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.options.push(value);
      this.formGroup.get('attributes')?.get('options')?.setValue(this.options);
    }

    event.chipInput!.clear();
    this.optionsControl.setValue(null);
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
    this.formGroup.get('attributes')?.get('options')?.setValue(this.options);
  }

  isOptionsInvalid(): boolean {
    return this.optionsControl.touched && !!this.optionsControl.errors;
  }
}

@NgModule({
  declarations: [DropdownCreatorComponent],
  imports: [
    MatExpansionModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule,
  ],
  exports: [DropdownCreatorComponent],
})
export class DropdownCreatorModule {}
