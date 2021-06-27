import { Component, Input, NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownElement } from '../../../models/dropdown-element';
import { MarkedModule } from '../../../pipes/marked.pipe';

@Component({
  selector: 'app-dropdown-preview',
  templateUrl: './dropdown-preview.component.html',
})
export class DropdownPreviewComponent {
  @Input()
  formGroup!: FormGroup;

  get element(): DropdownElement {
    return this.formGroup.value as DropdownElement;
  }
}

@NgModule({
  declarations: [DropdownPreviewComponent],
  imports: [CommonModule, MarkedModule],
  exports: [DropdownPreviewComponent],
})
export class DropdownPreviewModule {}
