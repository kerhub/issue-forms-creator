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
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  optionsForm: UntypedFormGroup = new UntypedFormGroup({
    optionsFormArray: new UntypedFormArray([this.createOption()], Validators.required),
  });

  destroy$: Subject<void> = new Subject<void>();

  @Input()
  formGroup!: UntypedFormGroup;

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

  get optionsControls(): UntypedFormGroup[] {
    return (this.optionsForm.get('optionsFormArray') as UntypedFormArray)
      .controls as UntypedFormGroup[];
  }

  updateOptionsControl(): void {
    this.formGroup.get('attributes')?.get('options')?.setValue(this.options);
  }

  drop(event: CdkDragDrop<UntypedFormGroup[]>): void {
    this.moveItemInFormArray(
      this.optionsForm.get('optionsFormArray') as UntypedFormArray,
      event.previousIndex,
      event.currentIndex,
    );
  }

  moveItemInFormArray(formArray: UntypedFormArray, fromIndex: number, toIndex: number): void {
    const dir = toIndex > fromIndex ? 1 : -1;

    const item = formArray.at(fromIndex);
    for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
      const current = formArray.at(i + dir);
      formArray.setControl(i, current);
    }
    formArray.setControl(toIndex, item);
  }

  addOption(): void {
    (this.optionsForm.get('optionsFormArray') as UntypedFormArray).push(this.createOption());
    setTimeout(() => this.optionsComp.last.focus());
  }

  removeOption(index: number): void {
    (this.optionsForm.get('optionsFormArray') as UntypedFormArray).removeAt(index);
  }

  createOption(): UntypedFormGroup {
    return new UntypedFormGroup({
      label: new UntypedFormControl(),
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
