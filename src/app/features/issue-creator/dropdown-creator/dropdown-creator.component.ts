import { Component, Input, NgModule } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-creator',
  templateUrl: './dropdown-creator.component.html',
})
export class DropdownCreatorComponent {
  // TODO : change to a Set for unique items
  options: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionsControl: FormControl = new FormControl(null);

  @Input()
  formGroup!: FormGroup;

  updateOptionsControl(): void {
    this.formGroup.get('attributes')?.get('options')?.setValue(this.options);
  }

  dropOption(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    this.updateOptionsControl();
  }

  addOption(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.options.push(value);
      this.updateOptionsControl();
    }

    event.chipInput!.clear();
    this.optionsControl.setValue(null);
  }

  removeOption(index: number): void {
    this.options.splice(index, 1);
    this.updateOptionsControl();
  }
}

@NgModule({
  declarations: [DropdownCreatorComponent],
  imports: [
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    DragDropModule,
    CommonModule,
  ],
  exports: [DropdownCreatorComponent],
})
export class DropdownCreatorModule {}
