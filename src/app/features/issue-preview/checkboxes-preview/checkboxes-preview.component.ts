import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CheckboxesElement } from '../../../models/checkboxes-element';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkedModule } from '../../../pipes/marked.pipe';
import { ErrorMessageModule } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-checkboxes-preview',
  templateUrl: './checkboxes-preview.component.html',
  styleUrls: ['./checkboxes-preview.component.scss'],
})
export class CheckboxesPreviewComponent {
  @Input() formGroup!: FormGroup;

  @Output()
  scrollToError: EventEmitter<void> = new EventEmitter<void>();

  get element(): CheckboxesElement {
    return this.formGroup.value as CheckboxesElement;
  }
}

@NgModule({
  declarations: [CheckboxesPreviewComponent],
  imports: [CommonModule, MarkedModule, ErrorMessageModule],
  exports: [CheckboxesPreviewComponent],
})
export class CheckboxesPreviewModule {}
