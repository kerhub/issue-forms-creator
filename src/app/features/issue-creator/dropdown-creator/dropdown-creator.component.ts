import {
  Component,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ListOptionComponent, ListOptionModule } from '../list-option/list-option.component';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface DropdownOption {
  label: string;
}

@Component({
  selector: 'app-dropdown-creator',
  templateUrl: './dropdown-creator.component.html',
  styleUrls: ['./dropdown-creator.component.scss'],
})
export class DropdownCreatorComponent implements OnInit, OnDestroy {
  options: Set<string> = new Set<string>();
  separatorKeysCodes: number[] = [ENTER, COMMA];

  optionsForm: FormGroup = new FormGroup({
    optionsFormArray: new FormArray([this.createOption()], Validators.required),
  });

  destroy$: Subject<void> = new Subject<void>();

  @Input()
  formGroup!: FormGroup;

  @ViewChildren(ListOptionComponent)
  optionsComp!: QueryList<ListOptionComponent>;

  ngOnInit() {
    this.optionsForm
      .get('optionsFormArray')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((options: DropdownOption[]) => {
        this.formGroup
          .get('attributes')
          ?.get('options')
          ?.setValue(options.map(option => option.label));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get optionsControls(): FormGroup[] {
    return (this.optionsForm.get('optionsFormArray') as FormArray).controls as FormGroup[];
  }

  updateOptionsControl(): void {
    this.formGroup.get('attributes')?.get('options')?.setValue(this.options);
  }

  drop(event: CdkDragDrop<FormGroup[]>): void {
    this.moveItemInFormArray(
      this.optionsForm.get('optionsFormArray') as FormArray,
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

  addOption(): void {
    (this.optionsForm.get('optionsFormArray') as FormArray).push(this.createOption());
    setTimeout(() => this.optionsComp.last.focus());
  }

  removeOption(index: number): void {
    (this.optionsForm.get('optionsFormArray') as FormArray).removeAt(index);
  }

  createOption(): FormGroup {
    return new FormGroup({
      label: new FormControl(),
    });
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
    ListOptionModule,
    MatButtonModule,
  ],
  exports: [DropdownCreatorComponent],
})
export class DropdownCreatorModule {}
