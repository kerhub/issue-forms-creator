import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownElement } from '../../../models/dropdown-element';
import { MarkedModule } from '../../../pipes/marked.pipe';
import { ErrorMessageModule } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-dropdown-preview',
  templateUrl: './dropdown-preview.component.html',
})
export class DropdownPreviewComponent {
  @Input()
  formGroup!: FormGroup;

  @Output()
  scrollToError: EventEmitter<void> = new EventEmitter<void>();

  get element(): DropdownElement {
    return this.formGroup.value as DropdownElement;
  }
}

@NgModule({
  declarations: [DropdownPreviewComponent],
  imports: [CommonModule, MarkedModule, ErrorMessageModule],
  exports: [DropdownPreviewComponent],
})
export class DropdownPreviewModule {}
