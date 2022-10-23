import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownSection } from '../../../models/dropdown-section';
import { MarkedModule } from '../../../pipes/marked.pipe';
import { ErrorMessageModule } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-dropdown-preview',
  templateUrl: './dropdown-preview.component.html',
})
export class DropdownPreviewComponent {
  @Input()
  formGroup!: UntypedFormGroup;

  @Output()
  scrollToError: EventEmitter<void> = new EventEmitter<void>();

  get section(): DropdownSection {
    return this.formGroup.value as DropdownSection;
  }
}

@NgModule({
  declarations: [DropdownPreviewComponent],
  imports: [CommonModule, MarkedModule, ErrorMessageModule],
  exports: [DropdownPreviewComponent],
})
export class DropdownPreviewModule {}
