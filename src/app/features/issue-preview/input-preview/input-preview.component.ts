import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputElement } from '../../../models/input-element';
import { CommonModule } from '@angular/common';
import { MarkedModule } from '../../../pipes/marked.pipe';
import { ErrorMessageModule } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-input-preview',
  templateUrl: './input-preview.component.html',
  styleUrls: ['./input-preview.component.scss'],
})
export class InputPreviewComponent {
  @Input()
  formGroup!: FormGroup;

  @Output()
  scrollToError: EventEmitter<void> = new EventEmitter<void>();

  get element(): InputElement {
    return this.formGroup.value as InputElement;
  }
}

@NgModule({
  declarations: [InputPreviewComponent],
  imports: [CommonModule, MarkedModule, ErrorMessageModule],
  exports: [InputPreviewComponent],
})
export class InputPreviewModule {}
