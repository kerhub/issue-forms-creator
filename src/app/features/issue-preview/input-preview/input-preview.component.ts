import { Component, Input, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputElement } from '../../../models/input-element';
import { CommonModule } from '@angular/common';
import { MarkedModule } from '../../../pipes/marked.pipe';

@Component({
  selector: 'app-input-preview',
  templateUrl: './input-preview.component.html',
})
export class InputPreviewComponent {
  @Input()
  formGroup!: FormGroup;

  get element(): InputElement {
    return this.formGroup.value as InputElement;
  }
}

@NgModule({
  declarations: [InputPreviewComponent],
  imports: [CommonModule, MarkedModule],
  exports: [InputPreviewComponent],
})
export class InputPreviewModule {}
