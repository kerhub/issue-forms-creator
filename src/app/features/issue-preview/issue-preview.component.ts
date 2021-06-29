import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { TopLevelPreviewModule } from './top-level-preview/top-level-preview.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxesPreviewModule } from './checkboxes-preview/checkboxes-preview.component';
import { DropdownPreviewModule } from './dropdown-preview/dropdown-preview.component';
import { InputPreviewModule } from './input-preview/input-preview.component';
import { MarkdownPreviewModule } from './markdown-preview/markdown-preview.component';
import { TextareaPreviewModule } from './textarea-preview/textarea-preview.component';
import { OptionPreviewModule } from './option-preview/option-preview.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageModule } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-issue-preview',
  templateUrl: './issue-preview.component.html',
  styleUrls: ['./issue-preview.component.scss'],
})
export class IssuePreviewComponent {
  copyActivated = false;

  @Input()
  form!: FormGroup;

  @Input()
  clipboardSuccess: boolean = false;

  @Input()
  clipboardError: boolean = false;

  @Output()
  copyToClipboard: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  scrollToError: EventEmitter<number> = new EventEmitter<number>();

  get controls(): FormGroup[] {
    return (this.form.get('body') as FormArray).controls as FormGroup[];
  }

  drop(event: CdkDragDrop<string[]>): void {
    this.moveItemInFormArray(
      this.form.get('body') as FormArray,
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

  get errorsList(): { message: string }[] {
    let errorList = [];
    if (this.form.get('body')?.getError('duplicateIds')) {
      errorList.push(this.form.get('body')?.getError('duplicateIds'));
    }

    if (this.form.get('body')?.getError('onlyMarkdownElements')) {
      errorList.push(this.form.get('body')?.getError('onlyMarkdownElements'));
    }

    return errorList;
  }
}

@NgModule({
  declarations: [IssuePreviewComponent],
  imports: [
    TopLevelPreviewModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    MatIconModule,
    CheckboxesPreviewModule,
    DropdownPreviewModule,
    InputPreviewModule,
    MarkdownPreviewModule,
    TextareaPreviewModule,
    OptionPreviewModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatButtonModule,
    ErrorMessageModule,
  ],
  exports: [IssuePreviewComponent],
})
export class IssuePreviewModule {}
