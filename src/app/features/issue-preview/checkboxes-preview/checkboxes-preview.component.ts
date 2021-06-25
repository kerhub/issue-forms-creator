import { Component, Input, NgModule } from '@angular/core';
import { CheckboxesElement } from '../../../models/checkboxes-element';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkboxes-preview',
  templateUrl: './checkboxes-preview.component.html',
})
export class CheckboxesPreviewComponent {
  @Input() formGroup!: FormGroup;

  get element(): CheckboxesElement {
    return this.formGroup.value as CheckboxesElement;
  }
}

@NgModule({
  declarations: [CheckboxesPreviewComponent],
  imports: [CommonModule],
  exports: [CheckboxesPreviewComponent],
})
export class CheckboxesPreviewModule {}
